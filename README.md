# The Mental Lap

For athletes. By elite college athletes.

## Overview

The Mental Lap is a comprehensive mental performance platform built by and for athletes. It provides tools for mental training, technical analysis, recruiting guidance, and peer-to-peer coaching from elite college athletes.

## Features

- **Journal Tracker**: Track mood, RPE, sleep, and performance patterns
- **1:1 Video Sessions**: Book sessions with elite athlete coaches
- **Workshops**: Live group sessions on mental skills and recruiting
- **Form Analysis**: Submit videos for technical feedback
- **Recruiting Tips**: Navigate the college recruiting process
- **Mental Skills Library**: Evidence-based performance psychology resources

## Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL (or use Docker)
- Git

## Quick Start

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd the-mental-lab
pnpm install
```

2. **Set up environment variables**
```bash
cp .env.local .env
# Edit .env to add your database URL and other configs
```

3. **Set up the database**
```bash
# Option A: Using local PostgreSQL
pnpm prisma migrate dev

# Option B: Using Docker
docker-compose up -d
pnpm prisma migrate dev
```

4. **Seed the database**
```bash
pnpm prisma db seed
```

5. **Start the development server**
```bash
pnpm dev
```

Visit http://localhost:3000

## Test Credentials

- **Coach**: skyla@thementallab.com / password123
- **Coach**: birgen@thementallab.com / password123
- **Admin**: admin@thementallab.com / password123
- **Athlete**: alex.runner@example.com / password123

## Docker Setup

```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Stop containers
docker-compose down

# Reset database
docker-compose down -v
docker-compose up -d
pnpm prisma migrate dev
pnpm prisma db seed
```

## Project Structure

```
/app              # Next.js App Router pages
/components       # Reusable React components
/lib              # Utilities and configurations
/prisma           # Database schema and migrations
/public           # Static assets
/content          # MDX content for articles
/tests            # Playwright e2e tests
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run Playwright tests
- `pnpm prisma studio` - Open Prisma Studio

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mental_lab"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
PLAUSIBLE_DOMAIN="yourdomain.com" # Optional analytics
CALENDLY_URL_SKYLA="" # Optional Calendly integration
CALENDLY_URL_BIRGEN="" # Optional Calendly integration
```

## Deployment Notes

### Production Checklist
- [ ] Update NEXTAUTH_SECRET with secure key
- [ ] Configure production database
- [ ] Set up file storage (S3/Cloudinary) for video uploads
- [ ] Configure email service (SendGrid/AWS SES)
- [ ] Set up monitoring (Plausible/Google Analytics)
- [ ] Enable Calendly URLs if using external scheduling

### File Uploads
Currently stores files locally in `/public/uploads`. For production:
1. Implement S3 or Cloudinary adapter
2. Update upload endpoints in `/app/api/upload`
3. Migrate existing files

### Email Service
Development uses console logging. For production:
1. Configure SMTP settings in `/lib/mailer.ts`
2. Add email service credentials to environment

### Video Calls
MVP includes booking flow only. To add video:
- Option A: Integrate Calendly/Zoom links (set CALENDLY_URL_* env vars)
- Option B: Implement WebRTC with TURN servers for production

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Headless UI
- **Testing**: Playwright
- **Email**: Nodemailer

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

Private and confidential. All rights reserved.

## Support

Contact support@thementallab.com for assistance.