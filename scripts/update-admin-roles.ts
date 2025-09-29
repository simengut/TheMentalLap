import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateAdminRoles() {
  // Update Birgen to admin
  const birgen = await prisma.user.update({
    where: { email: 'birgen@thementallap.com' },
    data: { role: 'admin' }
  })
  console.log(`✅ Updated ${birgen.name} to admin role`)

  // Update Skyla to admin
  const skyla = await prisma.user.update({
    where: { email: 'skyla@thementallap.com' },
    data: { role: 'admin' }
  })
  console.log(`✅ Updated ${skyla.name} to admin role`)

  // Keep the original admin as well
  const adminUser = await prisma.user.findUnique({
    where: { email: 'admin@thementallap.com' }
  })
  if (adminUser) {
    console.log(`✅ admin@thementallap.com remains admin`)
  }

  // List all admin users
  const admins = await prisma.user.findMany({
    where: { role: 'admin' },
    select: { email: true, name: true }
  })

  console.log('\n📊 All admin users:')
  admins.forEach(admin => {
    console.log(`   - ${admin.name} (${admin.email})`)
  })
}

updateAdminRoles()
  .then(() => console.log('\n✅ Admin roles updated successfully!'))
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })