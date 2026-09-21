import { useEffect, useState } from "react";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-navy-50 text-navy-400 border-navy-100",
  EXPIRED: "bg-navy-50 text-navy-400 border-navy-100",
  NO_SHOW: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_FILTERS = ["ALL", "PENDING", "CONFIRMED", "CANCELLED", "EXPIRED", "NO_SHOW"];

export default function BookingsManagementPage() {
  const [reservations, setReservations] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [actingId, setActingId] = useState(null);

  async function fetchReservations() {
    const res = await bookingApi.get("/bookings", {
      params: { page, sortDir: "desc", status: status === "ALL" ? undefined : status, search: search || undefined },
    });
    return res.data.data;
  }

  async function load() {
    try {
      const data = await fetchReservations();
      setReservations(data.reservations);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || "Could not load bookings");
    }
  }

  useEffect(() => {
    async function run() {
      try {
        const data = await fetchReservations();
        setReservations(data.reservations);
        setPagination(data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load bookings");
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setPage(1);
    load();
  }

  async function handleConfirm(id) {
    setActingId(id);
    try {
      await bookingApi.patch(`/bookings/${id}/confirm`, {});
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not confirm this booking");
    } finally {
      setActingId(null);
    }
  }

  async function handleCancel(id) {
    const reason = window.prompt("Reason for cancellation (required for admin cancellations):");
    if (reason === null) return;
    setActingId(id);
    try {
      await bookingApi.patch(`/bookings/${id}/cancel`, { reason });
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not cancel this booking");
    } finally {
      setActingId(null);
    }
  }

  return (
    <div className="px-6 py-6 space-y-5 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Bookings Management</h1>
        <p className="text-sm text-navy-400 mt-1">Track the latest guest bookings</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Search name, reference, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
          />
          <button type="submit" className="bg-navy-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-navy-900">
            Search
          </button>
        </form>

        <div className="flex gap-1 bg-white border border-navy-100 rounded-xl p-1">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                status === s ? "bg-navy-800 text-white" : "text-navy-500 hover:text-navy-800"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-navy-400 border-b border-navy-100">
                <th className="py-3 px-4 font-medium">Guest Name</th>
                <th className="py-3 px-4 font-medium">Room</th>
                <th className="py-3 px-4 font-medium">Check In</th>
                <th className="py-3 px-4 font-medium">Check Out</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations === null && (
                <tr>
                  <td colSpan={7} className="py-6 px-4 text-navy-400 text-center">
                    Loading…
                  </td>
                </tr>
              )}
              {reservations?.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-6 px-4 text-navy-400 text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
              {reservations?.map((r) => (
                <tr key={r.id} className="border-b border-navy-50 last:border-0">
                  <td className="py-2.5 px-4 text-navy-800">{r.guest.fullName}</td>
                  <td className="py-2.5 px-4 text-navy-600">{r.roomType.name}</td>
                  <td className="py-2.5 px-4 text-navy-600">{r.checkIn.slice(0, 10)}</td>
                  <td className="py-2.5 px-4 text-navy-600">{r.checkOut.slice(0, 10)}</td>
                  <td className="py-2.5 px-4 text-navy-600">{formatMoney(r.totalAmount)}</td>
                  <td className="py-2.5 px-4">
                    <span className={`text-xs font-medium border rounded-full px-2.5 py-1 ${STATUS_STYLES[r.status] || ""}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="flex gap-2">
                      {r.status === "PENDING" && (
                        <button
                          onClick={() => handleConfirm(r.id)}
                          disabled={actingId === r.id}
                          className="text-xs font-medium text-green-700 hover:text-green-800 disabled:opacity-50"
                        >
                          Confirm
                        </button>
                      )}
                      {["PENDING", "CONFIRMED"].includes(r.status) && (
                        <button
                          onClick={() => handleCancel(r.id)}
                          disabled={actingId === r.id}
                          className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-navy-100 text-sm text-navy-500">
            <span>
              Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1 rounded-lg border border-navy-100 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={page >= pagination.totalPages}
                className="px-3 py-1 rounded-lg border border-navy-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
