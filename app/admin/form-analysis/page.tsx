import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Video, Clock, User, Calendar, CheckCircle, AlertCircle } from 'lucide-react'

export default async function FormAnalysisQueuePage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch all form analyses with athlete details
  const analyses = await prisma.formAnalysis.findMany({
    include: {
      athlete: {
        select: {
          name: true,
          email: true,
          sport: true
        }
      },
      comments: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const pendingAnalyses = analyses.filter(a => a.status === 'submitted' || a.status === 'in_review')
  const completedAnalyses = analyses.filter(a => a.status === 'complete')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Form Analysis Queue</h1>
        <p className="text-slate-600 mt-2">Review and provide feedback on submitted videos</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingAnalyses.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyses.filter(a => a.status === 'in_review').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedAnalyses.filter(a => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                return a.updatedAt >= today
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyses.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Analyses */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pending Reviews</CardTitle>
          <CardDescription>Videos awaiting your analysis</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingAnalyses.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No videos pending review</p>
          ) : (
            <div className="space-y-4">
              {pendingAnalyses.map((analysis) => (
                <div key={analysis.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="h-4 w-4 text-slate-500" />
                        <h3 className="font-semibold">{analysis.event}</h3>
                        <Badge variant={analysis.status === 'submitted' ? 'secondary' : 'default'}>
                          {analysis.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {analysis.athlete.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(analysis.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(analysis.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      {analysis.notes && (
                        <p className="mt-2 text-sm text-slate-600">{analysis.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/form-analysis/${analysis.id}`}>
                        <Button size="sm">Review Video</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Completed Analyses */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Completed</CardTitle>
          <CardDescription>Analyses you've already reviewed</CardDescription>
        </CardHeader>
        <CardContent>
          {completedAnalyses.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No completed analyses</p>
          ) : (
            <div className="space-y-4">
              {completedAnalyses.slice(0, 5).map((analysis) => (
                <div key={analysis.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <h3 className="font-semibold">{analysis.event}</h3>
                        <Badge variant="outline" className="text-green-600">
                          Completed
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {analysis.athlete.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(analysis.updatedAt).toLocaleDateString()}
                        </span>
                        <span>{analysis.comments.length} comments</span>
                      </div>
                    </div>
                    <Link href={`/admin/form-analysis/${analysis.id}`}>
                      <Button size="sm" variant="outline">View Analysis</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}