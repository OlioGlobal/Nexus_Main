import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'

const sampleJobs = [
  {
    title: 'Senior AI Engineer',
    location: 'Mumbai',
    type: 'full-time' as const,
    mode: 'hybrid' as const,
    department: 'Nexus.AI',
    sections: {
      whatWereLookingFor: [
        '5+ years of experience in machine learning and deep learning',
        'Strong proficiency in Python, PyTorch, and TensorFlow',
        'Experience deploying ML models in production at scale',
        'Deep understanding of transformer architectures and LLMs',
        'Track record of publishing research or contributing to open-source ML projects',
      ],
      about:
        'As a Senior AI Engineer at Nexus.AI, you will be at the forefront of building intelligent systems that transform how enterprises operate. You will work with cutting-edge models, design novel architectures, and ship AI-powered features that impact millions of users. Our team values first-principles thinking, rapid iteration, and craft excellence. You will collaborate with world-class engineers and researchers in a fast-paced environment where your work directly shapes our product roadmap.',
      keyResponsibilities: [
        'Design and implement production ML pipelines for real-time inference',
        'Fine-tune and optimize large language models for domain-specific tasks',
        'Build evaluation frameworks to measure model performance and reliability',
        'Collaborate with product and engineering teams to define AI-powered features',
        'Mentor junior engineers and contribute to our engineering culture',
      ],
    },
  },
  {
    title: 'Full Stack Architect',
    location: 'Remote',
    type: 'full-time' as const,
    mode: 'hybrid' as const,
    department: 'Nexus.AI',
    sections: {
      whatWereLookingFor: [
        '8+ years of full-stack development experience',
        'Expert-level knowledge of React, Next.js, and Node.js',
        'Experience designing distributed systems and microservices',
        'Strong understanding of database design (SQL and NoSQL)',
        'Experience with cloud platforms (AWS, GCP, or Azure)',
      ],
      about:
        'We are looking for a Full Stack Architect to define the technical direction of our platform. You will own the architecture of systems that serve millions of requests per day, making critical decisions about technology choices, system design, and performance optimization. This role bridges the gap between engineering execution and technical strategy, requiring both deep technical expertise and strong communication skills.',
      keyResponsibilities: [
        'Define and evolve the technical architecture of our core platform',
        'Lead design reviews and establish engineering best practices',
        'Build and optimize critical system components for performance and reliability',
        'Drive technology decisions that balance innovation with pragmatism',
        'Work closely with product leadership to translate business needs into technical strategy',
      ],
    },
  },
  {
    title: 'Product Strategist',
    location: 'Remote',
    type: 'full-time' as const,
    mode: 'hybrid' as const,
    department: 'Nexus.Build',
    sections: {
      whatWereLookingFor: [
        '5+ years in product management or product strategy',
        'Experience with B2B SaaS or enterprise software products',
        'Strong analytical skills and data-driven decision making',
        'Excellent communication and stakeholder management abilities',
        'Understanding of AI/ML technologies and their business applications',
      ],
      about:
        'As a Product Strategist at Nexus.Build, you will shape the future of how enterprises build and deploy digital products. You will work at the intersection of technology, business, and design, identifying market opportunities and translating them into product roadmaps. This is a role for someone who thinks in systems, communicates with clarity, and is passionate about building products that create entirely new markets.',
      keyResponsibilities: [
        'Conduct market research and competitive analysis to identify product opportunities',
        'Define product vision, strategy, and roadmap aligned with business goals',
        'Collaborate with engineering and design teams to ship high-impact features',
        'Analyze product metrics and user feedback to drive continuous improvement',
        'Present product strategy to leadership and external stakeholders',
      ],
    },
  },
  {
    title: 'DevOps Lead',
    location: 'Remote',
    type: 'full-time' as const,
    mode: 'hybrid' as const,
    department: 'Nexus.Labs',
    sections: {
      whatWereLookingFor: [
        '6+ years of DevOps or SRE experience',
        'Expert knowledge of Kubernetes, Docker, and container orchestration',
        'Strong experience with CI/CD pipelines and infrastructure as code (Terraform)',
        'Deep understanding of monitoring, observability, and incident response',
        'Experience managing infrastructure at scale (1000+ nodes)',
      ],
      about:
        'The DevOps Lead at Nexus.Labs will own the reliability and performance of our infrastructure. You will build the systems that enable our engineering teams to deploy with confidence, scale effortlessly, and respond to incidents rapidly. This role is critical to our mission of delivering enterprise-grade reliability while maintaining startup-level deployment velocity.',
      keyResponsibilities: [
        'Design and maintain our cloud infrastructure across multiple regions',
        'Build and optimize CI/CD pipelines for rapid, safe deployments',
        'Implement monitoring, alerting, and observability across all services',
        'Lead incident response and conduct thorough post-mortems',
        'Mentor the team on infrastructure best practices and security',
      ],
    },
  },
  {
    title: 'ML Research Engineer',
    location: 'Remote',
    type: 'full-time' as const,
    mode: 'hybrid' as const,
    department: 'Nexus.AI',
    sections: {
      whatWereLookingFor: [
        'MS or PhD in Computer Science, Machine Learning, or related field',
        'Published research in top-tier ML conferences (NeurIPS, ICML, ACL, etc.)',
        'Strong implementation skills in Python and modern ML frameworks',
        'Experience with reinforcement learning, NLP, or computer vision',
        'Ability to translate research into production-ready systems',
      ],
      about:
        'As an ML Research Engineer at Nexus.AI, you will push the boundaries of what is possible with artificial intelligence. You will conduct original research, prototype novel approaches, and work with our engineering team to bring breakthroughs into production. We believe that the best research happens when it is grounded in real-world problems, and this role offers the unique opportunity to do both.',
      keyResponsibilities: [
        'Conduct original research on cutting-edge ML problems',
        'Prototype and evaluate novel model architectures and training methods',
        'Collaborate with the engineering team to productionize research findings',
        'Stay current with the latest developments in ML research',
        'Publish findings and represent Nexus.AI at academic conferences',
      ],
    },
  },
]

