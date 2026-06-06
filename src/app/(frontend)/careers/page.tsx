import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import Divider from '@/components/Divider'
import CareerCTA from '@/components/CareerCTA'
import CareersHero from '@/components/careers/CareersHero'
import LeadershipQuote from '@/components/careers/LeadershipQuote'
import OurCulture from '@/components/careers/OurCulture'
import NexusWay from '@/components/careers/NexusWay'
import StatsSection from '@/components/careers/StatsSection'
import WorkingHere from '@/components/careers/WorkingHere'
import WhatToExpect from '@/components/careers/WhatToExpect'
import Testimonials from '@/components/Testimonials'
import { getTestimonials } from '@/lib/getTestimonials'


export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Careers | OlioNexus',
  description: "Do your life's best work at OlioNexus.",
}

export default async function CareersPage() {
  const payload = await getPayload({ config: configPromise })

  const jobsResult = await payload.find({
    collection: 'jobs',
    where: {
      status: { equals: 'open' },
    },
    sort: '-createdAt',
    limit: 50,
  })

  const jobs = jobsResult.docs as any[]

  const testimonials = await getTestimonials()

  return (
    <section>
      {/* Hero */}
      <CareersHero hasOpenJobs={jobs.length > 0}  />
      <Divider />

      <LeadershipQuote />
      <Divider />

      <OurCulture />
      <Divider />

      <NexusWay />
      <StatsSection />
      <Divider />

      <WorkingHere />
      <Divider />

      <WhatToExpect />
      <Divider />

      <Testimonials data={testimonials} />
      <Divider />

      {/* Open Opportunities */}
      {jobs.length > 0 && (
        <div id="open-opportunities">
          <div className="flex flex-col md:flex-row">
            {/* Left side */}
            <div className="md:w-[340px] lg:w-[400px] shrink-0 p-6 md:p-8 md:border-r border-b md:border-b-0 border-[#CCCCCC]">
              <div className="md:sticky md:top-20">
                <p className="section-title text-left mb-4">
                  [Open Opportunities]
                </p>

                <h2 className="text-[28px] md:text-[40px] leading-9 md:leading-12">
                  Open Positions
                </h2>

                <p className="mt-4 max-w-[375px] text-[18px] leading-6">
                  Our hiring process is clear, respectful, and moves quickly.
                  <br />
                  After each step, we usually share feedback within 3 to 4
                  business days.
                  <br />
                  Your recruiter or hiring contact will keep you informed at
                  every stage.
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex-1">
              {jobs.map((job: any, index: number) => (
                <div
                  key={job.id}
                  className={`flex items-center justify-between gap-4 p-6 md:p-8 ${
                    index < jobs.length - 1
                      ? 'border-b border-[#CCCCCC]'
                      : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[20px] md:text-[24px] leading-[28px] md:leading-8 mb-3">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {job.location && (
                        <span
                          className="px-2 py-1 text-[13px] md:text-[14px] leading-4.5 text-[#6B6B6B] capitalize"
                          style={{ border: '1px dashed #6B6B6B' }}
                        >
                          {job.location}
                        </span>
                      )}

                      {job.mode && (
                        <span
                          className="px-2 py-1 text-[13px] md:text-[14px] leading-4.5 text-[#6B6B6B] capitalize"
                          style={{ border: '1px dashed #6B6B6B' }}
                        >
                          {job.mode}
                        </span>
                      )}

                      {job.department && (
                        <span
                          className="px-2 py-1 text-[13px] md:text-[14px] leading-4.5 text-[#6B6B6B] capitalize"
                          style={{ border: '1px dashed #6B6B6B' }}
                        >
                          {job.department}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href={`/careers/${job.slug}`}
                    className="shrink-0 uppercase tracking-[0.03em] underline underline-offset-4 text-[14px] md:text-[16px] hover:text-[#088000] transition-colors"
                  >
                    VIEW
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {jobs.length > 0 && <Divider />}

      <CareerCTA />

      <Divider />
    </section>
  )
}