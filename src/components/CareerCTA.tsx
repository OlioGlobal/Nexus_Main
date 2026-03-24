'use client'

import { useState, useEffect } from 'react'
import JobApplicationForm from './JobApplicationForm'

export default function CareerCTA() {
  const [showForm, setShowForm] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [showForm])

  return (
    <>
      {/* Dark CTA Section */}
      <section className="bg-[#212121] py-12 md:py-16 text-center">
        <h2 className="font-['Space_Grotesk'] text-[#FEFBF4]! font-medium text-[28px] md:text-[40px] leading-9 md:leading-14 mb-3">
          Don&apos;t see your role?
        </h2>
        <p className="font-['Inter'] font-normal text-[15px] md:text-[16px] leading-6 tracking-[-0.01em] text-[#949494] max-w-md mx-auto mb-6">
          We are always interested in meeting exceptional people.
          <br />
          Send us your profile.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="inline-block px-6 py-3 border border-[#FEF9EF] font-['Space_Mono'] font-normal text-[14px] md:text-[16px] uppercase tracking-[0.03em] text-[#FEF9EF] hover:bg-[#FEF9EF] hover:text-[#212121] transition-colors"
        >
          GET IN TOUCH
        </button>
      </section>

      {/* Modal Overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Modal */}
          <div
            className="relative w-full max-w-[700px] max-h-[90vh] overflow-y-auto bg-[#FEF9EF] border border-[#CCCCCC] p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#212121] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <JobApplicationForm jobId="general" title="Apply Here" />
          </div>
        </div>
      )}
    </>
  )
}
