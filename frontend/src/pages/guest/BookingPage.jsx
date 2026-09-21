import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { useAuth } from "../../context/AuthContext";
import { formatMoney } from "../../utils/money";

const today = new Date().toISOString().slice(0, 10);
const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";

export default function BookingPage() {
  const { roomTypeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const photo = location.state?.photo;

  // Generated once per visit to this page, not per HTTP request — reused if the
  // same booking attempt needs to retry (e.g. a network blip on the payment
  // step, or the guest going back and forth between Booking and Payment),
  // matching what reservation.service.js's Idempotency-Key contract expects:
  // one key per logical booking attempt, never a fresh one per request.
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const [dates, setDates] = useState({ checkIn: "", checkOut: "", guestCount: 1 });
  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState("");

  const [form, setForm] = useState({
    guestName: user?.name || "",
    guestPhone: user?.phone || "",
    guestEmail: user?.email || "",
    specialRequest: "",
  });

  const { checkIn, checkOut, guestCount } = dates;
  const hasDates = checkIn && checkOut;

  useEffect(() => {
    if (!hasDates) return;

    let cancelled = false;
    async function loadAvailability() {
      setChecking(true);
      setCheckError("");
      try {
        const res = await bookingApi.get("/availability", { params: { roomTypeId, checkIn, checkOut, guestCount } });
        if (!cancelled) setAvailability(res.data.data);
      } catch (err) {
        if (!cancelled) {
          setAvailability(null);
          setCheckError(err.response?.data?.message || "Could not check availability");
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    loadAvailability();
    return () => {
      cancelled = true;
    };
  }, [roomTypeId, checkIn, checkOut, guestCount, hasDates]);

  function handleDateChange(e) {
    setDates({ ...dates, [e.target.name]: e.target.value });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleContinue(e) {
    e.preventDefault();
    navigate(`/rooms/${roomTypeId}/payment`, {
      state: {
        roomTypeId,
        checkIn,
        checkOut,
        guestCount: Number(guestCount),
        form,
        idempotencyKey,
        roomType,
        nights,
        estimatedSubtotal,
        photo,
      },
    });
  }

  const canConfirm = hasDates && availability?.available && !checking;
  const roomType = hasDates ? availability?.roomType : null;
  const nights = roomType ? availability.nights : 0;
  const estimatedSubtotal = roomType ? nights * roomType.basePrice : 0;

  return (
    <div className="px-6 py-6 max-w-5xl">
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-navy-900">Room Booking</h1>
        <p className="text-sm text-navy-400 mt-1">Fill in your details to confirm your booking</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px] items-start">
        <form onSubmit={handleContinue} className="bg-white rounded-2xl border border-navy-100 p-6 space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-navy-900 mb-3">Guest details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full name" name="guestName" value={form.guestName} onChange={handleChange} required />
              <Field label="Email address" name="guestEmail" type="email" value={form.guestEmail} onChange={handleChange} />
              <Field label="Phone number" name="guestPhone" value={form.guestPhone} onChange={handleChange} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="Check-in date"
              name="checkIn"
              type="date"
              min={today}
              value={checkIn}
              onChange={handleDateChange}
              required
            />
            <Field
              label="Check-out date"
              name="checkOut"
              type="date"
              min={checkIn || today}
              value={checkOut}
              onChange={handleDateChange}
              required
            />
            <Field
              label="Number of guests"
              name="guestCount"
              type="number"
              min={1}
              value={guestCount}
              onChange={handleDateChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-700 mb-1">Special requests (optional)</label>
            <textarea
              name="specialRequest"
              maxLength={500}
              value={form.specialRequest}
              onChange={handleChange}
              rows={3}
              className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
            />
          </div>

          {checkError && <p className="text-sm text-red-600">{checkError}</p>}
          {hasDates && !checking && availability && !availability.available && (
            <p className="text-sm text-red-600">Sorry, this room is not available for these dates.</p>
          )}

          <button
            type="submit"
            disabled={!canConfirm}
            className="w-full bg-navy-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-navy-900 disabled:opacity-50"
          >
            Continue to Payment
          </button>
        </form>

        <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
          {photo && (
            <div className="h-32 bg-navy-50">
              <img src={`${BOOKING_API_URL}${photo.url}`} alt="" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="p-6 space-y-4">
            <h2 className="text-sm font-semibold text-navy-900">Your Selection</h2>

            {checking && <p className="text-sm text-navy-400">Checking availability…</p>}

            {!hasDates && !checking && (
              <p className="text-sm text-navy-400">Pick your dates to see a price estimate.</p>
            )}

            {roomType && (
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-navy-900">{roomType.name}</p>
                  <p className="text-xs text-navy-400">
                    {guestCount} guest(s) · {nights} night(s)
                  </p>
                </div>
                <div className="text-sm text-navy-600 space-y-1 border-t border-navy-100 pt-3">
                  <div className="flex justify-between">
                    <span>Room charge ({nights} night{nights === 1 ? "" : "s"})</span>
                    <span>{formatMoney(estimatedSubtotal)}</span>
                  </div>
                  <p className="text-xs text-navy-400">Taxes & fees calculated at confirmation</p>
                </div>
                <div className="flex justify-between border-t border-navy-100 pt-3 font-semibold text-navy-900">
                  <span>Estimated total</span>
                  <span>{formatMoney(estimatedSubtotal)}</span>
                </div>
              </div>
            )}

            <Link to={`/rooms/${roomTypeId}`} className="block text-xs text-bronze-600 font-medium hover:text-bronze-700">
              ← Back to room details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required, min }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        min={min}
        className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
      />
    </div>
  );
}
