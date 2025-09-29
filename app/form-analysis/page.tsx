'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function FormAnalysisPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (status === 'loading') {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-track-gold/20 via-primary-100/30 to-accent-100/40 -z-10"></div>
        <div className="mx-auto max-w-2xl text-center relative">
          <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-track-gold to-primary-600 bg-clip-text text-transparent">Form Analysis</h1>
          <p className="mb-8 text-lg text-slate-700">
            Get professional technical feedback on your sprint and hurdle form.
          </p>
          <Card>
            <CardContent className="py-12">
              <p className="mb-6 text-slate-600">
                Please sign in to submit videos for analysis.
              </p>
              <Button onClick={() => router.push('/auth/signin')} variant="brand">
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setUploading(true)
    // Simulate upload
    setTimeout(() => {
      setUploading(false)
      setSubmitted(true)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-track-gold/20 via-primary-100/30 to-accent-100/40 -z-10"></div>
        <div className="mx-auto max-w-2xl relative">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="mb-4 text-4xl">✅</div>
              <h2 className="mb-2 text-2xl font-semibold">Video Submitted!</h2>
              <p className="mb-6 text-slate-600">
                Your video has been submitted for analysis. Our coaches will review it within 48 hours.
              </p>
              <Button onClick={() => router.push('/dashboard')}>
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-track-gold/20 via-primary-100/30 to-accent-100/40 -z-10"></div>
      <div className="mx-auto max-w-4xl relative">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-track-gold to-primary-600 bg-clip-text text-transparent">Form Analysis</h1>
        <p className="mb-12 text-lg text-slate-700">
          Submit your sprint or hurdle video for professional technical feedback from elite athletes.
        </p>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Video</CardTitle>
                <CardDescription>
                  Upload a clear video of your sprint or hurdle performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="event">Event</Label>
                    <select
                      id="event"
                      className="w-full rounded-md border border-slate-200 px-3 py-2"
                      required
                    >
                      <option value="">Select your event</option>
                      <option value="hurdles_60">60m Hurdles</option>
                      <option value="hurdles_100">100m Hurdles</option>
                      <option value="hurdles_110">110m Hurdles</option>
                      <option value="hurdles_400">400m Hurdles</option>
                      <option value="sprint">Sprint (60m-400m)</option>
                      <option value="relay">Relay</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pr">Personal Record (optional)</Label>
                    <Input
                      id="pr"
                      placeholder="e.g., 13.45 for 100H"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video">Video Upload</Label>
                    <Button
                      type="button"
                      onClick={() => window.open('https://forms.gle/rmAiY8psPvyNAhtTA', '_blank')}
                      className="w-full"
                      variant="outline"
                    >
                      Upload Video via Google Forms
                    </Button>
                    <p className="text-xs text-slate-500">
                      Click to open upload form in a new tab
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes for Coach</Label>
                    <Textarea
                      id="notes"
                      rows={4}
                      placeholder="What specific aspects would you like feedback on? Any particular challenges you're facing?"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={uploading}
                    variant="brand"
                  >
                    {uploading ? 'Uploading...' : 'Submit for Analysis'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What We Analyze</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500">✓</span>
                    <span>Block/start mechanics and acceleration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500">✓</span>
                    <span>Body positioning and angles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500">✓</span>
                    <span>Hurdle clearance and rhythm (if applicable)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500">✓</span>
                    <span>Arm swing and coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500">✓</span>
                    <span>Ground contact and stride patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500">✓</span>
                    <span>Specific technical improvements</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-xs font-semibold text-white shadow-md">
                    1
                  </div>
                  <div>
                    <p className="font-semibold">Upload Your Video</p>
                    <p className="text-slate-600">Submit a clear side-view recording</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-xs font-semibold text-white shadow-md">
                    2
                  </div>
                  <div>
                    <p className="font-semibold">Coach Review</p>
                    <p className="text-slate-600">Elite athletes analyze your technique</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-xs font-semibold text-white shadow-md">
                    3
                  </div>
                  <div>
                    <p className="font-semibold">Receive Feedback</p>
                    <p className="text-slate-600">Get detailed notes and drills within 48 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-track-gold/30 bg-gradient-to-br from-track-gold/20 via-primary-50 to-accent-50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">Tips for Best Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>• Film from the side at hip height</li>
                  <li>• Include your entire body in frame</li>
                  <li>• Use good lighting (outdoor preferred)</li>
                  <li>• Film at normal speed (no slow-mo)</li>
                  <li>• Include 2-3 repetitions if possible</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}