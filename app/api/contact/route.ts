import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
})

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
    await transporter.sendMail(mailOptions)

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

    await transporter.sendMail(confirmationOptions)

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!'
    })

  } catch (error) {
    console.error('Contact form error:', error)

    // For development/testing without SMTP configured
    if (process.env.NODE_ENV === 'development' || !process.env.SMTP_EMAIL) {
      return NextResponse.json({
        success: true,
        message: 'Message received (email not sent in development)',
        devNote: 'Configure SMTP_EMAIL and SMTP_PASSWORD in production'
      })
    }

    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}