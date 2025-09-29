import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Only allow admin to setup database
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Setting up database tables...')

    // Create ContactMessage table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "ContactMessage" (
        "id" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "subject" TEXT,
        "message" TEXT NOT NULL,
        "type" TEXT NOT NULL DEFAULT 'general',
        "processed" BOOLEAN NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
      );
    `

    // Create indexes if they don't exist
    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "ContactMessage_processed_idx" ON "ContactMessage"("processed");
    `

    await prisma.$executeRaw`
      CREATE INDEX IF NOT EXISTS "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
    `

    console.log('Database setup completed successfully')

    return NextResponse.json({
      success: true,
      message: 'Database tables created successfully'
    })

  } catch (error) {
    console.error('Database setup error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to setup database',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}