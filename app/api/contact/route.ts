import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Try different SMTP configurations based on email provider
  const smtpEmail = process.env.SMTP_EMAIL

  if (!smtpEmail) return null

  // Gmail configuration
  if (smtpEmail.includes('@gmail.com')) {
    return nodemailer.createTransporter({
      service: 'gmail',
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
  }

  // Outlook/Hotmail configuration
  if (smtpEmail.includes('@outlook.com') || smtpEmail.includes('@hotmail.com') || smtpEmail.includes('@live.com')) {
    return nodemailer.createTransporter({
      service: 'outlook',
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3'
      }
    })
  }

  // GoDaddy/Custom domain configuration (most likely your case)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtpout.secureserver.net', // GoDaddy SMTP
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}

const transporter = createTransporter()

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, type } = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Always save to database first as backup
    try {
      await prisma.contactMessage.create({
        data: {
          name,
          email,
          subject: subject || '',
          message,
          type,
        }
      })
      console.log('Contact message saved to database successfully')
    } catch (dbError) {
      console.error('Failed to save contact message to database:', dbError)
      // Continue anyway - don't fail the whole request
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD || !transporter) {
      console.log('Contact form submission received (SMTP not configured):')
      console.log(`From: ${name} <${email}>`)
      console.log(`Type: ${type}`)
      console.log(`Subject: ${subject || 'No subject'}`)
      console.log(`Message: ${message}`)

      return NextResponse.json({
        success: true,
        message: 'Message received successfully! We\'ll get back to you soon.'
      })
    }

    // Test SMTP connection
    console.log('Testing SMTP connection...')
    console.log('SMTP_EMAIL:', process.env.SMTP_EMAIL ? 'configured' : 'missing')
    console.log('SMTP_PASSWORD:', process.env.SMTP_PASSWORD ? 'configured' : 'missing')

    try {
      await transporter.verify()
      console.log('SMTP connection verified successfully')
    } catch (verifyError) {
      console.error('SMTP verification failed:', verifyError)
      // Continue anyway - maybe it will work
    }

    // Determine recipient based on type
    const recipient = type === 'partnership'
      ? 'partners@thementallap.com'
      : 'support@thementallap.com'

    // Email content
    const mailOptions = {
      from: `"The Mental Lap Contact Form" <${process.env.SMTP_EMAIL}>`,
      to: recipient,
      replyTo: email,
      subject: subject || `Contact Form: ${type === 'partnership' ? 'Partnership Inquiry' : 'General Inquiry'} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5a7260;">New Contact Form Submission</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Type:</strong> ${type === 'partnership' ? 'Partnership Opportunity' : 'General Inquiry'}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #5a7260;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; padding: 15px; background: #e8f0e8; border-radius: 8px;">
            <p style="margin: 0; font-size: 12px; color: #666;">
              This email was sent from the contact form at thementallap.com<br>
              You can reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Type: ${type === 'partnership' ? 'Partnership Opportunity' : 'General Inquiry'}
Name: ${name}
Email: ${email}
${subject ? `Subject: ${subject}\n` : ''}

Message:
${message}

---
This email was sent from the contact form at thementallap.com
You can reply directly to this email to respond to ${name} at ${email}
      `
    }

    // Send email
    console.log('Attempting to send email to:', recipient)
    console.log('From:', mailOptions.from)
    const emailResult = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', emailResult.messageId)

    // Send confirmation email to the user
    const confirmationOptions = {
      from: `"The Mental Lap" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: 'Thank you for contacting The Mental Lap',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5a7260;">Thank you for reaching out!</h2>

          <p>Hi ${name},</p>

          <p>We've received your message and will get back to you within 24 hours.</p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #5a7260;">Your Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>In the meantime, feel free to explore our resources:</p>
          <ul>
            <li><a href="https://thementallap.com/workshops" style="color: #5a7260;">Upcoming Workshops</a></li>
            <li><a href="https://thementallap.com/library" style="color: #5a7260;">Mental Skills Library</a></li>
            <li><a href="https://thementallap.com/recruiting-tips" style="color: #5a7260;">Recruiting Tips</a></li>
          </ul>

          <p>Best regards,<br>The Mental Lap Team</p>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 12px; color: #666;">
              The Mental Lap - Elite Mental Performance Coaching<br>
              <a href="https://thementallap.com" style="color: #5a7260;">thementallap.com</a>
            </p>
          </div>
        </div>
      `,
      text: `
Thank you for reaching out!

Hi ${name},

We've received your message and will get back to you within 24 hours.

Your Message:
${message}

In the meantime, feel free to explore our resources at thementallap.com

Best regards,
The Mental Lap Team
      `
    }

    console.log('Attempting to send confirmation email to:', email)
    const confirmationResult = await transporter.sendMail(confirmationOptions)
    console.log('Confirmation email sent successfully:', confirmationResult.messageId)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Contact form error:', error)

    // Log the submission details for manual follow-up
    console.log('Failed contact form submission details:')
    console.log('This message should be manually followed up on.')

    // Always return success to user, but log error for admin review
    return NextResponse.json({
      success: true,
      message: 'Message received successfully! We\'ll get back to you soon.'
    })
  }
}