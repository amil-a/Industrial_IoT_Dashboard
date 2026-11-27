import { Cpu, CheckCircle2, PauseCircle, AlertTriangle } from "lucide-react";

function SummaryCards({ machines }) {
  const totalCount = machines.length;
  const runningCount = machines.filter((m) => m.status === "running").length;
  const idleCount = machines.filter((m) => m.status === "idle").length;
  const faultCount = machines.filter((m) => m.status === "fault").length;

  const cards = [
    {
      label: "Total Machines",
      value: totalCount,
      icon: Cpu,
      iconColor: "text-[#2563EB]",
      iconBg: "bg-[#2563EB]/15 border-[#2563EB]/30",
      valueColor: "text-[#F8FAFC]",
    },
    {
      label: "Running",
      value: runningCount,
      icon: CheckCircle2,
      iconColor: "text-[#22C55E]",
      iconBg: "bg-[#22C55E]/15 border-[#22C55E]/30",
      valueColor: "text-[#22C55E]",
    },
    {
      label: "Idle",
      value: idleCount,
      icon: PauseCircle,
      iconColor: "text-[#EAB308]",
      iconBg: "bg-[#EAB308]/15 border-[#EAB308]/30",
      valueColor: "text-[#EAB308]",
    },
    {
      label: "Fault",
      value: faultCount,
      icon: AlertTriangle,
      iconColor: "text-[#EF4444]",
      iconBg: "bg-[#EF4444]/15 border-[#EF4444]/30",
      valueColor: "text-[#EF4444]",
    },
  ];

  return (
    <section aria-label="Machine summary counts" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-lg border border-[#334155] bg-[#1E293B] p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                {card.label}
              </span>
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${card.iconBg}`}
              >
                <Icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
            <p className={`mt-3 text-2xl font-semibold sm:text-3xl ${card.valueColor}`}>
              {card.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}

export default SummaryCards;
