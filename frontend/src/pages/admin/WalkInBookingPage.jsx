import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";

const emptyForm = {
  roomTypeId: "",
  checkIn: "",
  checkOut: "",
  guestCount: 1,
  guestName: "",
  guestPhone: "",
  guestEmail: "",
  specialRequest: "",
  source: "WALK_IN",
  confirmImmediately: true,
};

export default function WalkInBookingPage() {
  const navigate = useNavigate();
  const [idempotencyKey] = useState(() => crypto.randomUUID());
  const [roomTypes, setRoomTypes] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadRoomTypes() {
      try {
        const res = await bookingApi.get("/room-types");
        setRoomTypes(res.data.data.roomTypes || res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load room types");
      }
    }
    loadRoomTypes();
  }, []);

  const hasDates = form.roomTypeId && form.checkIn && form.checkOut;

  useEffect(() => {
    if (!hasDates) {
      setAvailability(null);
      return;
    }
    let cancelled = false;
    setChecking(true);
    setError("");
    bookingApi
      .get("/availability", {
        params: {
          roomTypeId: form.roomTypeId,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guestCount: form.guestCount || undefined,
        },
      })
      .then((res) => {
        if (!cancelled) setAvailability(res.data.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setAvailability(null);
          setError(err.response?.data?.message || "Could not check availability");
        }
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.roomTypeId, form.checkIn, form.checkOut, form.guestCount]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  }

  const nights = availability?.nights || 0;
  const estimatedTotal = availability?.available ? nights * availability.roomType.basePrice : 0;
  const canSubmit =
    hasDates && availability?.available && !checking && !submitting && form.guestName.trim().length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      await bookingApi.post(
        "/bookings",
        {
          roomTypeId: form.roomTypeId,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          guestCount: Number(form.guestCount),
          guestName: form.guestName.trim(),
          guestPhone: form.guestPhone.trim() || undefined,
          guestEmail: form.guestEmail.trim() || undefined,
          specialRequest: form.specialRequest.trim() || undefined,
          source: form.source,
          confirmImmediately: form.confirmImmediately,
        },
        { headers: { "Idempotency-Key": idempotencyKey } }
      );
      navigate("/admin/bookings");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create this booking");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="px-6 py-6 space-y-5 max-w-2xl">
      <div>
        <Link to="/admin/bookings" className="text-sm text-bronze-600 font-medium hover:text-bronze-700">
          ← Back to Bookings
        </Link>
        <h1 className="text-xl font-semibold text-navy-900 mt-2">New Walk-in / Phone Booking</h1>
        <p className="text-sm text-navy-400 mt-1">Create a reservation on behalf of a guest.</p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-navy-100 p-5 space-y-4">
        <div className="flex gap-2">
          {["WALK_IN", "PHONE"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setForm((f) => ({ ...f, source: s }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                form.source === s
                  ? "bg-navy-800 text-white border-navy-800"
                  : "text-navy-500 border-navy-100 hover:text-navy-800"
              }`}
            >
              {s === "WALK_IN" ? "Walk-in" : "Phone"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm text-navy-600 col-span-2">
            Room Type
            <select
              name="roomTypeId"
              value={form.roomTypeId}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            >
              <option value="">Select a room type…</option>
              {roomTypes?.map((rt) => (
                <option key={rt.id} value={rt.id}>
                  {rt.name} — {formatMoney(rt.basePrice)}/night
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-navy-600">
            Check In
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>
          <label className="text-sm text-navy-600">
            Check Out
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>

          <label className="text-sm text-navy-600">
            Guests
            <input
              type="number"
              name="guestCount"
              min="1"
              value={form.guestCount}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>

          <div className="text-sm">
            {checking && <span className="text-navy-400">Checking availability…</span>}
            {!checking && hasDates && availability && availability.available && (
              <span className="text-green-700">
                Available · {nights} night{nights === 1 ? "" : "s"} · {formatMoney(estimatedTotal)} total
              </span>
            )}
            {!checking && hasDates && availability && !availability.available && (
              <span className="text-red-600">Not available for these dates</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm text-navy-600 col-span-2">
            Guest Name
            <input
              type="text"
              name="guestName"
              value={form.guestName}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>
          <label className="text-sm text-navy-600">
            Phone
            <input
              type="tel"
              name="guestPhone"
              value={form.guestPhone}
              onChange={handleChange}
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>
          <label className="text-sm text-navy-600">
            Email
            <input
              type="email"
              name="guestEmail"
              value={form.guestEmail}
              onChange={handleChange}
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>
          <label className="text-sm text-navy-600 col-span-2">
            Special Request
            <textarea
              name="specialRequest"
              value={form.specialRequest}
              onChange={handleChange}
              maxLength={500}
              rows={2}
              className="mt-1 w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </label>
        </div>

        <label className="flex items-center gap-2 text-sm text-navy-600">
          <input type="checkbox" name="confirmImmediately" checked={form.confirmImmediately} onChange={handleChange} />
          Confirm immediately (skip pending/payment hold)
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className="bg-navy-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-navy-900 disabled:opacity-50"
        >
          {submitting ? "Creating…" : "Create Booking"}
        </button>
      </form>
    </div>
  );
}
