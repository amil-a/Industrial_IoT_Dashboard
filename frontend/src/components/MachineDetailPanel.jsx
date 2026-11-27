import { useEffect, useState } from "react";
import {
  X,
  Thermometer,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

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

function MachineDetailPanel({
  machine,
  updating,
  updateError,
  onClose,
  onAcknowledgeFault,
}) {
  const [successMessage, setSuccessMessage] = useState("");

  // Clear local notification when switching to a different machine
  useEffect(() => {
    setSuccessMessage("");
  }, [machine?.id]);

  // Allow closing with Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!machine) return null;

  const statusStyle = STATUS_STYLES[machine.status] || STATUS_STYLES.idle;
  const formattedTimestamp = new Date(machine.lastUpdated).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleAcknowledge = async () => {
    setSuccessMessage("");
    const succeeded = await onAcknowledgeFault(machine.id);
    if (succeeded) {
      setSuccessMessage(
        `Fault acknowledged for ${machine.name}. Status changed to idle.`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Machine details for ${machine.name}`}
        className="animate-slide-in-right relative z-10 flex h-full w-full flex-col border-l border-[#334155] bg-[#111C2E] shadow-2xl sm:max-w-md"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#334155] px-6 py-5">
          <div>
            <span className="inline-block rounded border border-[#334155] bg-[#101827] px-2 py-0.5 font-mono text-xs text-[#94A3B8]">
              {machine.id}
            </span>
            <h2 className="mt-2 text-lg font-semibold text-[#F8FAFC]">
              {machine.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close detail panel"
            className="rounded-md border border-[#334155] bg-[#1E293B] p-2 text-[#94A3B8] hover:border-[#475569] hover:text-[#F8FAFC] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {/* Status Section */}
          <div className="rounded-lg border border-[#334155] bg-[#1E293B] p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Current Status
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${statusStyle.badge}`}
              >
                <span className={`h-2 w-2 rounded-full ${statusStyle.dot}`} />
                {statusStyle.label}
              </span>
            </div>
          </div>

          {/* Success Notification */}
          {successMessage && (
            <div
              role="status"
              className="flex items-start gap-2.5 rounded-lg border border-[#22C55E]/40 bg-[#22C55E]/10 p-3.5 text-sm text-[#22C55E]"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Notification */}
          {updateError && (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 p-3.5 text-sm text-[#EF4444]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-medium">Failed to acknowledge fault</p>
                <p className="mt-0.5 text-xs text-[#F8FAFC]/80">{updateError}</p>
              </div>
            </div>
          )}

          {/* Telemetry Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
              Telemetry Readings
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[#334155] bg-[#1E293B] p-4">
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Thermometer className="h-4 w-4 text-[#94A3B8]" />
                  <span>Temperature</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-[#F8FAFC]">
                  {machine.temperature} °C
                </p>
              </div>

              <div className="rounded-lg border border-[#334155] bg-[#1E293B] p-4">
                <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                  <Activity className="h-4 w-4 text-[#94A3B8]" />
                  <span>Vibration</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-[#F8FAFC]">
                  {machine.vibration} mm/s
                </p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="rounded-lg border border-[#334155] bg-[#1E293B] p-4">
            <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <Clock className="h-4 w-4 text-[#94A3B8]" />
              <span>Last Updated</span>
            </div>
            <p className="mt-1.5 text-sm font-medium text-[#F8FAFC]">
              {formattedTimestamp}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#334155] px-6 py-4">
          {machine.status === "fault" ? (
            <button
              type="button"
              onClick={handleAcknowledge}
              disabled={updating}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#2563EB] px-4 py-2.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Acknowledging Fault...</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  <span>Acknowledge Fault</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-md border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-sm font-medium text-[#F8FAFC] transition-colors hover:border-[#475569]"
            >
              Close Panel
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}

export default MachineDetailPanel;
