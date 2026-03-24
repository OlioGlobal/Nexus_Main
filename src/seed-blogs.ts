import 'dotenv/config'
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categories = ['Strategy', 'Architecture', 'Intelligence', 'Engineering', 'AI']

const blogPosts = [
  {
    title: 'The Death of Traditional SaaS: Why Vertical AI is Eating the World',
    category: 'Strategy',
    excerpt:
      'The SaaS model is being disrupted by vertical AI solutions that deliver 10x value at a fraction of the cost.',
    content: `The traditional SaaS model served us well for two decades. But the landscape is shifting. Vertical AI solutions are emerging that don't just automate workflows — they fundamentally reimagine them.\n\nCompanies that once needed teams of ten to manage their operations are now achieving the same output with two people and an AI agent. This isn't incremental improvement. It's a paradigm shift.\n\nThe key insight? Horizontal tools try to be everything to everyone. Vertical AI goes deep into a specific domain, understanding its nuances, regulations, and workflows intimately. The result is software that doesn't just assist — it acts.\n\nFor enterprises evaluating their tech stack, the question is no longer "which SaaS tool should we buy?" but "which processes can we hand to an AI agent entirely?"`,
  },
  {
    title: 'Scaling to 10M Concurrent: Lessons from Nexus.Build',
    category: 'Architecture',
    excerpt:
      'How we architected our platform to handle massive concurrent loads without breaking the bank.',
    content: `When we set out to build Nexus.Build, we knew scalability wasn't optional — it was existential. Our clients operate in real-time environments where a 200ms delay means lost revenue.\n\nThe architecture we landed on combines event-driven microservices with intelligent edge caching. Every request is routed through our custom load balancer that considers not just server health, but data locality and user context.\n\nKey decisions that made the difference:\n\n1. We chose Rust for our core processing engine, gaining predictable latency without garbage collection pauses.\n\n2. Our database layer uses a CQRS pattern — separating read and write models let us optimize each independently.\n\n3. Edge computing handles 73% of requests before they ever hit our origin servers.\n\nThe result? 10M concurrent connections with p99 latency under 50ms, running on infrastructure that costs 60% less than our competitors.`,
  },
  {
    title: '5 Ways to Measure Real ROI on Digital Transformation',
    category: 'Strategy',
    excerpt:
      'Move beyond vanity metrics and measure what actually matters in your digital transformation journey.',
    content: `Digital transformation projects have a dirty secret: most organizations can't quantify their ROI. They track activity metrics — lines of code, features shipped, sprints completed — while the business impact remains unclear.\n\nHere are five metrics that actually matter:\n\n1. Time-to-Value Reduction: How much faster can your team deliver value to customers? This isn't about development speed — it's about the entire value chain from idea to impact.\n\n2. Decision Velocity: How quickly can your organization make informed decisions? If your data infrastructure doesn't accelerate decision-making, it's not transformative.\n\n3. Customer Effort Score: Every digital initiative should reduce friction for your customers. If it doesn't, question whether it's truly transformative or just new technology for technology's sake.\n\n4. Revenue per Employee: This metric reveals whether technology is genuinely amplifying human capability or just adding complexity.\n\n5. Innovation Rate: What percentage of your revenue comes from products or services that didn't exist 24 months ago?`,
  },
  {
    title: 'The Ethics of Autonomous Agents in Global Finance',
    category: 'Intelligence',
    excerpt:
      'As AI agents gain autonomy in financial systems, we must address the ethical frameworks governing their decisions.',
    content: `Autonomous AI agents are now making split-second trading decisions, evaluating credit applications, and detecting fraud patterns across billions of transactions. The efficiency gains are undeniable. But who is responsible when an AI agent denies a legitimate loan application based on patterns that correlate with protected characteristics?\n\nThe financial industry needs a new ethical framework — one that accounts for the unique challenges of autonomous decision-making at scale.\n\nTransparency isn't enough. We need explainability that non-technical stakeholders can understand and challenge. Every decision an AI agent makes in finance should have an audit trail that a regulator can follow.\n\nAt Nexus.AI, we've implemented what we call "ethical guardrails" — hard constraints that no amount of optimization can override. These include fairness checks, regulatory compliance verification, and human escalation triggers for edge cases.\n\nThe future of AI in finance isn't about removing humans from the loop. It's about giving humans better tools to oversee increasingly capable systems.`,
  },
  {
    title: 'Why We Chose Rust for Our Core Infrastructure',
    category: 'Engineering',
    excerpt:
      'The technical reasoning behind our decision to rebuild critical systems in Rust.',
    content: `Two years ago, we made a controversial decision: rewrite our core processing pipeline from Node.js to Rust. The engineering team was skeptical. The business team was nervous. Here's why we did it and what we learned.\n\nThe problem was predictability. Our Node.js services handled average load beautifully, but tail latencies during peak hours were unpredictable. Garbage collection pauses, event loop blocking, and memory fragmentation created variance that our SLAs couldn't tolerate.\n\nRust gave us three things:\n\n1. Zero-cost abstractions: We write high-level, readable code that compiles to performance equivalent to hand-tuned C.\n\n2. Memory safety without GC: No more garbage collection pauses. Our p99 latency dropped from 230ms to 12ms.\n\n3. Fearless concurrency: Rust's ownership model catches data races at compile time. Our production incident rate dropped by 84%.\n\nThe migration took 14 months. Was it worth it? Our infrastructure costs dropped 71%, our reliability improved from 99.95% to 99.99%, and our engineering team now ships with higher confidence.`,
  },
  {
    title: 'Building Products That Create Markets: A Framework',
    category: 'Strategy',
    excerpt:
      'Stop competing in existing markets. Learn how to create entirely new ones with technology.',
    content: `The most successful technology companies don't win markets — they create them. Uber didn't compete with taxis. Airbnb didn't compete with hotels. They redefined the category entirely.\n\nAt OlioNexus, we've developed a framework for market creation that we use with our enterprise clients:\n\nStep 1: Identify the non-consumer. Who wants to accomplish something but can't because existing solutions are too expensive, complex, or inaccessible?\n\nStep 2: Find the 10x unlock. What technology or approach could make the impossible affordable? This isn't about incremental improvement — it's about order-of-magnitude change.\n\nStep 3: Design the ecosystem. New markets need new ecosystems. Who are the partners, suppliers, and complementors that will make your solution viable?\n\nStep 4: Build the moat. Market creators have a first-mover advantage, but only if they build defensibility through network effects, data advantages, or switching costs.\n\nThe companies that will define the next decade aren't the ones building better versions of existing products. They're the ones imagining products that make current categories obsolete.`,
  },
  {
    title: 'LLMs in Production: What We Learned Deploying at Scale',
    category: 'AI',
    excerpt:
      'Practical lessons from deploying large language models in production enterprise environments.',
    content: `Deploying LLMs in a demo is easy. Deploying them in production, at scale, with enterprise reliability requirements? That's where the real engineering begins.\n\nAfter deploying LLM-powered features across 12 enterprise clients, here are our hard-won lessons:\n\n1. Prompt engineering is software engineering. Treat prompts like code — version them, test them, review them. We maintain a prompt test suite with 500+ test cases.\n\n2. Latency budgets are everything. Users tolerate 2-3 seconds for a "thinking" response, but beyond that, engagement drops precipitously. We use streaming responses and speculative execution to stay within budget.\n\n3. Hallucination is a feature, not a bug — if you design for it. Every LLM output goes through a verification layer. For factual claims, we cross-reference against our knowledge base. For recommendations, we validate against business rules.\n\n4. Cost optimization is ongoing. Model selection, caching, prompt compression, and batch processing can reduce LLM costs by 80% without meaningful quality degradation.\n\n5. Evaluation is the hardest problem. Traditional software has deterministic tests. LLM outputs are probabilistic. We've built custom evaluation frameworks that combine automated metrics with human judgment.`,
  },
]

