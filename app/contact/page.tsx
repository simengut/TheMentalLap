'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In production, this would send an email
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="mb-8 text-lg text-slate-600">
          Have questions? We're here to help you on your athletic journey.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
            <CardDescription>We typically respond within 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mb-4 text-4xl font-bold text-green-600">Message Sent!</div>
                <h3 className="mb-2 text-lg font-semibold">Message Sent!</h3>
                <p className="text-slate-600">
                  Thanks for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sport">Sport (optional)</Label>
                  <Input id="sport" placeholder="e.g., Track & Field, Soccer" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Tell us how we can help..."
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">General Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Questions about our programs, workshops, or coaching services.
              </p>
              <p className="mt-2 text-sm font-semibold">
                support@thementallap.com
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Partnership Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Interested in collaborating or becoming a coach?
              </p>
              <p className="mt-2 text-sm font-semibold">
                partners@thementallap.com
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <h3 className="mb-4 text-lg font-semibold">Connect on Social</h3>
          <div className="flex justify-center gap-4">
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Instagram
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Twitter
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}