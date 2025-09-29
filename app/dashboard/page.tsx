import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/dashboard/admin-dashboard'
import AthleteDashboard from '@/components/dashboard/athlete-dashboard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  // Show admin dashboard for admin users
  if (session.user.role === 'admin') {
    return <AdminDashboard userName={session.user.name || 'Admin'} />
  }

  // Show regular dashboard for athletes and coaches
  return <AthleteDashboard userName={session.user.name || 'Athlete'} />
}