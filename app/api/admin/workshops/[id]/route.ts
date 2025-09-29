import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get single workshop for editing
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        registrations: {
          include: {
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    })

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(workshop)
  } catch (error) {
    console.error('Get workshop error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workshop' },
      { status: 500 }
    )
  }
}

// Update workshop
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { title, summary, content, startsAt, durationMin, capacity, location, priceCents } = body

    // Validate required fields
    if (!title || !summary || !startsAt || !durationMin || !capacity || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if workshop exists
    const existingWorkshop = await prisma.workshop.findUnique({
      where: { id: params.id }
    })

    if (!existingWorkshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }

    // Generate slug if title changed
    let slug = existingWorkshop.slug
    if (title !== existingWorkshop.title) {
      let baseSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

      // Ensure slug is unique
      slug = baseSlug
      let counter = 1
      while (true) {
        const conflictingWorkshop = await prisma.workshop.findUnique({
          where: { slug }
        })

        // No conflict or only conflict is with current workshop
        if (!conflictingWorkshop || conflictingWorkshop.id === params.id) break

        slug = `${baseSlug}-${counter}`
        counter++
      }
    }

    // Update the workshop
    const workshop = await prisma.workshop.update({
      where: { id: params.id },
      data: {
        title,
        slug,
        summary,
        content: content || '',
        startsAt: new Date(startsAt),
        durationMin: parseInt(durationMin.toString()),
        capacity: parseInt(capacity.toString()),
        location,
        priceCents: parseInt(priceCents?.toString() || '0'),
      }
    })

    return NextResponse.json({
      success: true,
      workshop
    })
  } catch (error) {
    console.error('Update workshop error:', error)
    return NextResponse.json(
      { error: 'Failed to update workshop' },
      { status: 500 }
    )
  }
}

// Delete workshop
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if workshop exists
    const existingWorkshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    })

    if (!existingWorkshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }

    // Check if workshop has registrations
    if (existingWorkshop._count.registrations > 0) {
      return NextResponse.json(
        { error: 'Cannot delete workshop with existing registrations. Cancel all registrations first.' },
        { status: 400 }
      )
    }

    // Delete the workshop
    await prisma.workshop.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Workshop deleted successfully'
    })
  } catch (error) {
    console.error('Delete workshop error:', error)
    return NextResponse.json(
      { error: 'Failed to delete workshop' },
      { status: 500 }
    )
  }
}