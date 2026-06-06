import Image from "next/image";

const whoWeHelpItems = [
  {
    icon: "/why-choose-olio-nexus/business-1.svg",
    title: "Growing businesses",
    description:
      "Whose current technology no longer keeps up. If your systems create bottlenecks and extra manual work as you scale, we deliver solutions designed for your future.",
  },
  {
    icon: "/why-choose-olio-nexus/business-2.svg",
    title: "Leaders frustrated by past technology investments",
    description:
      "That didn’t deliver. If your last project went live but didn’t meet business goals or drive adoption, we address what others missed and put you on the path to real results.",
  },
  {
    icon: "/why-choose-olio-nexus/business-3.svg",
    title: "Organizations seeking strategy and execution",
    description:
      "Without the vendor juggling. When you need a partner who connects planning, building, and change management under one roof, Nexus keeps your business technology transformation on track, start to finish.",
  },
];

export default function WhoWeHelpMost() {
  return (
    <section>
      <div className="container-bordered">
        <div className="grid lg:grid-cols-2">
          {/* Left Column */}
          <div className="lg:border-r lg:border-border">
            <div className="px-6 py-12 md:px-10 md:py-16 lg:px-10 lg:py-[84px] sticky top-20">
              <div className="max-w-[600px]">
                <h2>Who We Help Most</h2>

                <p className="mt-4">
                  NeXus is purpose-built for
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {whoWeHelpItems.map((item, index) => (
              <div
                key={item.title}
                className={`px-6 py-10 md:px-10 md:py-10 ${
                  index !== whoWeHelpItems.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                <div className="flex flex-col gap-5">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={96}
                    height={96}
                    className="h-24 w-24 object-contain"
                  />

                  <div className="space-y-4">
                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

