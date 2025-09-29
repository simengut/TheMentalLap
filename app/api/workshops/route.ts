import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { startsAt: 'asc' },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    })

    return NextResponse.json(workshops)
  } catch (error) {
    console.error('Failed to fetch workshops:', error)
    return NextResponse.json(
      { error: 'Failed to fetch workshops' },
      { status: 500 }
    )
  }
}