function buildRichTextContent(sections: {
  whatWereLookingFor: string[]
  about: string
  keyResponsibilities: string[]
}) {
  const children: Record<string, any>[] = []
  const dir = 'ltr' as const

  // "What We're Looking For" heading
  children.push({
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text: "What We're Looking For", version: 1 }],
    direction: dir,
    format: '',
    indent: 0,
    version: 1,
  })

  // Bullet list
  children.push({
    type: 'list',
    tag: 'ul',
    listType: 'bullet',
    children: sections.whatWereLookingFor.map((item) => ({
      type: 'listitem',
      children: [{ type: 'text', text: item, version: 1 }],
      direction: dir,
      format: '',
      indent: 0,
      version: 1,
      value: 1,
    })),
    direction: dir,
    format: '',
    indent: 0,
    start: 1,
    version: 1,
  })

  // "About" heading
  children.push({
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text: 'About', version: 1 }],
    direction: dir,
    format: '',
    indent: 0,
    version: 1,
  })

  // About paragraphs
  const aboutParagraphs = sections.about.split('\n\n')
  for (const para of aboutParagraphs) {
    children.push({
      type: 'paragraph',
      children: [{ type: 'text', text: para, version: 1 }],
      direction: dir,
      format: '',
      indent: 0,
      version: 1,
    })
  }

  // "Key Responsibilities" heading
  children.push({
    type: 'heading',
    tag: 'h2',
    children: [{ type: 'text', text: 'Key Responsibilities', version: 1 }],
    direction: dir,
    format: '',
    indent: 0,
    version: 1,
  })

  // Bullet list
  children.push({
    type: 'list',
    tag: 'ul',
    listType: 'bullet',
    children: sections.keyResponsibilities.map((item) => ({
      type: 'listitem',
      children: [{ type: 'text', text: item, version: 1 }],
      direction: dir,
      format: '',
      indent: 0,
      version: 1,
      value: 1,
    })),
    direction: dir,
    format: '',
    indent: 0,
    start: 1,
    version: 1,
  })

  return {
    root: {
      type: 'root',
      children,
      direction: dir,
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding jobs...')

  for (const job of sampleJobs) {
    const existing = await payload.find({
      collection: 'jobs',
      where: {
        title: { equals: job.title },
      },
    })

    if (existing.docs.length > 0) {
      console.log(`  Job "${job.title}" already exists`)
      continue
    }

    await payload.create({
      collection: 'jobs',
      data: {
        title: job.title,
        location: job.location,
        type: job.type,
        mode: job.mode,
        department: job.department,
        status: 'open',
        content: buildRichTextContent(job.sections) as any,
      },
    })

    console.log(`  Created job: ${job.title}`)
  }

  console.log('\nJob seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
