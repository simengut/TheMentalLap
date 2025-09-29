import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/prisma'

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        section: 'library',
        publishedAt: { not: null }
      },
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: { name: true }
        }
      }
    })
    return articles
  } catch (error) {
    return []
  }
}

export default async function LibraryPage() {
  const articles = await getArticles()

  const mentalSkills = [
    {
      category: 'Pre-Competition',
      icon: '',
      description: 'Preparation techniques for peak readiness',
      skills: [
        { title: 'Visualization', desc: 'Mental rehearsal for perfect execution' },
        { title: 'Breathing Exercises', desc: 'Calm nerves and enhance focus' },
        { title: 'Routine Building', desc: 'Create consistency through rituals' }
      ]
    },
    {
      category: 'During Competition',
      icon: '',
      description: 'In-the-moment strategies for excellence',
      skills: [
        { title: 'Focus Cues', desc: 'Stay present and locked in' },
        { title: 'Energy Management', desc: 'Optimize arousal levels' },
        { title: 'Reset Techniques', desc: 'Bounce back from mistakes' }
      ]
    },
    {
      category: 'Growth Mindset',
      icon: '',
      description: 'Long-term mental development',
      skills: [
        { title: 'Goal Setting', desc: 'Create meaningful objectives' },
        { title: 'Self-Talk', desc: 'Build confidence through language' },
        { title: 'Resilience', desc: 'Learn and grow from setbacks' }
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-100/30 via-primary-100/40 to-track-gold/20 -z-10"></div>
      <div className="mx-auto max-w-4xl relative">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-accent-500 via-primary-600 to-track-gold bg-clip-text text-transparent">Mental Performance Library</h1>
        <p className="mb-12 text-lg text-slate-700">
          Evidence-based techniques to strengthen your mental game, curated by elite athletes.
        </p>

        <section className="mb-12">
          <div className="rounded-xl bg-gradient-to-r from-primary-100/80 via-accent-100/60 to-track-gold/30 p-8 shadow-xl border border-accent-200/50">
            <h2 className="mb-4 text-2xl font-semibold">Your Mental Training Toolkit</h2>
            <p className="mb-6 text-slate-600">
              Mental performance is a skill that can be developed. Just like physical training,
              consistent practice of these techniques will elevate your competitive edge.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {mentalSkills.map((skill) => (
                <div key={skill.category} className="rounded-lg bg-gradient-to-br from-white/90 to-accent-50/70 p-4 shadow-md hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold">{skill.category}</h3>
                  <p className="text-sm text-slate-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Featured Techniques</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href={`/library/${article.slug}`} className="hover:text-brand-indigo">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    By {article.author.name} • {new Date(article.publishedAt!).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-slate-600">{article.excerpt}</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/library/${article.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Quick Techniques</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  60-Second Reset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-600">
                  When you need to quickly refocus between attempts or after a mistake:
                </p>
                <ol className="space-y-2 text-sm">
                  <li>1. Take 3 deep breaths (4 counts in, 6 counts out)</li>
                  <li>2. Release tension with a physical cue (shake out, roll shoulders)</li>
                  <li>3. State one positive affirmation</li>
                  <li>4. Visualize your next successful attempt</li>
                  <li>5. Engage with a focusing cue word</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Box Breathing for Calm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-slate-600">
                  Use this technique to manage pre-competition nerves:
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg bg-gradient-to-br from-primary-50/80 to-accent-50/60 p-4 shadow-md">
                    <p className="text-2xl font-bold text-primary-600">4</p>
                    <p className="text-sm">Breathe In</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-primary-50/80 to-accent-50/60 p-4 shadow-md">
                    <p className="text-2xl font-bold text-primary-600">4</p>
                    <p className="text-sm">Hold</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-primary-50/80 to-accent-50/60 p-4 shadow-md">
                    <p className="text-2xl font-bold text-primary-600">4</p>
                    <p className="text-sm">Breathe Out</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-br from-primary-50/80 to-accent-50/60 p-4 shadow-md">
                    <p className="text-2xl font-bold text-primary-600">4</p>
                    <p className="text-sm">Hold</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600">
                  Repeat 4-8 cycles. This activates your parasympathetic nervous system, reducing anxiety.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-xl bg-gradient-to-bl from-primary-100/60 via-track-gold/30 to-accent-100/40 p-8 shadow-xl border border-primary-200/50">
          <h2 className="mb-4 text-2xl font-semibold">Build Your Mental Training Plan</h2>
          <div className="mb-6 space-y-4">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-sm font-semibold text-white shadow-md">
                1
              </div>
              <div>
                <h3 className="font-semibold">Assess Your Needs</h3>
                <p className="text-sm text-slate-600">
                  Identify your mental performance strengths and growth areas
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-sm font-semibold text-white shadow-md">
                2
              </div>
              <div>
                <h3 className="font-semibold">Select 2-3 Techniques</h3>
                <p className="text-sm text-slate-600">
                  Start with a few skills rather than trying everything at once
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-sm font-semibold text-white shadow-md">
                3
              </div>
              <div>
                <h3 className="font-semibold">Practice Daily</h3>
                <p className="text-sm text-slate-600">
                  Consistency is key - even 5 minutes daily makes a difference
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-600 to-accent-500 text-sm font-semibold text-white shadow-md">
                4
              </div>
              <div>
                <h3 className="font-semibold">Track & Adjust</h3>
                <p className="text-sm text-slate-600">
                  Use your journal to monitor what works and refine your approach
                </p>
              </div>
            </div>
          </div>
          <Button variant="brand" asChild>
            <Link href="/journal">Start Your Journal</Link>
          </Button>
        </section>
      </div>
    </div>
  )
}