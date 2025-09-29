import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
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

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const workshopId = searchParams.get('workshopId')

    if (workshopId) {
      // Get registrations for a specific workshop
      const registrations = await prisma.registration.findMany({
        where: { workshopId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              sport: true
            }
          },
          workshop: {
            select: {
              title: true,
              startsAt: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      return NextResponse.json({
        registrations,
        emails: registrations.map(r => r.user.email),
        emailString: registrations.map(r => r.user.email).join(', ')
      })
    } else {
      // Get all workshop registrations
      const registrations = await prisma.registration.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              sport: true
            }
          },
          workshop: {
            select: {
              title: true,
              startsAt: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })

      // Group by workshop
      const byWorkshop = registrations.reduce((acc, reg) => {
        const workshopId = reg.workshopId
        if (!acc[workshopId]) {
          acc[workshopId] = {
            workshop: reg.workshop,
            registrations: [],
            emails: []
          }
        }
        acc[workshopId].registrations.push(reg)
        acc[workshopId].emails.push(reg.user.email)
        return acc
      }, {} as Record<string, any>)

      return NextResponse.json({
        allRegistrations: registrations,
        byWorkshop,
        allEmails: registrations.map(r => r.user.email),
        allEmailsString: registrations.map(r => r.user.email).join(', ')
      })
    }
  } catch (error) {
    console.error('Failed to fetch workshop registrations:', error)
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    )
  }
}