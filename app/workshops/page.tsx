import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

async function getWorkshops() {
  try {
    const workshops = await prisma.workshop.findMany({
      orderBy: { startsAt: 'asc' },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    })
    return workshops
  } catch (error) {
    return []
  }
}

export default async function WorkshopsPage() {
  const workshops = await getWorkshops()

  const upcomingWorkshops = workshops.filter(w => new Date(w.startsAt) > new Date())
  const pastWorkshops = workshops.filter(w => new Date(w.startsAt) <= new Date())

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/25 via-green-50/15 to-stone-50 -z-10"></div>
      <div className="mx-auto max-w-4xl relative">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">Workshops & Training Sessions</h1>
        <p className="mb-12 text-lg text-slate-700">
          Learn from elite athletes in interactive group sessions designed to elevate your performance.
        </p>

        <section className="mb-12 p-8 bg-gradient-to-br from-white/90 to-green-50/20 rounded-xl backdrop-blur-sm shadow-xl">
          <h2 className="mb-6 text-2xl font-semibold text-primary-700">Upcoming Workshops</h2>
          {upcomingWorkshops.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-slate-600">No upcoming workshops at this time. Check back soon!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {upcomingWorkshops.map((workshop) => (
                <Card key={workshop.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{workshop.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {new Date(workshop.startsAt).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })} • {workshop.durationMin} minutes
                        </CardDescription>
                      </div>
                      {workshop.priceCents > 0 && (
                        <div className="text-lg font-semibold text-track-gold">
                          ${(workshop.priceCents / 100).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-slate-600">{workshop.summary}</p>
                    <div className="mb-4 flex items-center gap-4 text-sm text-neutral-500">
                      <span>📍 {workshop.location}</span>
                      <span>👥 {workshop._count.registrations}/{workshop.capacity} registered</span>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        variant="brand"
                        disabled={workshop._count.registrations >= workshop.capacity}
                      >
                        {workshop._count.registrations >= workshop.capacity ? 'Full' : 'Register Now'}
                      </Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {pastWorkshops.length > 0 && (
          <section className="mb-12 p-8 bg-gradient-to-bl from-emerald-50/30 to-stone-50 rounded-xl backdrop-blur-sm shadow-xl">
            <h2 className="mb-6 text-2xl font-semibold text-accent-700">Past Workshops</h2>
            <div className="space-y-4">
              {pastWorkshops.map((workshop) => (
                <Card key={workshop.id} className="opacity-75">
                  <CardHeader>
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                    <CardDescription>
                      {new Date(workshop.startsAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-xl bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-stone-50 p-8 shadow-xl border border-green-200/20">
          <h2 className="mb-4 text-2xl font-semibold">Why Join Our Workshops?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Learn from Experience</h3>
              <p className="text-sm text-slate-600">
                Our coaches have competed at the highest collegiate levels and share real strategies that work.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Interactive Learning</h3>
              <p className="text-sm text-slate-600">
                Small group settings ensure personalized attention and meaningful Q&A sessions.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Practical Application</h3>
              <p className="text-sm text-slate-600">
                Walk away with actionable techniques you can implement immediately in training and competition.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Community Connection</h3>
              <p className="text-sm text-slate-600">
                Connect with other dedicated athletes who share your commitment to excellence.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}