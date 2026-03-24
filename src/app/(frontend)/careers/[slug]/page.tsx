import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Divider from '@/components/Divider'
import JobApplicationForm from '@/components/JobApplicationForm'
import '../../blogs/blogs.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobs',
    where: {
      slug: { equals: slug },
      status: { equals: 'open' },
    },
    limit: 1,
  })

  const job = result.docs[0] as any
  if (!job) return { title: 'Job Not Found' }

  return {
    title: `${job.title} | Careers | OlioNexus`,
    description: `${job.title} - ${job.department || ''} at OlioNexus`,
  }
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'jobs',
    where: {
      slug: { equals: slug },
      status: { equals: 'open' },
    },
    limit: 1,
  })

  const job = result.docs[0] as any
  if (!job) notFound()

  return (
    <article>
      {/* Header */}
      <div className="section-spacing px-5 md:px-8 border-b border-[#CCCCCC]">
        {/* Title */}
        <h1 className="font-['Space_Grotesk'] max-w-[900px]! mx-auto!   font-medium text-[28px] md:text-[40px] leading-9 md:leading-14 text-[#212121] mb-4">
          {job.title}
        </h1>
        {/* Tags */}
        <div className="flex items-center max-w-[900px]! mx-auto!  gap-2.5 flex-wrap">
          {job.location && (
            <span
              className="p-2 font-['Inter'] font-normal text-[14px] leading-[20px] capitalize text-[#6B6B6B]"
              style={{ border: '1px dashed #6B6B6B' }}
            >
              {job.location}
            </span>
          )}
          {job.mode && (
            <span
              className="p-2 font-['Inter'] font-normal text-[14px] leading-[20px] capitalize text-[#6B6B6B]"
              style={{ border: '1px dashed #6B6B6B' }}
            >
              {job.mode}
            </span>
          )}
          {job.department && (
            <span
              className="p-2 font-['Inter'] font-normal text-[14px] leading-[20px] capitalize text-[#6B6B6B]"
              style={{ border: '1px dashed #6B6B6B' }}
            >
              {job.department}
            </span>
          )}
          {job.type && (
            <span
              className="p-2 font-['Inter'] font-normal text-[14px] leading-[20px] capitalize text-[#6B6B6B]"
              style={{ border: '1px dashed #6B6B6B' }}
            >
              {job.type}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {job.content && (
        <div className="blog-content ">
          <RichText data={job.content} />
        </div>
      )}

      {/* Divider */}
      <Divider />

      {/* Application Form */}
      <div className="max-w-225 mx-auto px-5 py-10 md:py-14">
        <JobApplicationForm jobId={job.id} />
      </div>

      <Divider />
    </article>
  )
}
