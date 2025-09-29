import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    // Only allow admin to test emails
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { recipient } = await req.json()

    console.log('=== EMAIL TEST STARTED ===')
    console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL ? 'configured' : 'missing')
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'configured' : 'missing')
    console.log('Recipient:', recipient)

    // Test SMTP connection
    try {
      await transporter.verify()
      console.log('✅ SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError)
      return NextResponse.json({
        success: false,
        error: 'SMTP verification failed',
        details: verifyError instanceof Error ? verifyError.message : String(verifyError)
      })
    }

    // Send test email
    const testMailOptions = {
      from: `"The Mental Lap Test" <${process.env.SMTP_EMAIL}>`,
      to: recipient || 'support@thementallap.com',
      subject: 'Email Test from The Mental Lap',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5a7260;">Email Test Successful!</h2>
          <p>This is a test email to verify SMTP configuration is working correctly.</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          <p><strong>From:</strong> ${process.env.SMTP_EMAIL}</p>
          <p><strong>To:</strong> ${recipient || 'support@thementallap.com'}</p>
        </div>
      `,
      text: `
Email Test Successful!

This is a test email to verify SMTP configuration is working correctly.

Timestamp: ${new Date().toISOString()}
From: ${process.env.SMTP_EMAIL}
To: ${recipient || 'support@thementallap.com'}
      `
    }

    console.log('Attempting to send test email...')
    const result = await transporter.sendMail(testMailOptions)
    console.log('✅ Test email sent successfully:', result.messageId)
    console.log('=== EMAIL TEST COMPLETED ===')

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      messageId: result.messageId,
      from: process.env.SMTP_EMAIL,
      to: recipient || 'support@thementallap.com'
    })

  } catch (error) {
    console.error('❌ Email test error:', error)
    console.log('=== EMAIL TEST FAILED ===')

    return NextResponse.json({
      success: false,
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : String(error)
    })
  }
}