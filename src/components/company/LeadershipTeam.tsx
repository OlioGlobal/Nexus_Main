const team = [
  { name: 'Jane Doe', designation: 'Designation', image: '/company-profile/leadership/leader-1.png' },
  { name: 'Jane Doe', designation: 'Designation', image: '/company-profile/leadership/leader-2.png' },
  { name: 'Jane Doe', designation: 'Designation', image: '/company-profile/leadership/leader-3.png' },
  { name: 'Jane Doe', designation: 'Designation', image: '/company-profile/leadership/leader-4.png' },
  { name: 'Jane Doe', designation: 'Designation', image: '/company-profile/leadership/leader-5.png' },
  { name: 'Jane Doe', designation: 'Designation', image: '/company-profile/leadership/leader-6.png' },
]

export default function LeadershipTeam() {
  return (
    <section className="section-divider">
      {/* Heading */}
      <div className="px-4 md:px-8 section-spacing border-b border-[#CCCCCC]">
        <h2 className="h2 mb-3">Leadership Team</h2>
        <p className="section-desc max-w-lg">
          Leadership profiles to be added by the NeXus team. Each profile includes name, title,
          and a positioning statement on background and what they bring to the organization.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <div
            key={i}
            className={`flex flex-col border-b border-[#CCCCCC] ${i % 3 !== 2 ? 'lg:border-r border-[#CCCCCC]' : ''} ${i % 2 === 0 ? 'sm:border-r border-[#CCCCCC]' : ''}`}
          >
            {/* Photo */}
            <div className="p-4 md:p-6 pb-0">
            <div className="w-full aspect-square overflow-hidden bg-[#E8E3D9]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            </div>

            {/* Info */}
            <div className="px-4 md:px-6 pt-3 pb-4 md:pb-6 flex flex-col gap-2">
              <span
                className="self-start border border-[#CCCCCC] px-2 py-1 text-[12px] leading-none"
                style={{ fontFamily: "'Inter', sans-serif", color: '#6B6B6B' }}
              >
                {member.designation}
              </span>
              <h3 className="text-[18px]! md:text-[20px]!">{member.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
