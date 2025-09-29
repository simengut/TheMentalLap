# Vercel Environment Variables

Add these environment variables in Vercel Dashboard (REQUIRED for login to work):
Settings → Environment Variables

## Required Variables:

```
DATABASE_URL=postgresql://postgres:BirgenElise13.15@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://thementallap.com
NEXT_PUBLIC_SUPABASE_URL=https://tuhkxhilertuegrjyiuc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGt4aGlsZXJ0dWVncmp5aXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMDUwNjEsImV4cCI6MjA3NDY4MTA2MX0.S-awAPled--Rx023j7HecJ31mRHvw2yTuuEVSdLBtYI

# Email Configuration (required for contact form)
SMTP_EMAIL=support@thementallap.com
SMTP_PASSWORD=your-gmail-app-password-here
```

## Important Notes:
- NEXTAUTH_URL must be https://thementallap.com (not localhost)
- NEXTAUTH_SECRET should be changed to a secure random string for production
- You can generate a secure secret with: openssl rand -base64 32

## Email Setup:
For the contact form to work, you need to configure SMTP settings:

1. **Option A: Use Gmail App Password (Recommended)**
   - Create a Gmail account for support@thementallap.com
   - Enable 2-factor authentication
   - Generate an App Password specifically for this app
   - Use the App Password as SMTP_PASSWORD

2. **Option B: Use a professional email service**
   - Set up support@thementallap.com with your domain provider
   - Configure SMTP settings accordingly

3. **Email routing**:
   - Both support@thementallap.com and partners@thementallap.com should route to the same Gmail inbox
   - Or set up email forwarding in your domain DNS settings