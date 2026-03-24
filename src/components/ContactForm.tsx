'use client'

import { useState } from 'react'
import Image from 'next/image'

const budgetOptions = ['$10k-50k', '$50k-100k', '$100k-250k', '$250k+']
const areaOptions = ['AI & Automation', 'Web Development', 'Mobile App', 'UI/UX Design', 'Consulting', 'Other']

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    company: '',
    role: '',
    budget: '',
    area: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    // Clear error on change
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}

    if (!form.fullName.trim()) errs.fullName = 'Full name is required'
    if (!form.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email'
    }
    if (!form.company.trim()) errs.company = 'Company name is required'
    if (!form.budget) errs.budget = 'Please select a budget'
    if (!form.area) errs.area = 'Please select an area'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'contact-form' }),
      })

      if (res.ok) {
        setStatus('success')
        setForm({ fullName: '', email: '', company: '', role: '', budget: '', area: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputBase = "w-full border bg-transparent px-4 py-3 text-[16px] text-[#212121] placeholder-[#999999] outline-none focus:border-[#FF7100] transition-colors"
  const inputClass = (name: string) =>
    `${inputBase} ${errors[name] ? 'border-[#DC2626]' : 'border-[#CCCCCC]'}`
  const errorMsg = (name: string) =>
    errors[name] ? (
      <span className="text-[#DC2626] text-[12px] mt-1 block" style={{ fontFamily: "'Inter', sans-serif" }}>
        {errors[name]}
      </span>
    ) : null
  const labelStyle = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    textTransform: 'capitalize' as const,
    color: '#6B6B6B',
  } as const

  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] border-b border-[#CCCCCC]">
      {/* Left — Contact Info (sticky) */}
      <div className="border-b md:border-b-0 md:border-r border-[#CCCCCC]">
        <div className="md:sticky md:top-16.25 flex flex-col [&>div]:flex-1">
        {/* Mumbai */}
        <div className="p-6 md:p-8 border-b border-[#CCCCCC]">
          <Image src="/ui/IN - India.png" alt="India" width={28} height={20} className="mb-3" />
          <h3
            className="mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
              color: '#212121',
            }}
          >
            Mumbai
          </h3>
          <p
            className="mb-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#6B6B6B',
            }}
          >
            406 Rajgor Empire Building, Khot Lane, Kapol Wadi, Ghatkopar West, Mumbai, Maharashtra 400086
          </p>
          <a
            href="tel:+917303197934"
            className="underline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#6B6B6B',
            }}
          >
            +91 73031 97934
          </a>
        </div>

        {/* Dubai */}
        <div className="p-6 md:p-8 border-b border-[#CCCCCC]">
          <Image src="/ui/AE - United Arab Emirates.png" alt="UAE" width={28} height={20} className="mb-3" />
          <h3
            className="mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
              color: '#212121',
            }}
          >
            Dubai
          </h3>
          <p
            className="mb-3"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#6B6B6B',
            }}
          >
            TechnoRep Marketing Solutions LLC 114, Makateb Building, Sheikh Zayed Road, Near Onpassive Metro Station, Dubai UAE, PO Box 30557
          </p>
          <a
            href="tel:+971507362031"
            className="underline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#6B6B6B',
            }}
          >
            +971 50 7362031
          </a>
        </div>

        {/* Email */}
        <div className="p-6 md:p-8">
          <Image src="/ui/ph_envelope-simple.png" alt="Email" width={28} height={28} className="mb-3" />
          <h3
            className="mb-3"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '32px',
              color: '#212121',
            }}
          >
            Email
          </h3>
          <a
            href="mailto:info@olioglobaladtech.com"
            className="block underline mb-1"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#6B6B6B',
            }}
          >
            info@olioglobaladtech.com
          </a>
          <a
            href="mailto:shaun@olioglobaladtech.com"
            className="block underline"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '-0.01em',
              color: '#6B6B6B',
            }}
          >
            shaun@olioglobaladtech.com
          </a>
        </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="p-6 md:p-8 flex flex-col">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 justify-between">
          <div>
            <label style={labelStyle} className="block mb-2">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Jane Doe"
              className={inputClass('fullName')}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {errorMsg('fullName')}
          </div>

          <div>
            <label style={labelStyle} className="block mb-2">Work Email*</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jane@gmail.com"
              className={inputClass('email')}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {errorMsg('email')}
          </div>

          <div>
            <label style={labelStyle} className="block mb-2">Company Name*</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Enterprise Inc."
              className={inputClass('company')}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
            {errorMsg('company')}
          </div>

          <div>
            <label style={labelStyle} className="block mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={form.role}
              onChange={handleChange}
              placeholder="CTO / Director"
              className={inputClass('role')}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label style={labelStyle} className="block mb-2">Project Budget*</label>
              <select
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className={`${inputClass('budget')} appearance-none`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="" disabled>$10k-50k</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errorMsg('budget')}
            </div>
            <div>
              <label style={labelStyle} className="block mb-2">Interest Area*</label>
              <select
                name="area"
                value={form.area}
                onChange={handleChange}
                className={`${inputClass('area')} appearance-none`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="" disabled>Select Area</option>
                {areaOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {errorMsg('area')}
            </div>
          </div>

          <div>
            <label style={labelStyle} className="block mb-2">How Can We Help You?</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your reason here..."
              rows={5}
              className={`${inputClass('message')} resize-none`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex justify-center items-center uppercase tracking-[0.03em] text-white hover:opacity-90 transition-opacity"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '100%',
              backgroundColor: '#088000',
              height: '48px',
              padding: '8px 16px',
              gap: '10px',
            }}
          >
            {status === 'loading' ? 'Submitting...' : 'Request Consultation'}
          </button>

          <p
            className="text-center"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              color: '#999999',
            }}
          >
            We typically respond in 24hours
          </p>

          {status === 'success' && (
            <p className="text-[#088000] text-[14px] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Thank you! We&apos;ll be in touch soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-[#DC2626] text-[14px] text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
