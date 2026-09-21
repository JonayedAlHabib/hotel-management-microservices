import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";

// Mirrors ROOM_STATUS_TRANSITIONS in booking-service/src/config/constants.js
// (Appendix B.2) — kept here so the UI only ever offers a legal next status.
// OCCUPIED is left out of every list on purpose: the backend always rejects
// it as a manual target (409) — it's only ever set automatically at check-in.
const ROOM_STATUS_TRANSITIONS = {
  AVAILABLE: ["RESERVED", "MAINTENANCE", "OUT_OF_SERVICE"],
  RESERVED: ["AVAILABLE", "MAINTENANCE"],
  OCCUPIED: ["DIRTY"],
  DIRTY: ["CLEANING", "MAINTENANCE"],
  CLEANING: ["AVAILABLE", "MAINTENANCE"],
  MAINTENANCE: ["DIRTY", "OUT_OF_SERVICE"],
  OUT_OF_SERVICE: ["DIRTY"],
};

const STATUS_STYLES = {
  AVAILABLE: "bg-green-50 text-green-700 border-green-200",
  RESERVED: "bg-amber-50 text-amber-700 border-amber-200",
  OCCUPIED: "bg-red-50 text-red-700 border-red-200",
  DIRTY: "bg-navy-50 text-navy-500 border-navy-100",
  CLEANING: "bg-blue-50 text-blue-700 border-blue-200",
  MAINTENANCE: "bg-orange-50 text-orange-700 border-orange-200",
  OUT_OF_SERVICE: "bg-navy-50 text-navy-400 border-navy-100",
};

export default function RoomUnitsPage() {
  const { id: roomTypeId } = useParams();

  const [roomType, setRoomType] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ roomNumber: "", floor: "" });
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actingId, setActingId] = useState(null);

  async function fetchRooms() {
    const res = await bookingApi.get("/rooms", { params: { roomTypeId } });
    return res.data.data.rooms;
  }

  async function load() {
    try {
      setRooms(await fetchRooms());
    } catch (err) {
      setError(err.response?.data?.message || "Could not load rooms");
    }
  }

  useEffect(() => {
    async function run() {
      try {
        const [roomTypeRes, roomsData] = await Promise.all([
          bookingApi.get(`/room-types/${roomTypeId}`).catch(() => null),
          fetchRooms(),
        ]);
        setRoomType(roomTypeRes?.data.data.roomType ?? null);
        setRooms(roomsData);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load rooms");
      }
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomTypeId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleAddRoom(e) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      await bookingApi.post("/rooms", {
        roomTypeId,
        roomNumber: form.roomNumber,
        floor: form.floor ? Number(form.floor) : undefined,
      });
      setForm({ roomNumber: "", floor: "" });
      await load();
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not add this room");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusChange(roomId, status) {
    setActingId(roomId);
    setError("");
    try {
      await bookingApi.patch(`/rooms/${roomId}/status`, { status });
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not change room status");
    } finally {
      setActingId(null);
    }
  }

  async function handleToggleActive(room) {
    setActingId(room.id);
    setError("");
    try {
      await bookingApi.patch(`/rooms/${room.id}/${room.isActive ? "deactivate" : "reactivate"}`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not update this room");
    } finally {
      setActingId(null);
    }
  }

  return (
    <div className="px-6 py-6 space-y-5 max-w-4xl">
      <div>
        <Link to="/admin/rooms" className="text-sm text-bronze-600 font-medium hover:text-bronze-700">
          ← Back to Rooms Management
        </Link>
        <h1 className="text-xl font-semibold text-navy-900 mt-2">
          {roomType ? `${roomType.name} — Rooms` : "Manage Rooms"}
        </h1>
        <p className="text-sm text-navy-400 mt-1">Add room numbers and manage their status for this room type</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <form onSubmit={handleAddRoom} className="bg-white rounded-2xl border border-navy-100 p-5 flex flex-wrap items-end gap-3">
        {formError && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 w-full">
            {formError}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">Room Number</label>
          <input
            name="roomNumber"
            value={form.roomNumber}
            onChange={handleChange}
            required
            className="border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy-700 mb-1">Floor (optional)</label>
          <input
            name="floor"
            type="number"
            value={form.floor}
            onChange={handleChange}
            className="border border-navy-100 rounded-lg px-3 py-2 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-navy-800 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-navy-900 disabled:opacity-50"
        >
          {submitting ? "Adding…" : "+ Add Room"}
        </button>
      </form>

      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-navy-400 border-b border-navy-100">
              <th className="py-3 px-4 font-medium">Room Number</th>
              <th className="py-3 px-4 font-medium">Floor</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Active</th>
              <th className="py-3 px-4 font-medium">Change Status</th>
              <th className="py-3 px-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {rooms === null && (
              <tr>
                <td colSpan={6} className="py-6 px-4 text-center text-navy-400">
                  Loading…
                </td>
              </tr>
            )}
            {rooms?.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 px-4 text-center text-navy-400">
                  No rooms added yet for this type.
                </td>
              </tr>
            )}
            {rooms?.map((room) => (
              <tr key={room.id} className="border-b border-navy-50 last:border-0">
                <td className="py-2.5 px-4 text-navy-800 font-medium">{room.roomNumber}</td>
                <td className="py-2.5 px-4 text-navy-600">{room.floor ?? "—"}</td>
                <td className="py-2.5 px-4">
                  <span className={`text-xs font-medium border rounded-full px-2.5 py-1 ${STATUS_STYLES[room.status] || ""}`}>
                    {room.status}
                  </span>
                </td>
                <td className="py-2.5 px-4 text-navy-600">{room.isActive ? "Yes" : "No"}</td>
                <td className="py-2.5 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {(ROOM_STATUS_TRANSITIONS[room.status] || []).map((next) => (
                      <button
                        key={next}
                        onClick={() => handleStatusChange(room.id, next)}
                        disabled={actingId === room.id}
                        className="text-xs border border-navy-100 text-navy-600 rounded-full px-2.5 py-1 hover:bg-navy-50 disabled:opacity-50"
                      >
                        → {next}
                      </button>
                    ))}
                  </div>
                </td>
                <td className="py-2.5 px-4">
                  <button
                    onClick={() => handleToggleActive(room)}
                    disabled={actingId === room.id}
                    className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    {room.isActive ? "Deactivate" : "Reactivate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
