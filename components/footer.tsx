import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-green-200/20 bg-gradient-to-br from-green-50/20 via-emerald-50/15 to-stone-50 relative">
      <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-primary-700">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/journal" className="text-neutral-600 hover:text-primary-600 transition-colors">
                  Journal Tracker
                </Link>
              </li>
              <li>
                <Link href="/library" className="text-slate-600 hover:text-slate-900">
                  Mental Skills Library
                </Link>
              </li>
              <li>
                <Link href="/recruiting-tips" className="text-slate-600 hover:text-slate-900">
                  Recruiting Tips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sessions" className="text-slate-600 hover:text-slate-900">
                  1:1 Sessions
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-slate-600 hover:text-slate-900">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/form-analysis" className="text-slate-600 hover:text-slate-900">
                  Form Analysis
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-slate-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="text-slate-600 hover:text-slate-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="text-slate-600 hover:text-slate-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} The Mental Lap. All rights reserved.</p>
          <p className="mt-2">For athletes. By elite college athletes.</p>
        </div>
      </div>
    </footer>
  )
}