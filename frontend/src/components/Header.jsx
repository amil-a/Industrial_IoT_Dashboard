import { Menu, Clock } from "lucide-react";

function Header({ onMenuToggle }) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="border-b border-[#334155] bg-[#111C2E] px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuToggle}
            aria-label="Open navigation menu"
            className="rounded-md border border-[#334155] bg-[#1E293B] p-2 text-[#F8FAFC] hover:border-[#475569] lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#F8FAFC] sm:text-2xl">
              Machine Monitoring
            </h1>
            <p className="text-xs text-[#94A3B8] sm:text-sm">
              Industrial IoT Control Center
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-md border border-[#334155] bg-[#1E293B] px-3 py-1.5 text-xs text-[#94A3B8]">
            <Clock className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1.5 text-xs font-medium text-[#22C55E]">
            <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
            <span>System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
