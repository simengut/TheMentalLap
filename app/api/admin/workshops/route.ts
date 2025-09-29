import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch all workshops with registrations
    const workshops = await prisma.workshop.findMany({
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
      },
      orderBy: {
        startsAt: 'desc'
      }
    })

    return NextResponse.json(workshops)
  } catch (error) {
    console.error('Admin workshops error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
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

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    // Create the workshop
    const workshop = await prisma.workshop.create({
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
    console.error('Create workshop error:', error)
    return NextResponse.json(
      { error: 'Failed to create workshop' },
      { status: 500 }
    )
  }
}