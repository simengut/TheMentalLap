'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200/20 bg-gradient-to-r from-white/95 via-green-50/30 to-emerald-50/20 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
            The Mental Lap
          </Link>

          <nav className="hidden md:flex md:gap-6">
            <Link href="/about" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link href="/journal" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Journal
            </Link>
            <Link href="/sessions" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Sessions
            </Link>
            <Link href="/workshops" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Workshops
            </Link>
            <Link href="/form-analysis" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Form Analysis
            </Link>
            <Link href="/recruiting-tips" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Recruiting Tips
            </Link>
            <Link href="/library" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Library
            </Link>
            <Link href="/contact" className="text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" variant="brand">Sign Up</Button>
                </Link>
              </>
            )}

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-2">
              <Link href="/about" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                About
              </Link>
              <Link href="/journal" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Journal
              </Link>
              <Link href="/sessions" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Sessions
              </Link>
              <Link href="/workshops" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Workshops
              </Link>
              <Link href="/form-analysis" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Form Analysis
              </Link>
              <Link href="/recruiting-tips" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Recruiting Tips
              </Link>
              <Link href="/library" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Library
              </Link>
              <Link href="/contact" className="px-2 py-1 text-sm font-medium text-slate-700 hover:text-slate-900">
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}