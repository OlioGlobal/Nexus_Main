type ComparisonRow = {
  label: string;
  genericVendor: string;
  legacyConsultants: string;
  olioNexus: string;
};

const rows: ComparisonRow[] = [
  {
    label: "Strategy to execution",
    genericVendor: "Strategy only, or execution only",
    legacyConsultants: "Strategy and execution, but separate teams",
    olioNexus: "Strategy and execution are connected under one team",
  },
  {
    label: "Industry knowledge",
    genericVendor: "Applied after the sale",
    legacyConsultants: "Deep but expensive and slow",
    olioNexus: "Built into every engagement from day one",
  },
  {
    label: "Ownership of output",
    genericVendor: "Platform dependency or license",
    legacyConsultants:
      "Documentation, but complex and costly to exit",
    olioNexus: "Full IP transfer, deployed on your infrastructure",
  },
  {
    label: "Timeline",
    genericVendor: "Varies widely",
    legacyConsultants:
      "12-24 months for meaningful transformation",
    olioNexus:
      "3-6 months, accelerated by AI-assisted delivery",
  },
  {
    label: "Who does the work",
    genericVendor: "Variable",
    legacyConsultants:
      "Senior partners sell, junior teams deliver",
    olioNexus:
      "The practitioners who scoped the work deliver it",
  },
  {
    label: "Ongoing dependency",
    genericVendor: "Often structural",
    legacyConsultants: "Often structural",
    olioNexus:
      "None — designed out from the first sprint",
  },
];

export default function NexusComparison() {
  return (
    <section className="bg-[#212121] text-white">
      {/* Hero */}
      <div className="flex items-center justify-center border-b border-[#333] px-6 py-24 md:py-32">
        <div className="max-w-4xl text-center">
          <h2 className="text-white!">
            The NeXus Difference Across All
            <br />
            Three Pillars
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <div className="min-w-[1100px] grid grid-cols-4">
          {/* Headers */}
          <HeaderCell>Lorem Ipsum</HeaderCell>
          <HeaderCell>Generic Vendor</HeaderCell>
          <HeaderCell>Legacy Consultants</HeaderCell>
          <HeaderCell highlighted>Olio NeXus</HeaderCell>

          {rows.map((row) => (
            <Row
              key={row.label}
              label={row.label}
              genericVendor={row.genericVendor}
              legacyConsultants={row.legacyConsultants}
              olioNexus={row.olioNexus}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeaderCell({
  children,
  highlighted = false,
}: {
  children: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`
        border-r border-b border-[#333]
        px-8 py-10
        flex items-center
        font-heading text-[28px]
        ${
          highlighted
            ? "bg-[#5E371D] text-white"
            : "bg-[#212121] text-white"
        }
      `}
    >
      {children}
    </div>
  );
}

function Row({
  label,
  genericVendor,
  legacyConsultants,
  olioNexus,
}: ComparisonRow) {
  return (
    <>
      <div className="border-r border-b border-[#333] px-8 py-14 flex items-center">
        <h3 className="text-white!">{label}</h3>
      </div>

      <div className="border-r border-b border-[#333] px-8 py-14 flex items-center">
        <p className="text-[#949494]!">{genericVendor}</p>
      </div>

      <div className="border-r border-b border-[#333] px-8 py-14 flex items-center">
        <p className="text-[#949494]!">{legacyConsultants}</p>
      </div>

      <div className="border-b border-[#333] bg-[#5E371D] px-8 py-14 flex items-center">
        <p className="text-[#949494]!">{olioNexus}</p>
      </div>
    </>
  );
}