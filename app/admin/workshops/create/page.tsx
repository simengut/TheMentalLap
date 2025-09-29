'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function CreateWorkshopPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    startsAt: '',
    durationMin: 60,
    capacity: 20,
    location: 'Online via Zoom',
    priceCents: 0,
  })

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Convert form data to proper format
      const workshopData = {
        ...formData,
        startsAt: new Date(formData.startsAt).toISOString(),
        durationMin: parseInt(formData.durationMin.toString()),
        capacity: parseInt(formData.capacity.toString()),
        priceCents: Math.round(parseFloat(formData.priceCents.toString()) * 100), // Convert dollars to cents
      }

      const response = await fetch('/api/admin/workshops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workshopData),
      })

      if (response.ok) {
        router.push('/admin/workshops')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to create workshop')
      }
    } catch (error) {
      console.error('Error creating workshop:', error)
      alert('Failed to create workshop. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== 'admin') {
    router.push('/dashboard')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/workshops">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Workshops
            </Button>
          </Link>
        </div>
        <h1 className="text-3xl font-bold">Create New Workshop</h1>
        <p className="text-slate-600 mt-2">Add a new workshop or training session</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Workshop Details</CardTitle>
            <CardDescription>
              Fill in the information for your new workshop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Workshop Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Mental Preparation for Championship Season"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Short Summary *</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    placeholder="Brief description that appears on the workshops page"
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Detailed Description</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Detailed workshop content and what participants will learn"
                    rows={4}
                  />
                </div>
              </div>

              {/* Date and Time */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startsAt" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date and Time *
                  </Label>
                  <Input
                    id="startsAt"
                    type="datetime-local"
                    value={formData.startsAt}
                    onChange={(e) => handleInputChange('startsAt', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="durationMin" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Duration (minutes) *
                  </Label>
                  <Select
                    value={formData.durationMin.toString()}
                    onValueChange={(value) => handleInputChange('durationMin', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                      <SelectItem value="120">120 minutes</SelectItem>
                      <SelectItem value="180">180 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Logistics */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location *
                  </Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => handleInputChange('location', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online via Zoom">Online via Zoom</SelectItem>
                      <SelectItem value="Online via Google Meet">Online via Google Meet</SelectItem>
                      <SelectItem value="In-Person">In-Person</SelectItem>
                      <SelectItem value="Hybrid">Hybrid (Online + In-Person)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Maximum Capacity *
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    min="1"
                    max="200"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price (USD)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.priceCents / 100}
                    onChange={(e) => handleInputChange('priceCents', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                  <p className="text-sm text-slate-500">
                    Leave as 0 for free workshops
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Creating Workshop...' : 'Create Workshop'}
                </Button>
                <Link href="/admin/workshops">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {formData.title && (
          <Card className="mt-8 border-dashed">
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
              <CardDescription>How this workshop will appear to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">{formData.title}</h3>
                {formData.summary && (
                  <p className="text-slate-600 text-sm">{formData.summary}</p>
                )}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  {formData.startsAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(formData.startsAt).toLocaleDateString()}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formData.durationMin} min
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {formData.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    0/{formData.capacity}
                  </span>
                  {formData.priceCents > 0 && (
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      ${(formData.priceCents / 100).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}