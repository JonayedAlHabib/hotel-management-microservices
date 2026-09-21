import { useEffect, useState } from "react";
import bookingApi from "../../api/bookingClient";

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-navy-50 text-navy-400 border-navy-100",
  EXPIRED: "bg-navy-50 text-navy-400 border-navy-100",
  NO_SHOW: "bg-red-50 text-red-700 border-red-200",
};

// No standalone "list all guests" endpoint exists on booking-service — guests
// are derived here from real reservation data (GET /bookings, admin sees
// everything) rather than inventing a new backend endpoint for a UI page.
async function fetchAllReservations() {
  const all = [];
  let page = 1;
  while (true) {
    const res = await bookingApi.get("/bookings", { params: { page, sortDir: "desc" } });
    all.push(...res.data.data.reservations);
    const { totalPages } = res.data.data.pagination;
    if (page >= totalPages || page >= 10) break;
    page += 1;
  }
  return all;
}

function groupByGuest(reservations) {
  const map = new Map();
  for (const r of reservations) {
    const key = r.guest.id;
    if (!map.has(key)) {
      map.set(key, { guest: r.guest, reservations: [] });
    }
    map.get(key).reservations.push(r);
  }
  return Array.from(map.values());
}

export default function GuestListPage() {
  const [guests, setGuests] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const reservations = await fetchAllReservations();
        setGuests(groupByGuest(reservations));
      } catch (err) {
        setError(err.response?.data?.message || "Could not load guests");
      }
    }
    load();
  }, []);

  return (
    <div className="px-6 py-6 space-y-5 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Guest List</h1>
        <p className="text-sm text-navy-400 mt-1">Manage and view all hotel guests</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}
      {guests === null && !error && <p className="text-sm text-navy-400">Loading…</p>}
      {guests?.length === 0 && <p className="text-sm text-navy-400">No guests yet.</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guests?.map(({ guest, reservations }) => {
          const latest = reservations[0];
          return (
            <div key={guest.id} className="bg-white rounded-2xl border border-navy-100 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-navy-100 flex items-center justify-center text-sm font-semibold text-navy-700">
                  {guest.fullName?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-semibold text-navy-900">{guest.fullName}</p>
                  <p className="text-xs text-navy-400">{guest.phone || guest.email || "No contact info"}</p>
                </div>
              </div>

              <div className="text-xs text-navy-500 space-y-1">
                <p>
                  Check-in: <span className="text-navy-700">{latest.checkIn.slice(0, 10)}</span>
                </p>
                <p>
                  Check-out: <span className="text-navy-700">{latest.checkOut.slice(0, 10)}</span>
                </p>
                <p>
                  {reservations.length} booking{reservations.length === 1 ? "" : "s"} total
                </p>
              </div>

              <span
                className={`inline-block text-xs font-medium border rounded-full px-2.5 py-1 ${STATUS_STYLES[latest.status] || ""}`}
              >
                {latest.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
