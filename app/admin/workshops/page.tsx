'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, Users, DollarSign, Edit, Copy } from 'lucide-react'
import Link from 'next/link'

interface Workshop {
  id: string
  title: string
  summary: string
  startsAt: string
  durationMin: number
  location: string
  priceCents: number
  capacity: number
  registrations: {
    id: string
    user: {
      name: string
      email: string
    }
  }[]
}

export default function WorkshopManagementPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return

    if (!session || (session.user as any)?.role !== 'admin') {
      router.push('/dashboard')
      return
    }

    fetchWorkshops()
  }, [session, status, router])

  async function fetchWorkshops() {
    try {
      const response = await fetch('/api/admin/workshops')
      if (response.ok) {
        const data = await response.json()
        setWorkshops(data)
      }
    } catch (error) {
      console.error('Failed to fetch workshops:', error)
    } finally {
      setLoading(false)
    }
  }

  function copyEmails(emails: string[]) {
    const emailString = emails.join(', ')
    navigator.clipboard.writeText(emailString)
    alert('Email addresses copied to clipboard!')
  }

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== 'admin') {
    return null
  }

  const now = new Date()
  const upcomingWorkshops = workshops.filter(w => new Date(w.startsAt) >= now)
  const pastWorkshops = workshops.filter(w => new Date(w.startsAt) < now)

  // Calculate revenue
  const totalRevenue = workshops.reduce((sum, workshop) => {
    return sum + (workshop.registrations.length * workshop.priceCents / 100)
  }, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Workshop Management</h1>
            <p className="text-slate-600 mt-2">Create and manage workshops</p>
          </div>
          <Link href="/admin/workshops/create">
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Create Workshop
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Workshops</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingWorkshops.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workshops.reduce((sum, w) => sum + w.registrations.length, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workshops.length > 0
                ? Math.round(workshops.reduce((sum, w) => sum + w.registrations.length, 0) / workshops.length)
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Workshops */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Workshops</CardTitle>
          <CardDescription>Workshops scheduled for the future</CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingWorkshops.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No upcoming workshops scheduled</p>
          ) : (
            <div className="space-y-4">
              {upcomingWorkshops.map((workshop) => {
                const isFull = workshop.registrations.length >= workshop.capacity
                const spotsLeft = workshop.capacity - workshop.registrations.length

                return (
                  <div key={workshop.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{workshop.title}</h3>
                          {isFull ? (
                            <Badge variant="destructive">Full</Badge>
                          ) : (
                            <Badge variant="outline" className="text-green-600">
                              {spotsLeft} spots left
                            </Badge>
                          )}
                        </div>

                        <p className="text-slate-600 text-sm mb-3">{workshop.summary}</p>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div className="flex items-center gap-1 text-slate-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(workshop.startsAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <Clock className="h-4 w-4" />
                            {new Date(workshop.startsAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <MapPin className="h-4 w-4" />
                            {workshop.location}
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <Users className="h-4 w-4" />
                            {workshop.registrations.length}/{workshop.capacity}
                          </div>
                          <div className="flex items-center gap-1 text-slate-600">
                            <DollarSign className="h-4 w-4" />
                            ${(workshop.priceCents / 100).toFixed(2)}
                          </div>
                        </div>

                        {workshop.registrations.length > 0 && (
                          <div className="mt-3 p-2 bg-slate-50 rounded">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium">Registered Athletes:</p>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyEmails(workshop.registrations.map(r => r.user.email))}
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy Emails
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {workshop.registrations.slice(0, 5).map((reg) => (
                                <span key={reg.id} className="text-xs bg-white px-2 py-1 rounded border">
                                  {reg.user.name} ({reg.user.email})
                                </span>
                              ))}
                              {workshop.registrations.length > 5 && (
                                <span className="text-xs text-slate-500">
                                  +{workshop.registrations.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Workshops */}
      <Card>
        <CardHeader>
          <CardTitle>Past Workshops</CardTitle>
          <CardDescription>Completed workshops</CardDescription>
        </CardHeader>
        <CardContent>
          {pastWorkshops.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No past workshops</p>
          ) : (
            <div className="space-y-4">
              {pastWorkshops.slice(0, 5).map((workshop) => (
                <div key={workshop.id} className="border rounded-lg p-4 bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{workshop.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(workshop.startsAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {workshop.registrations.length} attended
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${(workshop.registrations.length * workshop.priceCents / 100).toFixed(2)} revenue
                        </span>
                      </div>
                      {workshop.registrations.length > 0 && (
                        <div className="mt-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyEmails(workshop.registrations.map(r => r.user.email))}
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy {workshop.registrations.length} emails
                          </Button>
                        </div>
                      )}
                    </div>
                    <Button size="sm" variant="ghost">
                      View Report
                    </Button>
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