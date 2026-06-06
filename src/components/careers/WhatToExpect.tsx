'use client'

import { useState } from 'react'
import Image from 'next/image'

const tabs = [
  {
    id: 'flexibility',
    label: 'Flexibility',
    cards: [
      {
        icon: '/ui/expect/flexibility-1.svg',
        title: 'Remote-First Flexibility',
        description:
          'Work wherever you do your best: at home, in the office, or a mix of both.',
      },
      {
        icon: '/ui/expect/flexibility-2.svg',
        title: 'Flexible Work Hours',
        description:
          'We care more about results and quality than the number of hours you work.',
      },
      {
        icon: '/ui/expect/flexibility-3.svg',
        title: 'Collaborative Workspaces',
        description:
          'Join us in shared spaces for in-person brainstorming or collaboration.',
      },
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    cards: [
      {
        icon: '/ui/expect/collaboration-1.svg',
        title: 'Cross-Functional Teams',
        description:
          'Work closely with engineering, design, and product teams to ship impactful experiences.',
      },
      {
        icon: '/ui/expect/collaboration-2.svg',
        title: 'Open Communication',
        description:
          'Ideas matter more than hierarchy. Everyone has a voice in shaping outcomes.',
      },
      {
        icon: '/ui/expect/collaboration-3.svg',
        title: 'Real-Time Feedback',
        description:
          'Fast feedback loops help us learn quickly and continuously improve.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    cards: [
      {
        icon: '/ui/expect/support-1.svg',
        title: 'Health & Wellness',
        description:
          'Comprehensive support for your physical and mental wellbeing.',
      },
      {
        icon: '/ui/expect/support-2.svg',
        title: 'Learning Budget',
        description:
          'Annual budgets for courses, certifications, and conferences.',
      },
      {
        icon: '/ui/expect/support-3.svg',
        title: 'Mentorship',
        description:
          'Learn from experienced leaders and grow through guidance and feedback.',
      },
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    cards: [
      {
        icon: '/ui/expect/growth-1.svg',
        title: 'Career Progression',
        description:
          'Clear growth paths with opportunities to expand your impact.',
      },
      {
        icon: '/ui/expect/growth-2.svg',
        title: 'Ownership',
        description: 'Take ownership of meaningful work from day one.',
      },
      {
        icon: '/ui/expect/growth-3.svg',
        title: 'Leadership Opportunities',
        description:
          'Lead initiatives, mentor others, and shape the future of the company.',
      },
    ],
  },
]

export default function WhatToExpect() {
  const [activeTab, setActiveTab] = useState('flexibility')

  const activeContent =
    tabs.find((tab) => tab.id === activeTab) || tabs[0]

  return (
    <section>
      {/* Header */}
      <div className="bg-[#FEF9EF] border-b border-[#CCCCCC] px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-[630px] mx-auto">
          <h2 className="text-center">
            What You Can <span className="text-[#FF7100]">Expect</span> Here
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#CCCCCC] px-6 md:px-10 py-6">
        <div className="flex flex-wrap gap-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 border uppercase tracking-[0.03em] transition-all duration-300 ${
                  isActive
                    ? 'bg-[#087F00] border-[#087F00] text-[#FEF9EF]'
                    : 'border-[#CCCCCC] text-[#212121]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {activeContent.cards.map((card, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center px-8 py-10 md:py-12 min-h-[340px] ${
              index !== activeContent.cards.length - 1
                ? 'md:border-r border-[#CCCCCC]'
                : ''
            }`}
          >
            {/* Icon */}
            <div className="mb-10">
              <Image
                src={card.icon}
                alt={card.title}
                width={96}
                height={96}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </div>

            {/* Content */}
            <div className="max-w-[393px]">
              <h3 className="mb-3">{card.title}</h3>

              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}