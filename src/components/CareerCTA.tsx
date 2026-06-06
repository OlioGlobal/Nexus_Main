'use client'

import { useEffect, useState } from 'react'
import JobApplicationForm from './JobApplicationForm'

export default function CareerCTA() {
  const [showForm, setShowForm] = useState(false)

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
      {/* CTA Section */}
      <section className="bg-[#212121] border-b border-[#333333]">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 py-20 md:py-[68px]">
          <div className="flex flex-col items-start gap-10 max-w-[817px]">
            {/* Content */}
            <div className="flex flex-col items-start gap-6">
              <h2 className='text-[#FEFBF4]!'>
                Don&apos;t See the Right Role Yet?{' '}
                <span className="text-[#FF7A00]">
                  Stay Connected with Us.
                </span>
              </h2>

              <p className="max-w-[729px] text-[#949494]">
                Let us know your background, strengths, and the type of role
                you are seeking. We&apos;d be happy to reach out when new
                opportunities come up.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center justify-center h-12 px-4 bg-[#088000] hover:bg-[#066600] transition-colors"
            >
              <span className="uppercase text-[#FEFBF4]">
                Send Your CV
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
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
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-[#6B6B6B] hover:text-[#212121] transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
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