async function seed() {
  const payload = await getPayload({ config })

  console.log('Seeding categories...')

  const categoryMap: Record<string, string> = {}

  for (const name of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { name: { equals: name } },
    })

    if (existing.docs.length > 0) {
      categoryMap[name] = existing.docs[0].id
      console.log(`  Category "${name}" already exists`)
    } else {
      const cat = await payload.create({
        collection: 'categories',
        data: {
          name,
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        },
      })
      categoryMap[name] = cat.id
      console.log(`  Created category: ${name}`)
    }
  }

  // Find a sample image to use as featured image
  const media = await payload.find({
    collection: 'media',
    limit: 1,
  })

  let mediaId: string | undefined
  if (media.docs.length > 0) {
    mediaId = media.docs[0].id
  }

  if (!mediaId) {
    console.log('No media found. Uploading a placeholder...')
    // Upload one of the existing images as placeholder
    const imagePath = path.resolve(__dirname, '../public/ui/hero-svg.png')
    if (fs.existsSync(imagePath)) {
      const uploaded = await payload.create({
        collection: 'media',
        data: {
          alt: 'Blog placeholder',
        },
        file: {
          data: fs.readFileSync(imagePath),
          mimetype: 'image/png',
          name: 'blog-placeholder.png',
          size: fs.statSync(imagePath).size,
        },
      })
      mediaId = uploaded.id
    }
  }

  if (!mediaId) {
    console.error('Cannot seed posts without media. Upload at least one image first.')
    process.exit(1)
  }

  console.log('\nSeeding blog posts...')

  for (const post of blogPosts) {
    const existing = await payload.find({
      collection: 'posts',
      where: {
        title: { equals: post.title },
      },
    })

    if (existing.docs.length > 0) {
      console.log(`  Post "${post.title}" already exists`)
      continue
    }

    await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        category: categoryMap[post.category],
        featuredImage: mediaId,
        excerpt: post.excerpt,
        content: {
          root: {
            type: 'root',
            children: post.content.split('\n\n').map((paragraph) => ({
              type: 'paragraph',
              children: [{ type: 'text', text: paragraph, version: 1 }],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            })),
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        publishDate: new Date().toISOString(),
        status: 'published',
      },
    })

    console.log(`  Created post: ${post.title}`)
  }

  console.log('\nSeeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
