'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface JournalEntry {
  id: string
  date: string
  mood: number
  sleepHours: number
  rpe: number
  tags: string[]
  notes: string
}

export default function JournalPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [showNewEntry, setShowNewEntry] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!session) {
    return null
  }

  const moodEmojis = ['😔', '😕', '😐', '🙂', '😄']

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Journal Tracker</h1>
        <Button onClick={() => setShowNewEntry(!showNewEntry)} variant="brand">
          {showNewEntry ? 'Cancel' : 'New Entry'}
        </Button>
      </div>

      {showNewEntry && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Journal Entry</CardTitle>
            <CardDescription>Track your mental and physical readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Sleep Hours</Label>
                  <Input type="number" min="0" max="24" step="0.5" placeholder="7.5" />
                </div>
                <div className="space-y-2">
                  <Label>RPE (1-10)</Label>
                  <Input type="number" min="1" max="10" placeholder="6" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Mood</Label>
                <div className="flex gap-4">
                  {moodEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      type="button"
                      className="rounded-lg border-2 border-slate-200 p-3 text-2xl hover:border-brand-indigo focus:border-brand-indigo focus:outline-none"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="training, competition, recovery (comma separated)" />
              </div>

              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea
                  placeholder="How did you feel today? What went well? What could be improved?"
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full">Save Entry</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Entries</span>
                <span className="font-semibold">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Avg Mood</span>
                <span className="font-semibold">3.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Avg Sleep</span>
                <span className="font-semibold">7.2 hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Avg RPE</span>
                <span className="font-semibold">6.5/10</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-brand-indigo">7 days</p>
            <p className="text-sm text-slate-600">Keep it going! 🔥</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">training (12)</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">competition (4)</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">recovery (8)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Recent Entries</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">🙂</span>
                  <div>
                    <p className="font-semibold">January {20 + i}, 2024</p>
                    <p className="text-sm text-slate-600">Sleep: 7.5h | RPE: 6/10</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">training</span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">morning</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Mood Trends</h2>
        <Card>
          <CardContent className="p-6">
            <div className="h-64 flex items-end justify-between gap-2">
              {[3, 4, 3.5, 4.5, 3, 4, 5].map((mood, i) => (
                <div
                  key={i}
                  className="flex-1 bg-brand-indigo rounded-t"
                  style={{ height: `${(mood / 5) * 100}%` }}
                  title={`Day ${i + 1}: ${mood}/5`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-600">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}