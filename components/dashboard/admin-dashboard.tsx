'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Users, Video, Calendar, BookOpen, TrendingUp, AlertCircle, ClipboardList, DollarSign } from 'lucide-react'

interface DashboardStats {
  totalAthletes: number
  pendingAnalyses: number
  upcomingWorkshops: number
  recentBookings: number
  totalRevenue: number
  activeJournals: number
}

export default function AdminDashboard({ userName }: { userName: string }) {
  const [stats, setStats] = useState<DashboardStats>({
    totalAthletes: 0,
    pendingAnalyses: 0,
    upcomingWorkshops: 0,
    recentBookings: 0,
    totalRevenue: 0,
    activeJournals: 0
  })

  useEffect(() => {
    // Fetch admin statistics
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to fetch stats:', err))
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome back, {userName}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Athletes</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalAthletes}</div>
            <p className="text-xs text-slate-600 mt-1">Active users</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <Video className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.pendingAnalyses}</div>
            <p className="text-xs text-slate-600 mt-1">Videos to analyze</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Revenue (Month)</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${stats.totalRevenue}</div>
            <p className="text-xs text-slate-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Journals</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.activeJournals}</div>
            <p className="text-xs text-slate-600 mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Form Analysis Queue
            </CardTitle>
            <CardDescription>Review submitted videos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              {stats.pendingAnalyses} videos awaiting review
            </p>
            <Link href="/admin/form-analysis">
              <Button className="w-full">Review Videos</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Athlete Management
            </CardTitle>
            <CardDescription>Manage athlete accounts and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              {stats.totalAthletes} registered athletes
            </p>
            <Link href="/admin/athletes">
              <Button className="w-full" variant="outline">Manage Athletes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Workshop Management
            </CardTitle>
            <CardDescription>Create and manage workshops</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              {stats.upcomingWorkshops} upcoming workshops
            </p>
            <Link href="/admin/workshops">
              <Button className="w-full" variant="outline">Manage Workshops</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Content Management
            </CardTitle>
            <CardDescription>Articles and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              Library and recruiting content
            </p>
            <Link href="/admin/content">
              <Button className="w-full" variant="outline">Manage Content</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Session Bookings
            </CardTitle>
            <CardDescription>1:1 coaching requests</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              {stats.recentBookings} new bookings
            </p>
            <Link href="/admin/bookings">
              <Button className="w-full" variant="outline">View Bookings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              System Overview
            </CardTitle>
            <CardDescription>Analytics and reports</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-slate-600">
              View detailed analytics
            </p>
            <Link href="/admin/analytics">
              <Button className="w-full" variant="outline">View Reports</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Video className="h-4 w-4 text-amber-600" />
                <div>
                  <p className="text-sm font-medium">New form analysis submitted</p>
                  <p className="text-xs text-slate-600">Alex Runner - Hurdles technique</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">5 min ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">New athlete registered</p>
                  <p className="text-xs text-slate-600">Jordan Sprinter joined</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">1 hour ago</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Workshop registration</p>
                  <p className="text-xs text-slate-600">Mental Prep - 2 new signups</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">3 hours ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}