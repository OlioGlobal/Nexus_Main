import Image from "next/image";

const Threepillars = [
  {
    icon: "/why-choose-olio-nexus/ThreePillars-1.svg",
    title: "Nexus AI",
    description:
      "Turn data into decisions and automate repetitive work with intelligent solutions built for speed and scale.",
  },
  {
    icon: "/why-choose-olio-nexus/ThreePillars-2.svg",
    title: "Nexus Build",
    description:
      "Get technology that's designed for your business, delivered in clear phases, and fully documented for your team to own and operate.",
  },
  {
    icon: "/why-choose-olio-nexus/ThreePillars-3.svg",
    title: "Nexus Labs",
    description:
      "Ensure lasting impact by putting people and processes at the center, managing change from day one, and making adoption seamless.",
  },
];

export default function ThreePillars() {
  return (
    <section className="bg-[#212121]">
      <div className="container-bordered">
        {/* Header */}
        <div className="border-b border-[#333333] px-6 py-12 md:px-10 md:py-20">
          <div className="mx-auto max-w-[660px] text-center">
            <h2 className="!text-[#FEF9EF]">
              The Power of Our Three Pillars
            </h2>

            <p className="mt-4 text-[#6B6B6B]">
              Experience the true value of Nexus when AI, Build, and Labs work
              together to drive your business technology transformation. Here's
              how each pillar delivers.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {Threepillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`
                border-[#333333]
                px-6 py-10 md:px-10 md:py-10
                ${
                  index !== Threepillars.length - 1
                    ? "border-b md:border-b-0 md:border-r"
                    : ""
                }
              `}
            >
              <div className="flex flex-col gap-6">
                <Image
                  src={pillar.icon}
                  alt={pillar.title}
                  width={128}
                  height={64}
                  className="h-16 w-auto"
                />

                <div>
                  <h3 className="!text-[#FEF9EF]">{pillar.title}</h3>

                  <p className="mt-2 text-[#949494]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Copy */}
        <div className="border-t border-[#333333] px-6 py-8 md:px-10">
          <p className="max-w-[900px] text-[#B9B9B9]">
            With all three pillars aligned, you get technology that's smart,
            built right, and fully adopted, so your organization can run and
            grow independently, without ongoing reliance on Nexus.
          </p>
        </div>
      </div>
    </section>
  );
}