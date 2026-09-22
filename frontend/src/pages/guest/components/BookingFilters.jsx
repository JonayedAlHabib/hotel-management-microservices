import { X } from "lucide-react";

const STATUS_OPTIONS = [
  { key: "ALL", label: "All Bookings" },
  { key: "UPCOMING", label: "Upcoming" },
  { key: "COMPLETED", label: "Completed" },
  { key: "CANCELLED", label: "Cancelled" },
];

// Shared filter form — rendered as a static sidebar on desktop and inside a
// slide-in drawer on mobile (same props, same markup, just a different
// wrapper around it — see MyBookingsPage.jsx).
export default function BookingFilters({ filters, onChange, roomTypeOptions, onClose }) {
  function set(patch) {
    onChange({ ...filters, ...patch });
  }

  function reset() {
    onChange({ status: "ALL", checkInFrom: "", checkInTo: "", roomTypeName: "" });
  }

  return (
    <div className="space-y-6">
      {onClose && (
        <div className="flex items-center justify-between lg:hidden">
          <p className="font-semibold text-forest-900">Filters</p>
          <button type="button" onClick={onClose} className="text-forest-900/50 hover:text-forest-900" aria-label="Close filters">
            <X size={20} />
          </button>
        </div>
      )}

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Status</p>
        <div className="space-y-1">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => set({ status: s.key })}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.status === s.key
                  ? "bg-forest-900 text-white"
                  : "text-forest-900/70 hover:bg-forest-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Check-in Date Range</p>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-forest-900/50 mb-1">From</label>
            <input
              type="date"
              value={filters.checkInFrom}
              onChange={(e) => set({ checkInFrom: e.target.value })}
              className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </div>
          <div>
            <label className="block text-xs text-forest-900/50 mb-1">To</label>
            <input
              type="date"
              value={filters.checkInTo}
              onChange={(e) => set({ checkInTo: e.target.value })}
              className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Room Type</p>
        <select
          value={filters.roomTypeName}
          onChange={(e) => set({ roomTypeName: e.target.value })}
          className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold bg-white"
        >
          <option value="">Any Room Type</option>
          {roomTypeOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full text-center text-sm font-medium text-forest-900/60 hover:text-forest-900 border border-forest-900/15 rounded-lg py-2"
      >
        Clear Filters
      </button>
    </div>
  );
}
