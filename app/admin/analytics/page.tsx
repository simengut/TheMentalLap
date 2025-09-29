import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Users, DollarSign, Activity, Calendar, BookOpen, Video, Award } from 'lucide-react'

export default async function SystemAnalyticsPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch comprehensive analytics
  const now = new Date()
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // User analytics
  const totalUsers = await prisma.user.count()
  const totalAthletes = await prisma.user.count({ where: { role: 'athlete' } })
  const totalAdmins = await prisma.user.count({ where: { role: 'admin' } })
  const newUsersThisMonth = await prisma.user.count({
    where: { createdAt: { gte: thisMonth } }
  })

  // Journal analytics
  const totalJournalEntries = await prisma.journalEntry.count()
  const journalEntriesThisWeek = await prisma.journalEntry.count({
    where: { createdAt: { gte: thisWeek } }
  })
  const avgMood = await prisma.journalEntry.aggregate({
    _avg: { mood: true }
  })
  const avgSleep = await prisma.journalEntry.aggregate({
    _avg: { sleepHours: true }
  })

  // Workshop analytics
  const totalWorkshops = await prisma.workshop.count()
  const upcomingWorkshops = await prisma.workshop.count({
    where: { startsAt: { gte: now } }
  })
  const totalRegistrations = await prisma.registration.count()

  // Calculate workshop revenue
  const workshops = await prisma.workshop.findMany({
    include: { registrations: true }
  })
  const totalRevenue = workshops.reduce((sum, w) =>
    sum + (w.registrations.length * w.priceCents / 100), 0
  )
  const revenueThisMonth = workshops
    .filter(w => w.startsAt >= thisMonth)
    .reduce((sum, w) => sum + (w.registrations.length * w.priceCents / 100), 0)

  // Content analytics
  const totalArticles = await prisma.article.count()
  const publishedArticles = await prisma.article.count({
    where: { publishedAt: { not: null } }
  })

  // Form analysis analytics
  const totalAnalyses = await prisma.formAnalysis.count()
  const pendingAnalyses = await prisma.formAnalysis.count({
    where: { status: { in: ['submitted', 'in_review'] } }
  })
  const completedAnalyses = await prisma.formAnalysis.count({
    where: { status: 'complete' }
  })

  // Booking analytics
  const totalBookings = await prisma.booking.count()
  const pendingBookings = await prisma.booking.count({
    where: { status: 'requested' }
  })
  const completedBookings = await prisma.booking.count({
    where: { status: 'completed' }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Analytics</h1>
        <p className="text-slate-600 mt-2">Comprehensive platform metrics and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className="text-xs text-slate-600 mt-1">+{newUsersThisMonth} this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-slate-600 mt-1">${revenueThisMonth.toFixed(2)} this month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Athletes</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalAthletes}</div>
            <p className="text-xs text-slate-600 mt-1">{journalEntriesThisWeek} journal entries/week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Award className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {totalAnalyses > 0 ? Math.round((completedAnalyses / totalAnalyses) * 100) : 0}%
            </div>
            <p className="text-xs text-slate-600 mt-1">Form analysis completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* User Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Athletes</span>
                <span className="font-semibold">{totalAthletes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Coaches/Admins</span>
                <span className="font-semibold">{totalAdmins}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">New This Month</span>
                <span className="font-semibold">{newUsersThisMonth}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Active Rate</span>
                <span className="font-semibold">
                  {totalAthletes > 0
                    ? Math.round((journalEntriesThisWeek / totalAthletes) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Journal Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Journal Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Entries</span>
                <span className="font-semibold">{totalJournalEntries}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Entries This Week</span>
                <span className="font-semibold">{journalEntriesThisWeek}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Average Mood</span>
                <span className="font-semibold">
                  {avgMood._avg.mood ? avgMood._avg.mood.toFixed(1) : '0'}/5
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Average Sleep</span>
                <span className="font-semibold">
                  {avgSleep._avg.sleepHours ? avgSleep._avg.sleepHours.toFixed(1) : '0'}h
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workshop Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Workshop Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Workshops</span>
                <span className="font-semibold">{totalWorkshops}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Upcoming</span>
                <span className="font-semibold">{upcomingWorkshops}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Total Registrations</span>
                <span className="font-semibold">{totalRegistrations}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Avg. per Workshop</span>
                <span className="font-semibold">
                  {totalWorkshops > 0
                    ? Math.round(totalRegistrations / totalWorkshops)
                    : 0}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Service Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Form Analyses</span>
                <span className="font-semibold">{totalAnalyses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Pending Review</span>
                <span className="font-semibold text-amber-600">{pendingAnalyses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Session Bookings</span>
                <span className="font-semibold">{totalBookings}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Articles Published</span>
                <span className="font-semibold">{publishedArticles}/{totalArticles}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Platform Performance</CardTitle>
          <CardDescription>Key performance indicators and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {totalAthletes > 0 && journalEntriesThisWeek > 0
                  ? Math.round((journalEntriesThisWeek / (totalAthletes * 7)) * 100)
                  : 0}%
              </div>
              <p className="text-sm text-slate-600 mt-1">Daily Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {totalBookings > 0
                  ? Math.round((completedBookings / totalBookings) * 100)
                  : 0}%
              </div>
              <p className="text-sm text-slate-600 mt-1">Session Completion Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {totalWorkshops > 0 && totalRegistrations > 0
                  ? Math.round(totalRegistrations / totalWorkshops)
                  : 0}
              </div>
              <p className="text-sm text-slate-600 mt-1">Avg Workshop Size</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">
                ${totalAthletes > 0
                  ? (totalRevenue / totalAthletes).toFixed(2)
                  : '0.00'}
              </div>
              <p className="text-sm text-slate-600 mt-1">Revenue per User</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Export Reports</CardTitle>
          <CardDescription>Download detailed analytics reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">Export User Report</Button>
            <Button variant="outline">Export Revenue Report</Button>
            <Button variant="outline">Export Activity Report</Button>
            <Button variant="outline">Export Full Analytics</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}