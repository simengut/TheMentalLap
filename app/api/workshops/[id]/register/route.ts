import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const workshop = await prisma.workshop.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    })

    if (!workshop) {
      return NextResponse.json(
        { error: 'Workshop not found' },
        { status: 404 }
      )
    }

    // Check if workshop is full
    if (workshop._count.registrations >= workshop.capacity) {
      return NextResponse.json(
        { error: 'Workshop is full' },
        { status: 400 }
      )
    }

    // Check if user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: {
        userId_workshopId: {
          userId: user.id,
          workshopId: workshop.id
        }
      }
    })

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'Already registered for this workshop' },
        { status: 400 }
      )
    }

    // Create registration
    const registration = await prisma.registration.create({
      data: {
        userId: user.id,
        workshopId: workshop.id
      },
      include: {
        user: {
          select: { name: true, email: true }
        },
        workshop: {
          select: { title: true, startsAt: true, location: true }
        }
      }
    })

    return NextResponse.json({
      message: 'Successfully registered for workshop',
      registration
    })
  } catch (error) {
    console.error('Workshop registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}