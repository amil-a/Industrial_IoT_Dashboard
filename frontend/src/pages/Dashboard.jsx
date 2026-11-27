import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMachines } from "../features/machines/machinesSlice";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SummaryCards from "../components/SummaryCards";
import FilterBar from "../components/FilterBar";
import MachineGrid from "../components/MachineGrid";

function Dashboard() {
  const dispatch = useDispatch();
  const { machines, loading, error } = useSelector((state) => state.machines);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuToggle={() => setMobileMenuOpen((prev) => !prev)} />

        <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
          <SummaryCards machines={machines} />

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
          />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
