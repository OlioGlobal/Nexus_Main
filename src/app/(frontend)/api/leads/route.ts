import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, fullName, company, role, budget, area, message, source } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
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
  } catch {
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
