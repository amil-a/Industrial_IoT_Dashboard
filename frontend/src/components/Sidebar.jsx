import { Factory, LayoutDashboard, Cpu, Settings, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "machines", label: "Machines", icon: Cpu, active: false },
  { id: "settings", label: "Settings", icon: Settings, active: false },
];

function SidebarContent({ onClose }) {
  return (
    <div className="flex h-full flex-col bg-[#111C2E] border-r border-[#334155]">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#334155]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2563EB] text-[#F8FAFC]">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-base font-semibold tracking-tight text-[#F8FAFC]">
              PlantMonitor
            </span>
            <span className="block text-xs text-[#94A3B8]">SCADA v2.4</span>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-md p-1.5 text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              aria-current={item.active ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#2563EB]/15 text-[#F8FAFC] border border-[#2563EB]/40"
                  : "text-[#94A3B8] border border-transparent hover:bg-[#1E293B] hover:text-[#F8FAFC]"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  item.active ? "text-[#2563EB]" : "text-[#94A3B8]"
                }`}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="border-t border-[#334155] px-5 py-4">
        <p className="text-xs font-medium text-[#94A3B8]">Control Room Node</p>
        <p className="mt-0.5 text-xs text-[#64748B]">Line A • Sector 04</p>
      </div>
    </div>
  );
}

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block lg:w-64 lg:shrink-0">
        <div className="sticky top-0 h-screen">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile / Tablet Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative z-10 w-64 max-w-full h-full">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
