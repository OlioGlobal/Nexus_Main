import { getPayload } from 'payload'
import configPromise from '@payload-config'

const data: Record<
  string,
  {
    ctaBannerTitle: string
    ctaBannerHighlight: string
    ctaBannerTitleSuffix: string
    ctaBannerDescription: string
    ctaBannerButtonText: string
    ctaBannerButtonLink: string
    faqSectionTitle: string
    faqItems: { question: string; answer: string }[]
  }
> = {
  'AI Consulting Services': {
    ctaBannerTitle: 'Get an',
    ctaBannerHighlight: 'AI Feasibility',
    ctaBannerTitleSuffix: 'Assessment',
    ctaBannerDescription:
      'Thought leadership, not content marketing. Deep dives into the intersection of first principles engineering and global business strategy.',
    ctaBannerButtonText: 'BOOK AN AUDIT',
    ctaBannerButtonLink: '/contact',
    faqSectionTitle: 'Frequently Asked Questions',
    faqItems: [
      {
        question: 'How long does AI consulting take?',
        answer:
          'Typically, 4-6 weeks for a comprehensive AI consulting assessment, depending on operational complexity and the number of use cases being evaluated. Our AI strategy consulting process is thorough but efficient.',
      },
      {
        question: "What's the typical ROI timeline for AI consulting?",
        answer:
          'Most clients see measurable ROI within 3-6 months of implementation. The consulting phase itself often uncovers quick wins that pay for the engagement within the first month.',
      },
      {
        question: 'Do we need technical expertise on our team to work with you?',
        answer:
          'No. We work with leadership and operations teams directly. Our job is to translate technical possibilities into business decisions you can make confidently.',
      },
      {
        question: "What happens if AI doesn't make sense for our operations?",
        answer:
          "We'll tell you. Our value is in honest assessment, not in selling AI for its own sake. If the ROI isn't there, we'll say so and recommend what would actually help.",
      },
      {
        question: 'Do we need to rebuild our systems for AI?',
        answer:
          'Rarely. Most AI solutions we recommend integrate with your existing systems. We design for minimal disruption and maximum compatibility.',
      },
      {
        question: 'How do you handle data privacy and security during consulting?',
        answer:
          'We operate under strict NDAs and follow enterprise data handling standards. We never require access to production data for the assessment phase.',
      },
      {
        question: "What if our data isn't ready for AI?",
        answer:
          "Data readiness is part of what we assess. If your data isn't ready, we'll give you a clear roadmap to get it there — and tell you exactly what it will take.",
      },
    ],
  },
}

async function seed() {
  const payload = await getPayload({ config: configPromise })

  for (const [title, fields] of Object.entries(data)) {
    const result = await payload.find({
      collection: 'services',
      where: { title: { equals: title } },
      limit: 1,
    })

    if (result.docs.length === 0) {
      console.log(`Service not found, skipping: ${title}`)
      continue
    }

    await payload.update({
      collection: 'services',
      id: result.docs[0].id,
      data: fields as any,
    })
    console.log(`Updated CTA + FAQ: ${title}`)
  }

  console.log('Done.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
