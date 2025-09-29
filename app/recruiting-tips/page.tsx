import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        section: 'recruiting',
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

export default async function RecruitingTipsPage() {
  const articles = await getArticles()

  const categories = [
    {
      title: 'Getting Started',
      description: 'Foundation knowledge for the recruiting process',
      icon: '🎯',
      articles: articles.slice(0, 2)
    },
    {
      title: 'Communication',
      description: 'How to effectively reach out to coaches',
      icon: '💬',
      articles: articles.slice(2, 4)
    },
    {
      title: 'Campus Visits',
      description: 'Making the most of your college visits',
      icon: '🏫',
      articles: articles.slice(4, 5)
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/40 via-track-gold/20 to-accent-100/30 -z-10"></div>
      <div className="mx-auto max-w-4xl relative">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary-600 via-track-gold to-accent-500 bg-clip-text text-transparent">College Recruiting Guide</h1>
        <p className="mb-12 text-lg text-slate-700">
          Navigate the recruiting process with confidence using insights from athletes who've been through it.
        </p>

        <section className="mb-12">
          <div className="mb-8 rounded-xl bg-gradient-to-br from-primary-100/80 via-accent-100/60 to-track-gold/30 p-6 shadow-xl border border-primary-200/50">
            <h2 className="mb-3 text-xl font-semibold">Your Recruiting Roadmap</h2>
            <p className="mb-4 text-slate-600">
              Whether you're a freshman just starting to think about college athletics or a senior making final decisions,
              we've got the guidance you need from athletes who've successfully navigated this journey.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg bg-gradient-to-br from-white/90 to-primary-50/70 p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-2 text-2xl">📚</div>
                <h3 className="font-semibold">Research Phase</h3>
                <p className="text-sm text-slate-600">Find the right academic and athletic fit</p>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-white/90 to-primary-50/70 p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-2 text-2xl">📧</div>
                <h3 className="font-semibold">Outreach Phase</h3>
                <p className="text-sm text-slate-600">Connect with coaches effectively</p>
              </div>
              <div className="rounded-lg bg-gradient-to-br from-white/90 to-primary-50/70 p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-2 text-2xl">🤝</div>
                <h3 className="font-semibold">Decision Phase</h3>
                <p className="text-sm text-slate-600">Evaluate offers and make your choice</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Essential Articles</h2>
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category.title}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {category.articles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          <Link href={`/recruiting-tips/${article.slug}`} className="hover:text-brand-indigo">
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>
                          By {article.author.name} • {new Date(article.publishedAt!).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-slate-600">{article.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">Quick Tips from Our Coaches</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="flex gap-4 p-6">
                <div className="flex-shrink-0 text-3xl">💡</div>
                <div>
                  <p className="mb-2 font-semibold">Skyla's Tip: Start Early, Stay Organized</p>
                  <p className="text-sm text-slate-600">
                    "Create a spreadsheet with all the schools you're interested in. Track coach contacts,
                    academic requirements, and important dates. Being organized made my recruiting process
                    so much smoother and less stressful."
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex gap-4 p-6">
                <div className="flex-shrink-0 text-3xl">💡</div>
                <div>
                  <p className="mb-2 font-semibold">Birgen's Tip: Be Authentically You</p>
                  <p className="text-sm text-slate-600">
                    "Coaches want to know the real you, not a polished version. Share your genuine goals,
                    challenges you've overcome, and what drives you. The right program will value your
                    authenticity."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-xl bg-gradient-to-bl from-accent-100/60 via-primary-100/40 to-track-gold/30 p-8 shadow-xl border border-accent-200/50">
          <h2 className="mb-4 text-2xl font-semibold">Recruiting Timeline by Year</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-primary-700">Freshman & Sophomore Years</h3>
              <p className="text-sm text-slate-600">Focus on athletic development, maintain strong academics, research schools</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-700">Junior Year</h3>
              <p className="text-sm text-slate-600">Create highlight videos, reach out to coaches, attend camps and showcases</p>
            </div>
            <div>
              <h3 className="font-semibold text-primary-700">Senior Year</h3>
              <p className="text-sm text-slate-600">Official visits, narrow choices, make your commitment</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}