import { Search, RotateCcw } from "lucide-react";

function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onReset,
  totalCount,
  filteredCount,
}) {
  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  return (
    <section
      aria-label="Filter machines"
      className="rounded-lg border border-[#334155] bg-[#1E293B] p-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by machine name..."
              aria-label="Search by machine name"
              className="w-full rounded-md border border-[#334155] bg-[#101827] py-2 pl-9 pr-3 text-sm text-[#F8FAFC] placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none"
            />
          </div>

          {/* Status Filter Dropdown */}
          <div className="sm:w-44">
            <select
              value={statusFilter}
              onChange={(e) => onStatusChange(e.target.value)}
              aria-label="Filter by machine status"
              className="w-full rounded-md border border-[#334155] bg-[#101827] px-3 py-2 text-sm text-[#F8FAFC] focus:border-[#2563EB] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="running">Running</option>
              <option value="idle">Idle</option>
              <option value="fault">Fault</option>
            </select>
          </div>

          {/* Clear / Reset Button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center gap-1.5 rounded-md border border-[#334155] bg-[#101827] px-3 py-2 text-sm font-medium text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <p className="text-xs text-[#94A3B8]">
          Showing <span className="font-medium text-[#F8FAFC]">{filteredCount}</span> of{" "}
          <span className="font-medium text-[#F8FAFC]">{totalCount}</span> machines
        </p>
      </div>
    </section>
  );
}

export default FilterBar;
