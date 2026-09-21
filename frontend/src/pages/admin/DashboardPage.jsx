import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-navy-50 text-navy-400 border-navy-100",
  EXPIRED: "bg-navy-50 text-navy-400 border-navy-100",
  NO_SHOW: "bg-red-50 text-red-700 border-red-200",
};

// PAGE_SIZE is fixed server-side (20) — walked here page by page, capped at 10
// pages (200 reservations), so the dashboard stays a real aggregate over
// actual data without an unbounded fetch loop.
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

function isToday(iso) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
  );
}

export default function DashboardPage() {
  const [rooms, setRooms] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [roomsRes, allReservations] = await Promise.all([
          bookingApi.get("/rooms"),
          fetchAllReservations(),
        ]);
        setRooms(roomsRes.data.data.rooms);
        setReservations(allReservations);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load dashboard data");
      }
    }
    load();
  }, []);

  const totalRooms = rooms?.length ?? 0;
  const occupiedRooms = rooms?.filter((r) => r.status === "OCCUPIED").length ?? 0;
  const totalRevenue =
    reservations?.filter((r) => r.status === "CONFIRMED").reduce((sum, r) => sum + r.totalAmount, 0) ?? 0;
  const bookingsToday = reservations?.filter((r) => isToday(r.createdAt)).length ?? 0;

  const recent = reservations?.slice(0, 6) ?? [];

  const loading = rooms === null || reservations === null;

  return (
    <div className="px-6 py-6 space-y-6 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Welcome Back, Admin!</h1>
        <p className="text-sm text-navy-400 mt-1">Here's what's happening at your hotel today.</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Rooms" value={loading ? "…" : totalRooms} />
        <StatCard label="Occupied" value={loading ? "…" : occupiedRooms} />
        <StatCard label="Total Revenue" value={loading ? "…" : formatMoney(totalRevenue)} accent />
        <StatCard label="Bookings Today" value={loading ? "…" : bookingsToday} />
      </div>

      <div className="bg-white rounded-2xl border border-navy-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-navy-900">Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-sm text-bronze-600 font-medium hover:text-bronze-700">
            See all →
          </Link>
        </div>

        {loading && <p className="text-sm text-navy-400">Loading…</p>}
        {!loading && recent.length === 0 && <p className="text-sm text-navy-400">No bookings yet.</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-navy-400 border-b border-navy-100">
                <th className="py-2 font-medium">Guest Name</th>
                <th className="py-2 font-medium">Room</th>
                <th className="py-2 font-medium">Check In</th>
                <th className="py-2 font-medium">Check Out</th>
                <th className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-b border-navy-50 last:border-0">
                  <td className="py-2.5 text-navy-800">{r.guest.fullName}</td>
                  <td className="py-2.5 text-navy-600">{r.roomType.name}</td>
                  <td className="py-2.5 text-navy-600">{r.checkIn.slice(0, 10)}</td>
                  <td className="py-2.5 text-navy-600">{r.checkOut.slice(0, 10)}</td>
                  <td className="py-2.5">
                    <span
                      className={`text-xs font-medium border rounded-full px-2.5 py-1 ${STATUS_STYLES[r.status] || ""}`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5">
      <p className="text-xs text-navy-400">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${accent ? "text-bronze-600" : "text-navy-900"}`}>{value}</p>
    </div>
  );
}
