import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/25 via-emerald-50/15 to-stone-50 -z-10"></div>
      <div className="mx-auto max-w-4xl relative z-10">
        <h1 className="mb-8 text-4xl font-bold">About The Mental Lap</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-slate-600">
            The Mental Lap is built on a simple belief: the best athletic guidance comes from athletes who've walked the path you're on.
          </p>

          <section className="my-12">
            <h2 className="mb-6 text-2xl font-bold">Our Mission</h2>
            <p className="text-slate-600">
              We deliver athlete-to-athlete mental performance tools, track & field form analysis, recruiting guidance, and live workshops—built by and for competitors. Our platform bridges the gap between elite college experience and developing athletes at all levels.
            </p>
          </section>

          <section className="my-12">
            <h2 className="mb-6 text-2xl font-bold">Meet Our Coaches</h2>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Skyla Wilson</CardTitle>
                <CardDescription>UPenn Track & Field | Hurdler & Sprinter</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Skyla is a Penn graduate who left her mark on the program with multiple school records. Her achievements include:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Indoor 60H: 8.29 (Program Record)</li>
                  <li>Outdoor 100H: 13.45 (Program Record)</li>
                  <li>200m: 23.54 (Program Record)</li>
                  <li>400H: 58.26 (Program Record)</li>
                  <li>4x400 Relay: 3:35.19 indoor, 3:32.12 outdoor (Program Records)</li>
                </ul>
                <p>
                  As an NCAA East Prelim qualifier and First-Team All-Ivy selection, Skyla brings elite competitive experience to her coaching. Her neuroscience background and pre-med track give her unique insights into the mental aspects of performance.
                </p>
                <blockquote className="border-l-4 border-primary-600 pl-4 italic">
                  "In hurdles, rhythm is everything—find your tempo, then trust it. Use track as a source of fun and let that joy fuel your performance."
                </blockquote>
                <div className="mt-4">
                  <h4 className="font-semibold">Skyla's Coaching Focus:</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>Hurdle rhythm and technical precision</li>
                    <li>Sprint mechanics and speed development</li>
                    <li>Relay culture and team dynamics</li>
                    <li>Competition mindset and visualization</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Birgen Nelson</CardTitle>
                <CardDescription>Mental Performance Coach & Leader</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Birgen brings a wealth of leadership and coaching experience from her diverse background:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>Mental Performance Coach at Athlete To Athlete (Nov 2023–Jan 2025)</li>
                  <li>Graduate Teaching Assistant at Duke Sanford School</li>
                  <li>Student Senate Co-President at Gustavus (Feb 2022–Sep 2023)</li>
                  <li>Track & Field Student Assistant Coach (Sep 2020–Sep 2023)</li>
                  <li>Community Outreach Coordinator and Policy Consultant</li>
                </ul>
                <p>
                  Her multifaceted experience in athletics, academics, and community service shapes her holistic approach to athlete development.
                </p>
                <blockquote className="border-l-4 border-accent-500 pl-4 italic">
                  "Small habits build resilient competitors. Success isn't about perfection—it's about consistent progress and learning from every experience."
                </blockquote>
                <div className="mt-4">
                  <h4 className="font-semibold">Birgen's Specialties:</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-6">
                    <li>Mental resilience and performance psychology</li>
                    <li>Time management for student-athletes</li>
                    <li>Sprint and hurdle technical analysis</li>
                    <li>Leadership development and team building</li>
                    <li>College recruiting navigation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="my-12">
            <h2 className="mb-6 text-2xl font-bold">Why Choose The Mental Lap?</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Athlete-Tested Methods</h3>
                <p className="text-sm text-slate-600">
                  Every technique and strategy we teach has been proven in competition at the highest collegiate levels.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Personalized Approach</h3>
                <p className="text-sm text-slate-600">
                  We understand that every athlete is unique. Our coaching adapts to your specific needs and goals.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Holistic Development</h3>
                <p className="text-sm text-slate-600">
                  We address mental, technical, and strategic aspects of performance for complete athletic growth.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Peer Connection</h3>
                <p className="text-sm text-slate-600">
                  Learn from coaches who recently faced the same challenges you're experiencing now.
                </p>
              </div>
            </div>
          </section>

          <section className="my-12 rounded-lg bg-gradient-to-br from-green-50/30 via-emerald-50/20 to-stone-50 p-8 text-center shadow-xl border border-green-200/20">
            <h2 className="mb-4 text-2xl font-bold">Ready to elevate your mental performance?</h2>
            <p className="mb-6 text-slate-600">
              Join The Mental Lap and learn from athletes who've achieved what you're working toward.
            </p>
            <a href="/auth/signup" className="inline-flex items-center justify-center rounded-md bg-brand-indigo px-8 py-3 text-sm font-medium text-white hover:bg-brand-indigo/90">
              Get Started Today
            </a>
          </section>
        </div>
      </div>
    </div>
  )
}