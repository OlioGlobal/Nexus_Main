import Link from "next/link";

export default function WhyNexusCta() {
  return (
    <section className="bg-[#212121] border-b border-[#333333]">
      <div className="container-bordered border-x-0">
        <div className="px-5 md:px-10 py-12 md:py-[68px]">
          <div className="flex flex-col items-start gap-10">
            {/* Content */}
            <div className="max-w-[817px]">
              <h2 className="text-[#FEFBF4]! text-[28px]! leading-[40px]! md:text-[40px]! md:leading-[56px]! mb-6">
                Curious If Nexus Is Right for You? Let&apos;s Talk and Explore
                Your Needs Together
              </h2>

              <p className="max-w-[729px] text-[#949494]!">
                Tell us about your situation. We&apos;ll give you honest
                feedback on what we see, where we can help, and if another
                partner might be a better fit.
              </p>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="btn-primary min-w-[248px] h-12 bg-[#088000] hover:bg-[#066800] inline-flex items-center justify-center"
            >
              Book A Discovery Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}