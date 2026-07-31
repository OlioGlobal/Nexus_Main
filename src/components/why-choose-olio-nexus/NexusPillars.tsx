import Image from "next/image";

const pillars = [
  {
    title: "Industry-First Approach: Solving Real Business Problems",
    description: [
      "Generic technology doesn’t deliver real results.",
      "Nexus starts every engagement with an in-depth industry audit, learning your workflows, compliance needs, and what drives success in your field.",
      "We design every solution to fit your business, so you see real adoption, higher ROI, and tools that work in practice, not just on paper.",
    ],
    image: "/why-choose-olio-nexus/pillars-1.png",
    imageLeft: true,
  },
  {
    title: "AI-Powered Delivery: Fast Results, No Compromise.",
    description: [
      "Nexus uses AI throughout our delivery process, from research and documentation to coding, testing, and design.",
      "The result is delivery timelines far shorter than those of comparable firms. While other firms estimate 12–18 months for business technology transformation, Nexus delivers in 3–6 months.",
      "You get ahead of delays, tech gaps, and fast-moving competitors, so you can seize opportunities before they close.",
    ],
    image: "/why-choose-olio-nexus/pillars-2.png",
    imageLeft: false,
  },
];

export default function NexusPillars() {
  return (
    <section>
      {pillars.map((pillar, index) => (
        <div
          key={pillar.title}
          className={`grid lg:grid-cols-2 ${
            index !== pillars.length - 1
              ? "border-b border-[#CCCCCC]"
              : ""
          }`}
        >
          {pillar.imageLeft ? (
            <>
              <ImagePanel
                image={pillar.image}
                borderSide="right"
              />
              <ContentPanel pillar={pillar} />
            </>
          ) : (
            <>
              <ContentPanel pillar={pillar} />
              <ImagePanel
                image={pillar.image}
                borderSide="left"
              />
            </>
          )}
        </div>
      ))}
    </section>
  );
}

function ImagePanel({
  image,
  borderSide,
}: {
  image: string;
  borderSide: "left" | "right";
}) {
  return (
    <div
      className={`bg-background ${
        borderSide === "right"
          ? "lg:border-r"
          : "lg:border-l"
      } border-[#CCCCCC]`}
    >
      <div className="p-6 md:p-10">
        <div className="relative aspect-[600/432] overflow-hidden">
          <Image
            src={image}
            alt="Olio Nexus technology solutions in practice"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function ContentPanel({
  pillar,
}: {
  pillar: (typeof pillars)[number];
}) {
  return (
    <div className="flex items-center bg-background">
      <div className="max-w-[600px] px-8 py-16 md:px-10 md:py-20">
        <h2 className="mb-8">{pillar.title}</h2>

        <div className="space-y-8">
          {pillar.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}