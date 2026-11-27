import { Thermometer, Activity, Clock } from "lucide-react";

const STATUS_STYLES = {
  running: {
    label: "Running",
    badge: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/30",
    dot: "bg-[#22C55E]",
  },
  idle: {
    label: "Idle",
    badge: "bg-[#EAB308]/15 text-[#EAB308] border-[#EAB308]/30",
    dot: "bg-[#EAB308]",
  },
  fault: {
    label: "Fault",
    badge: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30",
    dot: "bg-[#EF4444]",
  },
};

function MachineCard({ machine, isSelected, onSelect }) {
  const statusStyle = STATUS_STYLES[machine.status] || STATUS_STYLES.idle;
  const formattedTimestamp = new Date(machine.lastUpdated).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(machine);
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => onSelect(machine)}
      onKeyDown={handleKeyDown}
      aria-pressed={isSelected}
      aria-label={`Inspect ${machine.name} (${machine.id})`}
      className={`flex cursor-pointer flex-col justify-between rounded-lg border bg-[#1E293B] p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB] ${
        isSelected
          ? "border-[#2563EB] ring-1 ring-[#2563EB]/40"
          : "border-[#334155] hover:border-[#475569]"
      }`}
    >
      {/* Card Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block rounded border border-[#334155] bg-[#101827] px-2 py-0.5 font-mono text-xs text-[#94A3B8]">
            {machine.id}
          </span>
          <h3 className="mt-2 text-base font-semibold text-[#F8FAFC]">
            {machine.name}
          </h3>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyle.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`} />
          {statusStyle.label}
        </span>
      </div>

      {/* Telemetry Metrics */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#334155] pt-4">
        <div className="rounded-md border border-[#334155]/70 bg-[#101827]/70 p-3">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <Thermometer className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>Temperature</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-[#F8FAFC]">
            {machine.temperature} °C
          </p>
        </div>

        <div className="rounded-md border border-[#334155]/70 bg-[#101827]/70 p-3">
          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
            <Activity className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>Vibration</span>
          </div>
          <p className="mt-1 text-lg font-semibold text-[#F8FAFC]">
            {machine.vibration} mm/s
          </p>
        </div>
      </div>

      {/* Timestamp */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-[#94A3B8]">
        <Clock className="h-3.5 w-3.5 shrink-0 text-[#94A3B8]" />
        <span>Updated: {formattedTimestamp}</span>
      </div>
    </article>
  );
}

export default MachineCard;
