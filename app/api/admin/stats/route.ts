import { NextResponse } from 'next/server'
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

    // Get total athletes count
    const totalAthletes = await prisma.user.count({
      where: { role: 'athlete' }
    })

    // Get pending form analyses
    const pendingAnalyses = await prisma.formAnalysis.count({
      where: { status: { in: ['submitted', 'in_review'] } }
    })

    // Get upcoming workshops
    const upcomingWorkshops = await prisma.workshop.count({
      where: { startsAt: { gte: new Date() } }
    })

    // Get recent bookings (last 7 days)
    const recentBookings = await prisma.booking.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    })

    // Get active journals (entries in last 7 days)
    const activeJournals = await prisma.journalEntry.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      },

    })

    // Calculate monthly revenue from workshops
    const currentMonth = new Date()
    currentMonth.setDate(1)
    currentMonth.setHours(0, 0, 0, 0)

    const workshops = await prisma.workshop.findMany({
      where: {
        startsAt: {
          gte: currentMonth
        }
      },
      include: {
        registrations: true
      }
    })

    const totalRevenue = workshops.reduce((sum, workshop) => {
      return sum + (workshop.registrations.length * workshop.priceCents / 100)
    }, 0)

    return NextResponse.json({
      totalAthletes,
      pendingAnalyses,
      upcomingWorkshops,
      recentBookings,
      totalRevenue: totalRevenue.toFixed(2),
      activeJournals
    })
  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}