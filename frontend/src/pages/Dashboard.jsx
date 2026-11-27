import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMachines,
  updateMachineStatus,
  selectMachine,
  clearSelectedMachine,
} from "../features/machines/machinesSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import FilterBar from "../components/FilterBar";
import MachineGrid from "../components/MachineGrid";
import MachineDetailPanel from "../components/MachineDetailPanel";

function Dashboard() {
  const dispatch = useDispatch();
  const { machines, selectedMachine, loading, error, updating, updateError } =
    useSelector((state) => state.machines);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMachines());
  }, [dispatch]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const handleRetry = () => {
    dispatch(fetchMachines());
  };

  const handleNavigate = (sectionId) => {
    setActiveNav(sectionId);
    setMobileMenuOpen(false);

    if (sectionId === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "machines") {
      const machinesSection = document.getElementById("machines-section");
      machinesSection?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectMachine = (machine) => {
    dispatch(selectMachine(machine));
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    dispatch(clearSelectedMachine());
  };

  const handleAcknowledgeFault = async (machineId) => {
    try {
      await dispatch(
        updateMachineStatus({ id: machineId, status: "idle" })
      ).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch = machine.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "all" || machine.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  return (
    <div className="flex min-h-screen bg-[#101827] text-[#F8FAFC]">
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        activeNav={activeNav}
        onNavigate={handleNavigate}
        apiError={error}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuToggle={() => setMobileMenuOpen((prev) => !prev)} />

        <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          <SummaryCards machines={machines} />

          <section
            id="machines-section"
            aria-label="Machine monitoring section"
            className="scroll-mt-6 space-y-6"
          >
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onReset={handleResetFilters}
              totalCount={machines.length}
              filteredCount={filteredMachines.length}
            />

            <MachineGrid
              machines={filteredMachines}
              loading={loading}
              error={error}
              onRetry={handleRetry}
              hasActiveFilters={hasActiveFilters}
              onResetFilters={handleResetFilters}
              selectedMachineId={isPanelOpen ? selectedMachine?.id : null}
              onSelectMachine={handleSelectMachine}
            />
          </section>
        </main>
      </div>

      {isPanelOpen && selectedMachine && (
        <MachineDetailPanel
          machine={selectedMachine}
          updating={updating}
          updateError={updateError}
          onClose={handleClosePanel}
          onAcknowledgeFault={handleAcknowledgeFault}
        />
      )}
    </div>
  );
}

export default Dashboard;
