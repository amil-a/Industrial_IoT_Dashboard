import {
  Factory,
  LayoutDashboard,
  Cpu,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "machines", label: "Machines", icon: Cpu },
];

function SidebarContent({
  collapsed = false,
  onToggleCollapse,
  activeNav,
  onNavigate,
  apiError,
  onCloseMobile,
}) {
  const isOnline = !apiError;

  return (
    <div className="flex h-full flex-col border-r border-[#334155] bg-[#111C2E]">
      {/* Brand & Collapse Toggle */}
      <div
        className={`flex items-center border-b border-[#334155] py-4 ${
          collapsed ? "justify-center px-2" : "justify-between px-4"
        }`}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2563EB] text-[#F8FAFC]">
            <Factory className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <span className="block truncate text-base font-semibold tracking-tight text-[#F8FAFC]">
                PlantMonitor
              </span>
              <span className="block text-xs text-[#94A3B8]">Industrial IoT</span>
            </div>
          )}
        </div>

        {/* Desktop Collapse/Expand Button */}
        {onToggleCollapse && !collapsed && (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="hidden rounded-md p-1.5 text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC] lg:inline-flex"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="rounded-md p-1.5 text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Expand Button when Collapsed on Desktop */}
      {onToggleCollapse && collapsed && (
        <div className="hidden justify-center border-b border-[#334155] py-2.5 lg:flex">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className="rounded-md p-2 text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC]"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 px-2.5 py-5" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`group relative flex w-full items-center rounded-lg py-2.5 text-sm font-medium transition-colors ${
                collapsed ? "justify-center px-2" : "gap-3 px-3.5"
              } ${
                isActive
                  ? "border border-[#2563EB]/40 bg-[#2563EB]/15 text-[#F8FAFC]"
                  : "border border-transparent text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#F8FAFC]"
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isActive ? "text-[#2563EB]" : "text-[#94A3B8] group-hover:text-[#F8FAFC]"
                }`}
              />
              {!collapsed && <span className="truncate">{item.label}</span>}

              {/* Tooltip on hover when collapsed */}
              {collapsed && (
                <span className="pointer-events-none absolute left-full z-30 ml-2.5 hidden whitespace-nowrap rounded-md border border-[#334155] bg-[#1E293B] px-2.5 py-1 text-xs font-medium text-[#F8FAFC] shadow-lg group-hover:block">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Status Section */}
      <div
        className={`border-t border-[#334155] py-4 ${
          collapsed ? "flex justify-center px-2" : "px-4"
        }`}
        title={
          collapsed
            ? isOnline
              ? "API Connected"
              : "API Unavailable"
            : undefined
        }
      >
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full ${
              isOnline ? "bg-[#22C55E]" : "bg-[#EF4444]"
            }`}
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-[#F8FAFC]">
                {isOnline ? "API Connected" : "API Unavailable"}
              </p>
              <p className="truncate text-[11px] text-[#94A3B8]">
                App Status Indicator
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
  activeNav,
  onNavigate,
  apiError,
}) {
  return (
    <>
      {/* Desktop Collapsible Sidebar */}
      <aside
        className={`hidden shrink-0 transition-[width] duration-200 ease-in-out lg:block ${
          collapsed ? "lg:w-[75px]" : "lg:w-[250px]"
        }`}
      >
        <div className="sticky top-0 h-screen">
          <SidebarContent
            collapsed={collapsed}
            onToggleCollapse={onToggleCollapse}
            activeNav={activeNav}
            onNavigate={onNavigate}
            apiError={apiError}
          />
        </div>
      </aside>

      {/* Mobile / Tablet Drawer (always expanded) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={onClose}
            aria-hidden="true"
          />
          <aside className="relative z-10 h-full w-64 max-w-full">
            <SidebarContent
              collapsed={false}
              activeNav={activeNav}
              onNavigate={onNavigate}
              apiError={apiError}
              onCloseMobile={onClose}
            />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
