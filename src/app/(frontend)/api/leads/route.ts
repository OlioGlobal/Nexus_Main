import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, fullName, company, role, budget, area, message, source } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Input length limits
    if (email.length > 255) {
      return NextResponse.json({ error: 'Email must be 255 characters or less' }, { status: 400 })
    }
    if (fullName && fullName.length > 200) {
      return NextResponse.json({ error: 'Full name must be 200 characters or less' }, { status: 400 })
    }
    if (company && company.length > 200) {
      return NextResponse.json({ error: 'Company must be 200 characters or less' }, { status: 400 })
    }
    if (role && role.length > 200) {
      return NextResponse.json({ error: 'Role must be 200 characters or less' }, { status: 400 })
    }
    if (budget && budget.length > 100) {
      return NextResponse.json({ error: 'Budget must be 100 characters or less' }, { status: 400 })
    }
    if (area && area.length > 200) {
      return NextResponse.json({ error: 'Area must be 200 characters or less' }, { status: 400 })
    }
    if (message && message.length > 5000) {
      return NextResponse.json({ error: 'Message must be 5000 characters or less' }, { status: 400 })
    }
    if (source && source.length > 100) {
      return NextResponse.json({ error: 'Source must be 100 characters or less' }, { status: 400 })
    }

    const payload = await getPayload({ config })

    await payload.create({
      collection: 'leads',
      data: {
        email,
        fullName: fullName || undefined,
        company: company || undefined,
        role: role || undefined,
        budget: budget || undefined,
        area: area || undefined,
        message: message || undefined,
        source: source || 'newsletter',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead creation error:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
