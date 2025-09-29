import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-track px-4 py-24 text-center text-white relative overflow-hidden">
        <div className="mx-auto max-w-4xl relative z-10">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg">
            Train your mind. Grow your edge.
          </h1>
          <p className="mb-10 text-xl text-white/90">
            Journals, workshops, 1:1 sessions, and pro-grade form analysis—built by athletes, for athletes.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/journal">
              <Button size="lg" variant="brand">Start Journal</Button>
            </Link>
            <Link href="/sessions">
              <Button size="lg" variant="brand">Book a Session</Button>
            </Link>
            <Link href="/workshops">
              <Button size="lg" variant="brand">Join a Workshop</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-br from-emerald-50/20 via-green-50/10 to-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="mx-auto max-w-6xl relative z-10">
          <h2 className="mb-4 text-center text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            Built by Athletes Who've Been There
          </h2>
          <p className="mb-12 text-center text-lg text-slate-600">
            Learn from elite college athletes who understand the mental and physical demands of competition.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Skyla Wilson</CardTitle>
                <CardDescription>UPenn Track & Field</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-600">
                  NCAA East Prelim qualifier, First-Team All-Ivy hurdler/sprinter. Program record holder in 60H (8.29), 100H (13.45), 200m (23.54), and 400H (58.26).
                </p>
                <p className="italic text-slate-500">
                  "In hurdles, rhythm is everything—find your tempo, then trust it."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Birgen Nelson</CardTitle>
                <CardDescription>Coach & Mental Performance Specialist</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-slate-600">
                  Mental Performance Coach, former Student Senate Co-President at Gustavus, Track & Field Student Assistant. Specializes in resilience, time management, and sprint/hurdle analysis.
                </p>
                <p className="italic text-slate-500">
                  "Small habits build resilient competitors. Mental strength grows with consistent care."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-bl from-green-50/15 via-stone-50 to-emerald-50/10 px-4 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="mx-auto max-w-6xl relative z-10">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
            Everything You Need to Excel
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Journal Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Track mood, RPE, sleep, and performance notes. Build awareness and identify patterns.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1:1 Video Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Personal sessions with elite athletes for mental performance and technical coaching.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Workshops</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Group sessions on mental skills, recruiting strategy, and performance optimization.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Form Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Submit sprint/hurdle videos for professional technical feedback and improvement tips.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recruiting Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Navigate the college recruiting process with guides from athletes who've been there.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Mental Skills Library</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Evidence-based techniques for confidence, focus, and pre-competition preparation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 bg-gradient-to-tr from-stone-50 via-green-50/20 to-emerald-50/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h2 className="mb-8 text-3xl font-bold text-slate-900">
            Ready to Level Up?
          </h2>
          <p className="mb-8 text-lg text-slate-600">
            Join hundreds of athletes who are training smarter and competing stronger.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" variant="brand">Get Started Free</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}