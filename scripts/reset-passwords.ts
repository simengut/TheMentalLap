import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetPasswords() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  // Find all users and update their passwords
  const users = await prisma.user.findMany()

  console.log(`Found ${users.length} users in database:`)

  for (const user of users) {
    console.log(`- ${user.email} (${user.role})`)

    // Update password for each user
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    })
  }

  console.log('\nAll passwords have been reset to: password123')

  // Verify the specific users we need
  const birgen = await prisma.user.findUnique({
    where: { email: 'birgen@thementallap.com' }
  })

  if (!birgen) {
    console.log('\nbirgen@thementallap.com not found! Creating user...')
    await prisma.user.create({
      data: {
        email: 'birgen@thementallap.com',
        password: hashedPassword,
        name: 'Birgen Nelson',
        role: 'coach',
        sport: 'Track & Field',
        bio: 'Mental Performance Coach and former Student Senate Co-President at Gustavus.'
      }
    })
    console.log('Created birgen@thementallap.com')
  }

  const admin = await prisma.user.findUnique({
    where: { email: 'admin@thementallap.com' }
  })

  if (!admin) {
    console.log('\nadmin@thementallap.com not found! Creating user...')
    await prisma.user.create({
      data: {
        email: 'admin@thementallap.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin'
      }
    })
    console.log('Created admin@thementallap.com')
  }
}

resetPasswords()
  .then(() => console.log('\nPassword reset complete!'))
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })