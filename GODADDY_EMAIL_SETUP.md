# GoDaddy Email Configuration Guide

## Current Error
You're getting "535 Authentication Failed" which means the email/password combination is incorrect or the SMTP settings are wrong.

## GoDaddy SMTP Settings to Try

### Option 1: Standard GoDaddy (Port 587 - Recommended)
```
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=587
SMTP_EMAIL=support@thementallap.com
SMTP_PASSWORD=[Your email password]
```

### Option 2: SSL GoDaddy (Port 465)
```
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_EMAIL=support@thementallap.com
SMTP_PASSWORD=[Your email password]
```

### Option 3: European Servers
If your GoDaddy account is in Europe:
```
SMTP_HOST=smtpout.europe.secureserver.net
SMTP_PORT=587
SMTP_EMAIL=support@thementallap.com
SMTP_PASSWORD=[Your email password]
```

### Option 4: Office 365 (If using Microsoft 365 through GoDaddy)
```
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_EMAIL=support@thementallap.com
SMTP_PASSWORD=[Your email password]
```

## How to Find Your Correct Settings

1. **Log into GoDaddy**
   - Go to your GoDaddy account
   - Navigate to Email & Office
   - Click on your email account

2. **Find Email Client Settings**
   - Look for "Email Setup" or "Server Settings"
   - Find the "Manual Setup" or "Other email clients" section
   - Look for "Outgoing Server" or "SMTP" settings

3. **Common Issues**
   - **Wrong Password**: Make sure you're using your email password, not your GoDaddy account password
   - **2FA Enabled**: If you have 2-factor authentication, you might need an app password
   - **IP Restrictions**: Some GoDaddy accounts require you to whitelist the sending IP

## Test Your Settings

After updating your Vercel environment variables, test the contact form and check the logs. The debug output will show exactly what's happening with the SMTP connection.

## Alternative Solution

If SMTP continues to fail, consider using a dedicated email service:
- SendGrid (free tier available)
- Mailgun (free tier available)
- Amazon SES (very cheap)

These services are more reliable than GoDaddy SMTP for transactional emails.