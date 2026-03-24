'use client'

import { useState, useRef } from 'react'

interface JobApplicationFormProps {
  jobId: string
  title?: string
}

export default function JobApplicationForm({ jobId, title = 'Apply Here' }: JobApplicationFormProps) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [fileName, setFileName] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function validate(formData: FormData): boolean {
    const newErrors: Record<string, string> = {}

    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const message = formData.get('message') as string
    const resume = formData.get('resume') as File

    if (!fullName?.trim()) newErrors.fullName = 'Full name is required'
    if (!email?.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address'
    if (!phone?.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^[\d\s+\-()]{7,20}$/.test(phone)) newErrors.phone = 'Invalid phone number'
    const linkedin = formData.get('linkedinProfile') as string
    if (linkedin?.trim() && !/^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/.test(linkedin.trim())) {
      newErrors.linkedinProfile = 'Enter a valid LinkedIn URL (e.g. https://linkedin.com/in/yourname)'
    }
    if (!message?.trim()) newErrors.message = 'This field is required'
    if (!resume?.name) newErrors.resume = 'Resume is required'
    else if (resume.size > 2 * 1024 * 1024) newErrors.resume = 'Resume must be under 2MB'
    else if (!/\.(pdf|doc|docx)$/i.test(resume.name)) newErrors.resume = 'Only PDF, DOC, DOCX allowed'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage('')

    const form = e.currentTarget
    const formData = new FormData(form)
    formData.append('jobId', jobId)

    if (!validate(formData)) return

    setStatus('submitting')

    try {
      const res = await fetch('/api/job-applications', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong.')
        return
      }

      setStatus('success')
      form.reset()
      setFileName('')
      setErrors({})
    } catch {
      setStatus('error')
      setErrorMessage('Failed to submit application. Please try again.')
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: 'Resume must be under 2MB' }))
        setFileName('')
        e.target.value = ''
        return
      }
      if (!/\.(pdf|doc|docx)$/i.test(file.name)) {
        setErrors((prev) => ({ ...prev, resume: 'Only PDF, DOC, DOCX allowed' }))
        setFileName('')
        e.target.value = ''
        return
      }
      setErrors((prev) => {
        const next = { ...prev }
        delete next.resume
        return next
      })
      setFileName(file.name)
    } else {
      setFileName('')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12 text-center">
        <h3 className="font-['Space_Grotesk'] font-medium text-[24px] text-[#088000] mb-3">
          Application Submitted
        </h3>
        <p className="font-['Inter'] text-[16px] text-[#6B6B6B]">
          Thank you for your interest. We&apos;ll review your application and get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-['Space_Grotesk'] font-medium text-[24px] md:text-[32px] leading-8 md:leading-10 text-[#212121] mb-8">
        {title}
      </h2>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Full Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <label htmlFor="fullName" className="block font-['Inter'] font-medium text-[14px] text-[#6B6B6B] capitalize mb-2">
              Full Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full bg-transparent border border-[#CCCCCC] py-3 px-4 font-['Inter'] text-[15px] text-[#212121] placeholder:text-[#999999] focus:outline-none focus:border-[#212121] transition-colors"
              placeholder="Jane Doe"
            />
            {errors.fullName && <p className="mt-1 font-['Inter'] text-[12px] text-red-500">{errors.fullName}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-['Inter'] font-medium text-[14px] text-[#6B6B6B] capitalize mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-transparent border border-[#CCCCCC] py-3 px-4 font-['Inter'] text-[15px] text-[#212121] placeholder:text-[#999999] focus:outline-none focus:border-[#212121] transition-colors"
              placeholder="jane@gmail.com"
            />
            {errors.email && <p className="mt-1 font-['Inter'] text-[12px] text-red-500">{errors.email}</p>}
          </div>
        </div>

        {/* Row 2: Phone + LinkedIn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <label htmlFor="phone" className="block font-['Inter'] font-medium text-[14px] text-[#6B6B6B] capitalize mb-2">
              Phone Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              required
              className="w-full bg-transparent border border-[#CCCCCC] py-3 px-4 font-['Inter'] text-[15px] text-[#212121] placeholder:text-[#999999] focus:outline-none focus:border-[#212121] transition-colors"
              placeholder="+91 9167856894"
            />
            {errors.phone && <p className="mt-1 font-['Inter'] text-[12px] text-red-500">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="linkedinProfile" className="block font-['Inter'] font-medium text-[14px] text-[#6B6B6B] capitalize mb-2">
              LinkedIn Profile<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="linkedinProfile"
              name="linkedinProfile"
              className="w-full bg-transparent border border-[#CCCCCC] py-3 px-4 font-['Inter'] text-[15px] text-[#212121] placeholder:text-[#999999] focus:outline-none focus:border-[#212121] transition-colors"
              placeholder="https://linkedin.com/in/johndoe"
            />
            {errors.linkedinProfile && <p className="mt-1 font-['Inter'] text-[12px] text-red-500">{errors.linkedinProfile}</p>}
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block font-['Inter'] font-medium text-[14px] text-[#6B6B6B] capitalize mb-2">
            Why Do You Want To Join Us?<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full bg-transparent border border-[#CCCCCC] py-3 px-4 font-['Inter'] text-[15px] text-[#212121] placeholder:text-[#999999] focus:outline-none focus:border-[#212121] transition-colors resize-none"
            placeholder="Write your reason here.."
          />
          {errors.message && <p className="mt-1 font-['Inter'] text-[12px] text-red-500">{errors.message}</p>}
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block font-['Inter'] font-medium text-[14px] text-[#6B6B6B] capitalize mb-2">
            Resume<span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="resume"
            ref={fileInputRef}
            required
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#CCCCCC] font-['Inter'] text-[14px] text-[#6B6B6B] hover:border-[#212121] hover:text-[#212121] transition-colors"
            >
              Attach Resume
            </button>
            {fileName && (
              <span className="font-['Inter'] text-[14px] text-[#212121] truncate max-w-[200px]">{fileName}</span>
            )}
          </div>
          <p className="mt-1 font-['Inter'] text-[12px] text-[#999999]">PDF, DOC, DOCX — Max 2MB</p>
          {errors.resume && <p className="mt-1 font-['Inter'] text-[12px] text-red-500">{errors.resume}</p>}
        </div>

        {/* Error State */}
        {status === 'error' && (
          <p className="font-['Inter'] text-[14px] text-red-600">{errorMessage}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Submitting...' : 'SUBMIT APPLICATION'}
        </button>
      </form>
    </div>
  )
}
