# Vercel Environment Variables

Add these environment variables in Vercel Dashboard (REQUIRED for login to work):
Settings → Environment Variables

## Required Variables:

```
DATABASE_URL=postgresql://postgres:BirgenElise13.15@db.tuhkxhilertuegrjyiuc.supabase.co:5432/postgres
NEXTAUTH_SECRET=your-secret-key-here-change-in-production
NEXTAUTH_URL=https://thementallap.com
NEXT_PUBLIC_SUPABASE_URL=https://tuhkxhilertuegrjyiuc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1aGt4aGlsZXJ0dWVncmp5aXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMDUwNjEsImV4cCI6MjA3NDY4MTA2MX0.S-awAPled--Rx023j7HecJ31mRHvw2yTuuEVSdLBtYI
```

## Important Notes:
- NEXTAUTH_URL must be https://thementallap.com (not localhost)
- NEXTAUTH_SECRET should be changed to a secure random string for production
- You can generate a secure secret with: openssl rand -base64 32