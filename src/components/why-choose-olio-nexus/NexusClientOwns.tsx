import Image from "next/image";

const NexusclientOwnsItems = [
  {
    icon: "/why-choose-olio-nexus/NexusclientOwn-1.svg",
    title: "Full IP And Codebase Ownership",
    description:
      "All code, AI models, design systems, and process documents are fully owned by you. There are no licensing deals or proprietary frameworks that force you to keep working with NeXus or any other platform.",
  },
  {
    icon: "/why-choose-olio-nexus/NexusclientOwn-2.svg",
    title: "Deployed On Your Infrastructure",
    description:
      "AI agents, software, and automation run on your servers, whether in the cloud or on-site, not on a NeXus-managed platform. Your data and conversations stay in your own systems.",
  },
  {
    icon: "/why-choose-olio-nexus/NexusclientOwn-3.svg",
    title: "Documented For Your Team, Not For Ours",
    description:
      "At the end of every project, we provide documentation for your team, covering architecture, training data, maintenance, and runbooks. It's clear and easy to use without our help.",
  },
  {
    icon: "/why-choose-olio-nexus/NexusclientOwn-4.svg",
    title: "A Team That Knows How To Operate It Independently",
    description:
      "We set up training, handover sessions, and support to help your team maintain and extend the work. If needed, you can pass it to another developer or partner without starting over.",
  },
];

export default function NexusClientOwns() {
  return (
    <section>
      {/* Header */}
      <div className="border-b border-[#CCCCCC]">
        <div className="mx-auto max-w-[900px] px-6 py-16 text-center md:py-24">
          <h2 className="mb-6">
            What Every Nexus Client Owns
            <br />
            After Engagement
          </h2>

          <p className="mx-auto max-w-[700px]">
            Most technology vendors create dependency. We do the opposite by
            building independence into our solutions.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2">
        {NexusclientOwnsItems.map((item, index) => (
          <div
            key={item.title}
            className={`
              p-8 md:p-14 lg:p-16
              border-[#CCCCCC]
              border-b
              last:border-b-0
              ${index % 2 === 0 ? "md:border-r" : ""}
              ${index < 2 ? "md:border-b" : "md:border-b-0"}
            `}
          >
            <div className="mb-10">
              <Image
                src={item.icon}
                alt={item.title || 'What every Nexus client owns'}
                width={80}
                height={80}
                className="h-20 w-20 object-contain"
              />
            </div>

            <h3 className="mb-6 max-w-[520px]">
              {item.title}
            </h3>

            <p className="max-w-[560px]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

