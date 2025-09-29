import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Calendar, Clock, User, MessageSquare, Video, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default async function BookingsManagementPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch all bookings with related data
  const bookings = await prisma.booking.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          sport: true
        }
      },
      coach: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const pendingBookings = bookings.filter(b => b.status === 'requested')
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed')
  const completedBookings = bookings.filter(b => b.status === 'completed')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Session Bookings</h1>
        <p className="text-slate-600 mt-2">Manage 1:1 coaching session requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pendingBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{confirmedBookings.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {completedBookings.filter(b => {
                const thisMonth = new Date()
                thisMonth.setDate(1)
                thisMonth.setHours(0, 0, 0, 0)
                return b.updatedAt >= thisMonth
              }).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Pending ({pendingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Confirmed ({confirmedBookings.length})
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Completed ({completedBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold">Pending Requests</h3>
                {pendingBookings.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No pending booking requests</p>
                ) : (
                  <div className="space-y-3">
                    {pendingBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 bg-amber-50 hover:bg-amber-100 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="secondary" className="bg-amber-200">
                                Pending Review
                              </Badge>
                              <span className="font-semibold">{booking.type === 'video' ? 'Video Call' : booking.type}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <p className="text-sm font-medium text-slate-700">Athlete</p>
                                <p className="text-sm text-slate-600">
                                  {booking.user.name} ({booking.user.email})
                                </p>
                                {booking.user.sport && (
                                  <p className="text-xs text-slate-500">Sport: {booking.user.sport}</p>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-700">Requested Coach</p>
                                <p className="text-sm text-slate-600">{booking.coach.name}</p>
                              </div>
                            </div>

                            {booking.message && (
                              <div className="bg-white p-3 rounded border mb-3">
                                <p className="text-sm font-medium mb-1 flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  Message from athlete:
                                </p>
                                <p className="text-sm text-slate-600">{booking.message}</p>
                              </div>
                            )}

                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Requested {new Date(booking.createdAt).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(booking.createdAt).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="default">
                              Approve & Schedule
                            </Button>
                            <Button size="sm" variant="outline">
                              Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="confirmed">
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold">Confirmed Sessions</h3>
                {confirmedBookings.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No confirmed sessions</p>
                ) : (
                  <div className="space-y-3">
                    {confirmedBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 bg-blue-50 hover:bg-blue-100 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-blue-600">
                                Confirmed
                              </Badge>
                              <span className="font-semibold">
                                {booking.type === 'video' ? 'Video Call' : booking.type}
                              </span>
                              {booking.scheduledAt && (
                                <span className="text-sm text-slate-600">
                                  Scheduled: {new Date(booking.scheduledAt).toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm font-medium text-slate-700">Athlete</p>
                                <p className="text-sm text-slate-600">{booking.user.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-700">Coach</p>
                                <p className="text-sm text-slate-600">{booking.coach.name}</p>
                              </div>
                              {booking.externalLink && (
                                <div>
                                  <p className="text-sm font-medium text-slate-700">Meeting Link</p>
                                  <a href={booking.externalLink} className="text-sm text-blue-600 underline">
                                    Join Session
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" variant="default">
                              Mark Complete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold">Completed Sessions</h3>
                {completedBookings.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No completed sessions</p>
                ) : (
                  <div className="space-y-3">
                    {completedBookings.map((booking) => (
                      <div key={booking.id} className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                Completed
                              </Badge>
                              <span className="font-semibold">
                                {booking.type === 'video' ? 'Video Call' : booking.type}
                              </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-slate-600">
                              <span>Athlete: {booking.user.name}</span>
                              <span>Coach: {booking.coach.name}</span>
                              {booking.scheduledAt && (
                                <span>Completed: {new Date(booking.scheduledAt).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>

                          <Button size="sm" variant="ghost">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}