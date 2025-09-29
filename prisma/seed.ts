import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Create coach users
  const skyla = await prisma.user.create({
    data: {
      email: 'skyla@thementallap.com',
      password: hashedPassword,
      name: 'Skyla Wilson',
      role: 'coach',
      sport: 'Track & Field',
      bio: 'NCAA East Prelim qualifier and First-Team All-Ivy hurdler/sprinter from UPenn. Program record holder in 60H (8.29), 100H (13.45), 200m (23.54), and 400H (58.26). I believe in finding your rhythm and trusting the process. My approach combines technical precision with mental preparation, helping athletes unlock their potential through confidence and consistency.',
    },
  })

  const birgen = await prisma.user.create({
    data: {
      email: 'birgen@thementallap.com',
      password: hashedPassword,
      name: 'Birgen Nelson',
      role: 'coach',
      sport: 'Track & Field',
      bio: 'Mental Performance Coach and former Student Senate Co-President at Gustavus. I specialize in building resilience, time management, and sprint/hurdle technical analysis. My coaching philosophy centers on developing small habits that create lasting change and competitive excellence.',
    },
  })

  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@thementallap.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })

  // Create demo athletes
  const athlete1 = await prisma.user.create({
    data: {
      email: 'alex.runner@example.com',
      password: hashedPassword,
      name: 'Alex Runner',
      role: 'athlete',
      sport: 'Track & Field',
    },
  })

  const athlete2 = await prisma.user.create({
    data: {
      email: 'jordan.sprinter@example.com',
      password: hashedPassword,
      name: 'Jordan Sprinter',
      role: 'athlete',
      sport: 'Track & Field',
    },
  })

  // Create journal entries for demo athletes
  const journalDates = [
    new Date('2024-01-15'),
    new Date('2024-01-17'),
    new Date('2024-01-20'),
    new Date('2024-01-22'),
    new Date('2024-01-24'),
    new Date('2024-01-26'),
  ]

  for (const athlete of [athlete1, athlete2]) {
    for (const date of journalDates) {
      await prisma.journalEntry.create({
        data: {
          userId: athlete.id,
          date,
          mood: Math.floor(Math.random() * 3) + 3,
          sleepHours: 7 + Math.random() * 2,
          rpe: Math.floor(Math.random() * 4) + 4,
          tags: ['training', 'competition prep'],
          notes: 'Felt good during practice. Working on maintaining form at higher speeds.',
        },
      })
    }
  }

  // Create workshops
  await prisma.workshop.create({
    data: {
      title: 'Mental Preparation for Championship Season',
      slug: 'mental-prep-championship',
      summary: 'Learn proven techniques to peak mentally when it matters most.',
      content: 'Join Skyla and Birgen for an intensive workshop on championship mindset, visualization techniques, and managing competition nerves.',
      startsAt: new Date('2024-02-15T18:00:00'),
      durationMin: 90,
      capacity: 30,
      location: 'Online via Zoom',
      priceCents: 4500,
    },
  })

  await prisma.workshop.create({
    data: {
      title: 'Hurdle Rhythm and Technical Development',
      slug: 'hurdle-rhythm-technical',
      summary: 'Master the technical aspects of hurdle rhythm and race execution.',
      content: 'Deep dive into hurdle mechanics, rhythm patterns, and race strategy with NCAA record holder Skyla Wilson.',
      startsAt: new Date('2024-02-22T17:00:00'),
      durationMin: 120,
      capacity: 20,
      location: 'Online via Zoom',
      priceCents: 6500,
    },
  })

  await prisma.workshop.create({
    data: {
      title: 'College Recruiting 101',
      slug: 'college-recruiting-101',
      summary: 'Navigate the recruiting process from an athlete\'s perspective.',
      content: 'Everything you need to know about contacting coaches, official visits, and finding the right academic and athletic fit.',
      startsAt: new Date('2024-03-01T19:00:00'),
      durationMin: 60,
      capacity: 50,
      location: 'Online via Zoom',
      priceCents: 2500,
    },
  })

  // Create articles
  await prisma.article.create({
    data: {
      section: 'recruiting',
      title: 'How to Write Your First Email to a College Coach',
      slug: 'first-email-college-coach',
      excerpt: 'Learn the essential elements of a compelling introductory email that gets coaches\' attention.',
      content: '# How to Write Your First Email to a College Coach\\n\\nYour first email sets the tone...',
      authorId: birgen.id,
      publishedAt: new Date('2024-01-10'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'recruiting',
      title: 'Creating a Standout Highlight Reel',
      slug: 'creating-highlight-reel',
      excerpt: 'Tips for showcasing your athletic abilities effectively in video format.',
      content: '# Creating a Standout Highlight Reel\\n\\nYour highlight reel is often the first...',
      authorId: skyla.id,
      publishedAt: new Date('2024-01-12'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'recruiting',
      title: 'Understanding Academic Fit in College Selection',
      slug: 'academic-fit-college',
      excerpt: 'Balance athletic opportunities with academic goals for long-term success.',
      content: '# Understanding Academic Fit\\n\\nWhile athletics may open doors...',
      authorId: birgen.id,
      publishedAt: new Date('2024-01-14'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'recruiting',
      title: 'Official vs Unofficial Visits: What to Know',
      slug: 'official-unofficial-visits',
      excerpt: 'Navigate campus visits strategically to make the best impression.',
      content: '# Official vs Unofficial Visits\\n\\nCampus visits are crucial...',
      authorId: skyla.id,
      publishedAt: new Date('2024-01-16'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'recruiting',
      title: 'Timeline for Each Recruiting Class Year',
      slug: 'recruiting-timeline-class-year',
      excerpt: 'When to start reaching out and key deadlines by graduation year.',
      content: '# Recruiting Timeline by Class Year\\n\\n## Freshman Year\\n\\nFocus on development...',
      authorId: birgen.id,
      publishedAt: new Date('2024-01-18'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'library',
      title: 'Box Breathing for Pre-Competition Calm',
      slug: 'box-breathing-technique',
      excerpt: 'A simple breathing technique to manage nerves and enhance focus.',
      content: '# Box Breathing Technique\\n\\nUsed by Navy SEALs and elite athletes...',
      authorId: skyla.id,
      publishedAt: new Date('2024-01-05'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'library',
      title: 'Building Your Pre-Meet Routine',
      slug: 'pre-meet-routine',
      excerpt: 'Create consistency and confidence through structured preparation.',
      content: '# Building Your Pre-Meet Routine\\n\\nConsistency breeds confidence...',
      authorId: birgen.id,
      publishedAt: new Date('2024-01-07'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'library',
      title: 'Reframing Negative Self-Talk',
      slug: 'reframing-negative-self-talk',
      excerpt: 'Transform limiting beliefs into empowering thoughts.',
      content: '# Reframing Negative Self-Talk\\n\\nYour internal dialogue shapes performance...',
      authorId: skyla.id,
      publishedAt: new Date('2024-01-09'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'library',
      title: 'Visualization for Technical Events',
      slug: 'visualization-technical-events',
      excerpt: 'Use mental rehearsal to perfect complex movement patterns.',
      content: '# Visualization for Technical Events\\n\\nFor hurdles, jumps, and throws...',
      authorId: skyla.id,
      publishedAt: new Date('2024-01-11'),
    },
  })

  await prisma.article.create({
    data: {
      section: 'library',
      title: 'Confidence Through Preparation',
      slug: 'confidence-through-preparation',
      excerpt: 'Build unshakeable confidence by controlling what you can control.',
      content: '# Confidence Through Preparation\\n\\nTrue confidence comes from knowing...',
      authorId: birgen.id,
      publishedAt: new Date('2024-01-13'),
    },
  })

  // Create form analyses with comments
  const analysis1 = await prisma.formAnalysis.create({
    data: {
      athleteId: athlete1.id,
      event: 'hurdles_100',
      videoUrl: '/uploads/sample-hurdle-video-1.mp4',
      notes: 'Working on trail leg mechanics and maintaining rhythm through hurdles 5-7.',
      status: 'in_review',
    },
  })

  await prisma.formComment.create({
    data: {
      analysisId: analysis1.id,
      authorId: skyla.id,
      atSecond: 3.5,
      comment: 'Great lead leg attack! Notice how you maintain forward lean through takeoff.',
    },
  })

  await prisma.formComment.create({
    data: {
      analysisId: analysis1.id,
      authorId: skyla.id,
      atSecond: 7.2,
      comment: 'Trail leg could come through higher here. Focus on driving the knee to your armpit.',
    },
  })

  const analysis2 = await prisma.formAnalysis.create({
    data: {
      athleteId: athlete2.id,
      event: 'sprint',
      videoUrl: '/uploads/sample-sprint-video-1.mp4',
      notes: 'Block start and acceleration phase work.',
      status: 'complete',
    },
  })

  await prisma.formComment.create({
    data: {
      analysisId: analysis2.id,
      authorId: birgen.id,
      atSecond: 0.5,
      comment: 'Solid set position. Make sure your shoulders are slightly ahead of your hands.',
    },
  })

  await prisma.formComment.create({
    data: {
      analysisId: analysis2.id,
      authorId: birgen.id,
      atSecond: 2.0,
      comment: 'Excellent drive phase! You maintain good angles through the first 20m.',
    },
  })

  console.log('Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })