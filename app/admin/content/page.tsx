import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { FileText, BookOpen, GraduationCap, Calendar, Eye, Edit, Trash2, Plus } from 'lucide-react'

export default async function ContentManagementPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'admin') {
    redirect('/dashboard')
  }

  // Fetch all articles grouped by section
  const articles = await prisma.article.findMany({
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      publishedAt: 'desc'
    }
  })

  const libraryArticles = articles.filter(a => a.section === 'library')
  const recruitingArticles = articles.filter(a => a.section === 'recruiting')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-slate-600 mt-2">Manage articles and educational resources</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Library Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{libraryArticles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recruiting Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruitingArticles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {articles.filter(a => {
                if (!a.publishedAt) return false
                const thisMonth = new Date()
                thisMonth.setDate(1)
                thisMonth.setHours(0, 0, 0, 0)
                return a.publishedAt >= thisMonth
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="library">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="library" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Mental Skills Library
              </TabsTrigger>
              <TabsTrigger value="recruiting" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Recruiting Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="library">
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Mental Skills Library</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Article
                  </Button>
                </div>

                {libraryArticles.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No library articles yet</p>
                ) : (
                  <div className="space-y-3">
                    {libraryArticles.map((article) => (
                      <div key={article.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-slate-500" />
                              <h4 className="font-semibold">{article.title}</h4>
                              {article.publishedAt ? (
                                <Badge variant="outline" className="text-green-600">Published</Badge>
                              ) : (
                                <Badge variant="secondary">Draft</Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{article.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>By {article.author.name}</span>
                              {article.publishedAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(article.publishedAt).toLocaleDateString()}
                                </span>
                              )}
                              <span>Slug: /{article.slug}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recruiting">
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Recruiting Tips</h3>
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Article
                  </Button>
                </div>

                {recruitingArticles.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">No recruiting articles yet</p>
                ) : (
                  <div className="space-y-3">
                    {recruitingArticles.map((article) => (
                      <div key={article.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4 text-slate-500" />
                              <h4 className="font-semibold">{article.title}</h4>
                              {article.publishedAt ? (
                                <Badge variant="outline" className="text-green-600">Published</Badge>
                              ) : (
                                <Badge variant="secondary">Draft</Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{article.excerpt}</p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span>By {article.author.name}</span>
                              {article.publishedAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(article.publishedAt).toLocaleDateString()}
                                </span>
                              )}
                              <span>Slug: /{article.slug}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
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

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common content management tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Create Mental Skills Article
            </Button>
            <Button variant="outline" className="justify-start">
              <GraduationCap className="h-4 w-4 mr-2" />
              Create Recruiting Guide
            </Button>
            <Button variant="outline" className="justify-start">
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Categories
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}