import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import Divider from '@/components/Divider'
import Benefits from '@/components/Benefits'
import CareerCTA from '@/components/CareerCTA'

export const metadata = {
  title: 'Careers | OlioNexus',
  description: "Do your life's best work at OlioNexus.",
}

const values = [
  {
    icon: '/ui/culture/ph_rocket-launch.svg',
    title: 'Radical Autonomy',
    description:
      'We hire exceptional people and give them the space to do exceptional work. No micromanagement, just radical ownership.',
  },
  {
    icon: '/ui/culture/ph_lightning.svg',
    title: 'Outsized Impact',
    description:
      "Work on projects that touch millions of users. We don't build features, we build market-defining systems.",
  },
  {
    icon: '/ui/culture/ph_globe-hemisphere-west.svg',
    title: 'Global Growth',
    description:
      'Uncapped learning budgets and rotation opportunities across our Mumbai, Pune, and Dubai offices.',
  },
  {
    icon: '/ui/culture/ph_sparkle.svg',
    title: 'First Principles',
    description:
      "We question everything. Every solution starts from the fundamentals, not from 'how it's always been done'.",
  },
  {
    icon: '/ui/culture/ph_record.svg',
    title: 'Craft Excellence',
    description:
      'We take pride in our work. Code is poetry, design is art, and excellence is our baseline.',
  },
  {
    icon: '/ui/culture/ph_users.svg',
    title: 'Ship Fast',
    description:
      'Velocity matters. We move quickly, iterate constantly, and ship products that make a difference.',
  },
]

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

  return (
    <section>
      {/* Hero */}
      <div className="section-spacing text-center border-b border-[#CCCCCC]">
        <h1 className="font-['Space_Grotesk'] font-medium text-[32px] md:text-[48px] leading-[40px] md:leading-[56px] text-[#212121] mb-4">
          Do your life&apos;s best work.
        </h1>
        <p className="font-['Inter'] font-normal text-[15px] md:text-[18px] leading-6 tracking-[-0.01em] text-[#6B6B6B] max-w-lg mx-auto">
          Thought leadership, not content marketing. Deep dives into the intersection of first
          principles engineering and global business strategy.
        </p>
      </div>

      {/* What we stand for */}
      <div className="section-spacing text-center">
        <p className="section-title mb-4">[Our Culture]</p>
        <h2 className="font-['Space_Grotesk'] font-medium text-[28px] md:text-[40px] leading-9 md:leading-14 text-[#212121]">
          What we stand for
        </h2>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-[#CCCCCC]">
        {values.map((value, i) => (
          <div key={i} className="group p-6 md:p-8 border-b border-r border-[#CCCCCC] transition-colors duration-300 hover:bg-[#212121] cursor-default">
            <Image src={value.icon} alt={value.title} width={32} height={32} className="mb-4 transition-all duration-300 group-hover:invert group-hover:brightness-200" />
            <h3 className="font-['Space_Grotesk'] font-medium text-[20px] md:text-[24px] leading-7 md:leading-8 text-[#212121] mb-3 transition-colors duration-300 group-hover:text-[#FEF9EF]!">
              {value.title}
            </h3>
            <p className="font-['Inter'] font-normal text-[14px] md:text-[16px] leading-[22px] md:leading-6 tracking-[-0.01em] text-[#6B6B6B] transition-colors duration-300 group-hover:text-[#949494]">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <Divider />

      {/* Open Opportunities */}
      {jobs.length > 0 && (
        <div className="border-b border-[#CCCCCC]">
          <div className="flex flex-col md:flex-row">
            {/* Left side - sticky header */}
            <div className="md:w-[340px] lg:w-[400px] shrink-0 p-6 md:p-8 md:border-r border-b md:border-b-0 border-[#CCCCCC]">
              <div className="md:sticky md:top-20">
                <p className="section-title !text-left mb-4">[Open Opportunities]</p>
                <h2 className="font-['Space_Grotesk'] font-medium text-[28px] md:text-[40px] leading-9 md:leading-12 text-[#212121]">
                  Join the next generation
                </h2>
              </div>
            </div>

            {/* Right side - job listings */}
            <div className="flex-1">
              {jobs.map((job: any, index: number) => (
                <div
                  key={job.id}
                  className={`flex items-center justify-between gap-4 p-6 md:p-8 ${
                    index < jobs.length - 1 ? 'border-b border-[#CCCCCC]' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-['Space_Grotesk'] font-medium text-[20px] md:text-[24px] leading-[28px] md:leading-8 text-[#212121] mb-3">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {job.location && (
                        <span
                          className="px-2 py-1 font-['Inter'] font-medium text-[13px] md:text-[14px] leading-4.5 text-[#6B6B6B] capitalize"
                          style={{ border: '1px dashed #6B6B6B' }}
                        >
                          {job.location}
                        </span>
                      )}
                      {job.mode && (
                        <span
                          className="px-2 py-1 font-['Inter'] font-medium text-[13px] md:text-[14px] leading-4.5 text-[#6B6B6B] capitalize"
                          style={{ border: '1px dashed #6B6B6B' }}
                        >
                          {job.mode}
                        </span>
                      )}
                      {job.department && (
                        <span
                          className="px-2 py-1 font-['Inter'] font-medium text-[13px] md:text-[14px] leading-4.5 text-[#6B6B6B] capitalize"
                          style={{ border: '1px dashed #6B6B6B' }}
                        >
                          {job.department}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="shrink-0 font-['Space_Mono'] font-normal text-[14px] md:text-[16px] leading-none uppercase tracking-[0.03em] underline underline-offset-4 text-[#212121] hover:text-[#088000] transition-colors"
                  >
                    VIEW
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Divider />

      {/* Benefits */}
      <Benefits />

      <Divider />

      {/* CTA + Open Application */}
      <CareerCTA />
    </section>
  )
}
