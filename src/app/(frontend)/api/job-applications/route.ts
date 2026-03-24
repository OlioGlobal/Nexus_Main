import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()

    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const linkedinProfile = formData.get('linkedinProfile') as string
    const message = formData.get('message') as string
    const resume = formData.get('resume') as File | null
    const jobId = formData.get('jobId') as string

    // Validate required fields
    if (!fullName || !email || !phone || !resume || !jobId) {
      return NextResponse.json(
        { error: 'Full name, email, phone, resume, and job are required.' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    // Upload resume to resumes collection (stored locally, not Cloudinary)
    const arrayBuffer = await resume.arrayBuffer()
    const uploadedMedia = await payload.create({
      collection: 'resumes',
      data: {
        alt: `Resume - ${fullName}`,
      },
      file: {
        data: Buffer.from(arrayBuffer),
        mimetype: resume.type,
        name: resume.name,
        size: resume.size,
      },
    })

    // Create job application
    const applicationData: Record<string, any> = {
      fullName,
      email,
      phone,
      linkedinProfile: linkedinProfile || undefined,
      message: message || undefined,
      resume: uploadedMedia.id,
    }

    // Only set job if it's a valid MongoDB ObjectId (not "general")
    if (jobId && /^[0-9a-fA-F]{24}$/.test(jobId)) {
      applicationData.job = jobId
    }

    await payload.create({
      collection: 'job-applications',
      data: applicationData as any,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Job application error:', error)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 },
    )
  }
}
