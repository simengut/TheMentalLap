import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SessionsPage() {
  const coaches = [
    {
      id: 'skyla',
      name: 'Skyla Wilson',
      title: 'Hurdles & Sprint Specialist',
      bio: 'NCAA record holder specializing in hurdle rhythm, sprint mechanics, and mental preparation.',
      specialties: ['100H/110H Technique', 'Sprint Mechanics', 'Mental Performance', 'Competition Strategy'],
      calendlyUrl: process.env.CALENDLY_URL_SKYLA,
    },
    {
      id: 'birgen',
      name: 'Birgen Nelson',
      title: 'Mental Performance Coach',
      bio: 'Expert in resilience building, time management, and holistic athlete development.',
      specialties: ['Mental Resilience', 'Goal Setting', 'Time Management', 'Recruiting Strategy'],
      calendlyUrl: process.env.CALENDLY_URL_BIRGEN,
    },
  ]

  const sessionTypes = [
    {
      type: 'mental',
      title: 'Mental Performance',
      duration: '45 min',
      description: 'Work on confidence, focus, and competition mindset',
    },
    {
      type: 'form',
      title: 'Track Hurdles Form Review',
      duration: '30 min',
      description: 'Technical analysis and personalized drills',
    },
    {
      type: 'recruiting',
      title: 'Recruiting Consultation',
      duration: '60 min',
      description: 'Navigate the college recruiting process',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-4xl font-bold">1:1 Coaching Sessions</h1>
        <p className="mb-12 text-lg text-slate-600">
          Get personalized guidance from elite college athletes who understand your journey.
        </p>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Session Types</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {sessionTypes.map((session) => (
              <Card key={session.type}>
                <CardHeader>
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <CardDescription>{session.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{session.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-semibold">Meet Your Coaches</h2>
          <div className="space-y-8">
            {coaches.map((coach) => (
              <Card key={coach.id}>
                <CardHeader>
                  <CardTitle>{coach.name}</CardTitle>
                  <CardDescription>{coach.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-slate-600">{coach.bio}</p>
                  <div className="mb-6">
                    <h4 className="mb-2 text-sm font-semibold">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/sessions/book/${coach.id}`}>
                      <Button variant="brand">Book with {coach.name.split(' ')[0]}</Button>
                    </Link>
                    {coach.calendlyUrl && (
                      <a href={coach.calendlyUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline">Schedule via Calendly</Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-lg bg-slate-50 p-8">
          <h2 className="mb-4 text-2xl font-semibold">How It Works</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo text-sm font-semibold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold">Choose Your Coach</h3>
                <p className="text-sm text-slate-600">
                  Select based on your goals and their specialties
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo text-sm font-semibold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold">Book Your Session</h3>
                <p className="text-sm text-slate-600">
                  Pick a time that works for your schedule
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo text-sm font-semibold text-white">
                3
              </span>
              <div>
                <h3 className="font-semibold">Prepare Your Questions</h3>
                <p className="text-sm text-slate-600">
                  Come ready with specific goals and challenges
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-indigo text-sm font-semibold text-white">
                4
              </span>
              <div>
                <h3 className="font-semibold">Meet & Learn</h3>
                <p className="text-sm text-slate-600">
                  Get personalized advice and actionable strategies
                </p>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}