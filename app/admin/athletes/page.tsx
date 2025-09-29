import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { User, Mail, Trophy, Calendar, Activity, BookOpen } from 'lucide-react'

export default async function AthleteManagementPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch all athletes with their related data
  const athletes = await prisma.user.findMany({
    where: { role: 'athlete' },
    include: {
      journalEntries: {
        take: 5,
        orderBy: { createdAt: 'desc' }
      },
      formAnalyses: {
        take: 3,
        orderBy: { createdAt: 'desc' }
      },
      bookingsAsAthlete: {
        take: 3,
        orderBy: { createdAt: 'desc' }
      },
      registrations: {
        include: {
          workshop: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Calculate stats
  const activeAthletes = athletes.filter(athlete => {
    const lastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return athlete.journalEntries.some(entry => entry.createdAt >= lastWeek)
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Athlete Management</h1>
        <p className="text-slate-600 mt-2">Manage athlete accounts and track their progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Athletes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{athletes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAthletes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {athletes.filter(a => {
                const thisMonth = new Date()
                thisMonth.setDate(1)
                thisMonth.setHours(0, 0, 0, 0)
                return a.createdAt >= thisMonth
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Journal Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {athletes.length > 0
                ? Math.round(athletes.reduce((sum, a) => sum + a.journalEntries.length, 0) / athletes.length)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Athletes List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Athletes</CardTitle>
              <CardDescription>Click on an athlete to view detailed information</CardDescription>
            </div>
            <Button>
              <User className="h-4 w-4 mr-2" />
              Add Athlete
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {athletes.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No athletes registered yet</p>
          ) : (
            <div className="space-y-4">
              {athletes.map((athlete) => {
                const isActive = activeAthletes.includes(athlete)
                const latestJournal = athlete.journalEntries[0]

                return (
                  <div key={athlete.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-sage-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold flex items-center gap-2">
                              {athlete.name}
                              {isActive && (
                                <Badge variant="outline" className="text-green-600">Active</Badge>
                              )}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {athlete.email}
                              </span>
                              {athlete.sport && (
                                <span className="flex items-center gap-1">
                                  <Trophy className="h-3 w-3" />
                                  {athlete.sport}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                              {athlete.journalEntries.length} journal entries
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                              {athlete.formAnalyses.length} form analyses
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                              {athlete.registrations.length} workshops
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-600">
                              Joined {new Date(athlete.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {latestJournal && (
                          <div className="mt-3 p-2 bg-slate-50 rounded text-sm">
                            <span className="text-slate-500">Latest journal:</span>
                            <span className="ml-2">
                              Mood: {latestJournal.mood}/5 |
                              Sleep: {latestJournal.sleepHours}h |
                              RPE: {latestJournal.rpe}/10
                            </span>
                            <span className="text-slate-400 ml-2">
                              ({new Date(latestJournal.createdAt).toLocaleDateString()})
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/admin/athletes/${athlete.id}`}>
                          <Button size="sm" variant="outline">View Details</Button>
                        </Link>
                        <Button size="sm" variant="ghost">Message</Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}