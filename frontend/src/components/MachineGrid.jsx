import { AlertCircle, RefreshCw, SearchX } from "lucide-react";
import MachineCard from "./MachineCard";

function MachineGrid({
  machines,
  loading,
  error,
  onRetry,
  hasActiveFilters,
  onResetFilters,
  selectedMachineId,
  onSelectMachine,
}) {
  if (loading) {
    return (
      <div
        aria-label="Loading machines"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {[1, 2, 3, 4].map((skeleton) => (
          <div
            key={skeleton}
            className="h-52 rounded-lg border border-[#334155] bg-[#1E293B] p-5"
          >
            <div className="h-4 w-16 rounded bg-[#334155]" />
            <div className="mt-3 h-5 w-36 rounded bg-[#334155]" />
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-16 rounded bg-[#101827]" />
              <div className="h-16 rounded bg-[#101827]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-lg border border-[#EF4444]/40 bg-[#1E293B] p-6 text-center"
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#EF4444]/15 text-[#EF4444]">
          <AlertCircle className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-[#F8FAFC]">
          Unable to load machine data
        </h3>
        <p className="mt-1 text-sm text-[#94A3B8]">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  if (machines.length === 0) {
    return (
      <div className="rounded-lg border border-[#334155] bg-[#1E293B] p-8 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#101827] text-[#94A3B8] border border-[#334155]">
          <SearchX className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-base font-semibold text-[#F8FAFC]">
          No machines found
        </h3>
        <p className="mt-1 text-sm text-[#94A3B8]">
          {hasActiveFilters
            ? "No machines match your current search or status filter."
            : "No machines are currently registered."}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 rounded-md bg-[#2563EB] px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section
      aria-label="Machines list"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4"
    >
      {machines.map((machine) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          isSelected={machine.id === selectedMachineId}
          onSelect={onSelectMachine}
        />
      ))}
    </section>
  );
}

export default MachineGrid;
