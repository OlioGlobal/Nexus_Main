import type { ReactElement } from 'react'

export const industryIcons: Record<string, ReactElement> = {
  'Industrial & Manufacturing': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 36V20L14 26V20L24 26V20L34 26V20L44 14V36H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
      <rect x="34" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Engineering & High-Tech': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 4V12M24 36V44M4 24H12M36 24H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M9.17 9.17L14.93 14.93M33.07 33.07L38.83 38.83M38.83 9.17L33.07 14.93M14.93 33.07L9.17 38.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'Education': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M24 8L44 18L24 28L4 18L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 23V34C12 34 16 40 24 40C32 40 36 34 36 34V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'Real Estate': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="22" width="36" height="22" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M2 24L24 6L46 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="18" y="30" width="12" height="14" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Healthcare': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M24 14V34M14 24H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'Insurance': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M24 4L8 10V24C8 33 16 40 24 44C32 40 40 33 40 24V10L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M16 24L21 29L32 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Banking & Financial Services': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="20" width="40" height="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="4" y="36" width="40" height="4" stroke="currentColor" strokeWidth="2"/>
      <rect x="8" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
      <rect x="36" y="24" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20L24 8L44 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'Education & EdTech': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M24 8L44 18L24 28L4 18L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M12 23V34C12 34 16 40 24 40C32 40 36 34 36 34V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M44 18V30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  'E-commerce & Retail': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M6 8H10L14 28H38L42 14H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="36" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="34" cy="36" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Telecommunications': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M8 40C8 40 14 28 24 28C34 28 40 40 40 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 32C2 32 10 14 24 14C38 14 46 32 46 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 46C14 46 18 34 24 34C30 34 34 46 34 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="24" cy="22" r="2" fill="currentColor"/>
    </svg>
  ),
  'IT Services & BPO': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="4" y="8" width="40" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 40H32M24 36V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 20L18 24L14 28M22 28H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'Manufacturing': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 36V20L14 26V20L24 26V20L34 26V20L44 14V36H4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
      <rect x="34" y="28" width="6" height="8" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Government & Public Sector': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 44H44M4 20H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M24 8L44 20H4L24 8Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="10" y="20" width="6" height="24" stroke="currentColor" strokeWidth="2"/>
      <rect x="22" y="20" width="4" height="24" stroke="currentColor" strokeWidth="2"/>
      <rect x="32" y="20" width="6" height="24" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Hospitality & Services': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M4 40H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8 40V20C8 14 14 10 24 10C34 10 40 14 40 20V40" stroke="currentColor" strokeWidth="2"/>
      <path d="M4 20H44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="20" y="28" width="8" height="12" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  'Logistics & Transportation': (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="2" y="16" width="28" height="20" rx="1" stroke="currentColor" strokeWidth="2"/>
      <path d="M30 24H38L46 32V36H30V24Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="10" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
      <circle cx="38" cy="38" r="4" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
}

export const fallbackIndustries = [
  {
    name: 'Industrial & Manufacturing',
    description: 'Connect and optimize production systems for real-time operational control and less downtime.',
  },
  {
    name: 'Engineering & High-Tech',
    description: 'Enable precision and speed for R&D, product lifecycle, and operations teams with efficient digital infrastructure.',
  },
  {
    name: 'Education',
    description: 'Create learning, admissions, and support systems aligned with the institution\'s actual workflows.',
  },
  {
    name: 'Real Estate',
    description: 'Integrate lead, property, and transaction workflows to boost efficiency without increasing headcount.',
  },
  {
    name: 'Healthcare',
    description: 'Deliver compliant patient and clinical platforms with secure data handling and seamless integration.',
  },
]
