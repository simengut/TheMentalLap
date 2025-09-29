import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Welcome back, {session.user.name}!</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Journal Tracker</CardTitle>
            <CardDescription>Track your mental and physical readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">7 entries this week</p>
            <Link href="/journal">
              <Button className="w-full">Open Journal</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Your scheduled coaching sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">No sessions scheduled</p>
            <Link href="/sessions">
              <Button className="w-full" variant="outline">Book Session</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workshops</CardTitle>
            <CardDescription>Group learning opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">3 workshops available</p>
            <Link href="/workshops">
              <Button className="w-full" variant="outline">Browse Workshops</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Analysis</CardTitle>
            <CardDescription>Technical video review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">1 analysis pending</p>
            <Link href="/form-analysis">
              <Button className="w-full" variant="outline">Submit Video</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mental Skills</CardTitle>
            <CardDescription>Performance psychology resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">New content available</p>
            <Link href="/library">
              <Button className="w-full" variant="outline">Browse Library</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recruiting Tips</CardTitle>
            <CardDescription>College recruiting guidance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">5 essential guides</p>
            <Link href="/recruiting-tips">
              <Button className="w-full" variant="outline">Get Started</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}