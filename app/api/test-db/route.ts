import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count()

    // Get first 3 users (without passwords)
    const users = await prisma.user.findMany({
      take: 3,
      select: {
        email: true,
        name: true,
        role: true,
      }
    })

    return NextResponse.json({
      status: 'Database connected successfully',
      userCount,
      sampleUsers: users,
      environment: {
        hasDbUrl: !!process.env.DATABASE_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        nextAuthUrl: process.env.NEXTAUTH_URL,
      }
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      {
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        environment: {
          hasDbUrl: !!process.env.DATABASE_URL,
          hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
          hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        }
      },
      { status: 500 }
    )
  }
}