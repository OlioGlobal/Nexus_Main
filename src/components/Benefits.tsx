import Image from 'next/image'

const benefits = [
  { icon: '/ui/benifits/ph_house-line.png', title: 'Remote First Culture' },
  { icon: '/ui/benifits/ph_book-open.png', title: 'Uncapped Learning Budget' },
  { icon: '/ui/benifits/ph_globe-hemisphere-west.png', title: 'Global Team Events' },
  { icon: '/ui/benifits/ph_money-wavy.png', title: 'Performance Bonuses' },
  { icon: '/ui/benifits/ph_laptop.png', title: 'Latest Hardware' },
  { icon: '/ui/benifits/ph_rocket-launch.png', title: 'Fast-Track Growth' },
  { icon: '/ui/benifits/ph_timer.png', title: 'Flexible Hours' },
  { icon: '/ui/benifits/ph_arrows-counter-clockwise.png', title: 'Office Rotations' },
]

export default function Benefits() {
  return (
    <section>
      <div className="section-spacing text-center">
        <p className="section-title mb-4">[Benefits]</p>
        <h2 className="font-['Space_Grotesk'] font-medium text-[28px] md:text-[40px] leading-[36px] md:leading-[56px] text-[#212121]">
          What you get
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-t border-l border-[#CCCCCC]">
        {benefits.map((benefit, i) => (
          <div key={i} className="group p-6 md:p-8 border-b border-r border-[#CCCCCC] transition-colors duration-300 hover:bg-[#212121] cursor-default">
            <Image src={benefit.icon} alt={benefit.title} width={28} height={28} className="mb-4 transition-all duration-300 group-hover:invert group-hover:brightness-200" />
            <h3 className="font-['Space_Grotesk'] font-medium text-[20px] md:text-[24px] leading-7 md:leading-8 text-[#212121] transition-colors duration-300 group-hover:text-[#FEF9EF]!">
              {benefit.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
}
