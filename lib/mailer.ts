import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
})

if (process.env.NODE_ENV === 'development') {
  (transporter.sendMail as any) = async (mailOptions: any) => {
    console.log('Email sent (dev mode):')
    console.log('To:', mailOptions.to)
    console.log('Subject:', mailOptions.subject)
    console.log('Text:', mailOptions.text)
    console.log('HTML:', mailOptions.html)
    return { messageId: 'dev-message-id' }
  }
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string
  subject: string
  text: string
  html?: string
}) {
  const mailOptions = {
    from: '"The Mental Lap" <noreply@thementallap.com>',
    to,
    subject,
    text,
    html: html || text,
  }

  return transporter.sendMail(mailOptions)
}