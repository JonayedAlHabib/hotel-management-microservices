import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BedDouble,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import bookingApi from "../../api/bookingClient";
import { useAuth } from "../../context/AuthContext";
import { formatMoney } from "../../utils/money";
import { amenityEntries } from "../../utils/amenities";
import { HOTEL_ADDRESS, HOTEL_CHECK_IN, HOTEL_CHECK_OUT } from "../../config/hotel";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";
const today = new Date().toISOString().slice(0, 10);

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [room, setRoom] = useState(null);
  const [allRoomTypes, setAllRoomTypes] = useState([]);
  const [error, setError] = useState("");

  // One idempotency key per visit to this room's page — reused if the guest
  // retries the same booking attempt (e.g. a network blip), never
  // regenerated per request, matching reservation.service.js's contract.
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const [dates, setDates] = useState({ checkIn: "", checkOut: "" });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState("");

  const [form, setForm] = useState({
    guestName: user?.name || "",
    guestPhone: user?.phone || "",
    guestEmail: user?.email || "",
    specialRequest: "",
  });

  useEffect(() => {
    async function load() {
      setRoom(null);
      setError("");
      try {
        const res = await bookingApi.get(`/room-types/${id}`);
        setRoom(res.data.data.roomType);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load this room");
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    async function loadAll() {
      try {
        const res = await bookingApi.get("/room-types");
        setAllRoomTypes(res.data.data.roomTypes);
      } catch {
        // Only used to populate the "switch room type" dropdown — this
        // room's own detail already loaded independently above.
      }
    }
    loadAll();
  }, []);

  const { checkIn, checkOut } = dates;
  const guestCount = adults + children;
  const hasDates = checkIn && checkOut;

  useEffect(() => {
    if (!hasDates) return;

    let cancelled = false;
    async function loadAvailability() {
      setChecking(true);
      setCheckError("");
      try {
        const res = await bookingApi.get("/availability", { params: { roomTypeId: id, checkIn, checkOut, guestCount } });
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
  }, [id, checkIn, checkOut, guestCount, hasDates]);

  if (error) {
    return (
      <div className="px-6 py-10 max-w-md space-y-3">
        <p className="text-sm text-red-600">{error}</p>
        <Link to="/rooms" className="text-sm text-forest-700 font-medium">
          Back to rooms
        </Link>
      </div>
    );
  }

  if (!room) {
    return <p className="px-6 py-10 text-sm text-forest-900/50">Loading…</p>;
  }

  const photos = room.photos || [];
  const amenities = amenityEntries(room.amenities);
  const availableRoomType = hasDates ? availability?.roomType : null;
  const nights = availableRoomType ? availability.nights : 0;
  const estimatedSubtotal = availableRoomType ? nights * availableRoomType.basePrice : 0;
  const canSubmit = hasDates && availability?.available && !checking && form.guestName;

  function handleDateChange(e) {
    setDates({ ...dates, [e.target.name]: e.target.value });
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRoomTypeSwitch(e) {
    const newId = e.target.value;
    if (newId && newId !== id) navigate(`/rooms/${newId}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    navigate(`/rooms/${id}/payment`, {
      state: {
        roomTypeId: id,
        checkIn,
        checkOut,
        guestCount,
        form,
        idempotencyKey,
        roomType: availableRoomType,
        nights,
        estimatedSubtotal,
        photo: photos[0] || null,
      },
    });
  }

  return (
    <div className="w-full bg-sand-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <p className="text-xs text-forest-900/50">
          <Link to="/home" className="hover:text-forest-900">
            Home
          </Link>{" "}
          / <span className="text-forest-900">Room Details</span>
        </p>

        <Gallery key={id} photos={photos} roomName={room.name} />

        <div className="grid gap-6 lg:grid-cols-[1fr_340px] items-start">
          <div className="space-y-8 min-w-0">
            <div className="bg-white rounded-2xl border border-forest-900/10 p-6 space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-serif text-2xl font-semibold text-forest-900">{room.name}</h1>
                    <span className="bg-forest-900 text-sand-cream text-xs font-medium rounded-full px-3 py-1">
                      Available
                    </span>
                  </div>
                  <p className="text-sm text-forest-900/50 mt-1 flex items-center gap-1">
                    <MapPin size={13} />
                    {HOTEL_ADDRESS}
                  </p>
                </div>
                <p className="font-serif text-2xl font-semibold text-forest-900 whitespace-nowrap">
                  {formatMoney(room.basePrice)}
                  <span className="text-xs font-sans font-normal text-forest-900/50"> / night</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-5 border-t border-forest-900/10 pt-4 text-sm text-forest-900/70">
                {room.bedType && (
                  <span className="flex items-center gap-1.5">
                    <BedDouble size={16} className="text-forest-700" />
                    {room.bedType}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Users size={16} className="text-forest-700" />
                  Up to {room.maxGuests} Guest{room.maxGuests === 1 ? "" : "s"}
                </span>
              </div>
            </div>

            {room.description && (
              <section>
                <h2 className="font-serif text-lg font-semibold text-forest-900 mb-2">Overview</h2>
                <p className="text-sm text-forest-900/60 leading-relaxed">{room.description}</p>
              </section>
            )}

            {amenities.length > 0 && (
              <section>
                <h2 className="font-serif text-lg font-semibold text-forest-900 mb-4">Room Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {amenities.map(({ key, label, Icon }) => (
                    <div key={key} className="flex items-center gap-2.5 text-sm text-forest-900/70">
                      <span className="h-9 w-9 rounded-full bg-forest-50 flex items-center justify-center text-forest-800 shrink-0">
                        <Icon size={16} />
                      </span>
                      {label}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-serif text-lg font-semibold text-forest-900 mb-4">Booking Rules</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-forest-900 mb-2 flex items-center gap-1.5">
                    <Clock size={15} /> Check-in
                  </p>
                  <RuleList
                    items={[
                      `From ${HOTEL_CHECK_IN}`,
                      "A valid photo ID is required at check-in",
                      `Maximum ${room.maxGuests} guest${room.maxGuests === 1 ? "" : "s"} per room`,
                    ]}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-forest-900 mb-2 flex items-center gap-1.5">
                    <Clock size={15} /> Check-out
                  </p>
                  <RuleList
                    items={[
                      `By ${HOTEL_CHECK_OUT}`,
                      "Reservation holds your room for 30 minutes pending payment",
                      "Free cancellation any time before check-in",
                    ]}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-lg font-semibold text-forest-900 mb-4">Location</h2>
              <div className="h-56 rounded-2xl overflow-hidden border border-forest-900/10">
                <iframe
                  title="Hotel location map"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(HOTEL_ADDRESS)}&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </section>
          </div>

          <div className="lg:sticky lg:top-6">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-forest-900/10 p-5 space-y-4">
              <h2 className="font-serif text-lg font-semibold text-forest-900">Book Room</h2>

              <BookingField label="Your Name">
                <input
                  name="guestName"
                  required
                  value={form.guestName}
                  onChange={handleFormChange}
                  placeholder="Ex. John Doe"
                  className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                />
              </BookingField>

              <BookingField label="Phone Number">
                <input
                  name="guestPhone"
                  value={form.guestPhone}
                  onChange={handleFormChange}
                  placeholder="Enter phone number"
                  className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                />
              </BookingField>

              <BookingField label="Email">
                <input
                  name="guestEmail"
                  type="email"
                  value={form.guestEmail}
                  onChange={handleFormChange}
                  placeholder="Needed for your payment receipt"
                  className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                />
              </BookingField>

              <div className="grid grid-cols-2 gap-3">
                <BookingField label="Check-in Date">
                  <input
                    name="checkIn"
                    type="date"
                    min={today}
                    required
                    value={checkIn}
                    onChange={handleDateChange}
                    className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                  />
                </BookingField>
                <BookingField label="Check-out Date">
                  <input
                    name="checkOut"
                    type="date"
                    min={checkIn || today}
                    required
                    value={checkOut}
                    onChange={handleDateChange}
                    className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                  />
                </BookingField>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <BookingField label="Adults">
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                  >
                    {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </BookingField>
                <BookingField label="Children">
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                  >
                    {Array.from({ length: Math.max(0, room.maxGuests - adults) + 1 }, (_, i) => i).map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </BookingField>
              </div>

              <BookingField label="Room Type">
                <select
                  value={id}
                  onChange={handleRoomTypeSwitch}
                  className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                >
                  {allRoomTypes.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                      {rt.name}
                    </option>
                  ))}
                </select>
              </BookingField>

              <BookingField label="Special requests (optional)">
                <textarea
                  name="specialRequest"
                  maxLength={500}
                  rows={2}
                  value={form.specialRequest}
                  onChange={handleFormChange}
                  className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
                />
              </BookingField>

              {checkError && <p className="text-sm text-red-600">{checkError}</p>}
              {hasDates && !checking && availability && !availability.available && (
                <p className="text-sm text-red-600">Sorry, this room isn't available for these dates.</p>
              )}
              {checking && <p className="text-xs text-forest-900/50">Checking availability…</p>}

              {availableRoomType && (
                <div className="border-t border-forest-900/10 pt-3 space-y-1">
                  <div className="flex justify-between text-sm text-forest-900/70">
                    <span>
                      {nights} night{nights === 1 ? "" : "s"} · {guestCount} guest{guestCount === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-forest-900">
                    <span>Estimated Total</span>
                    <span>{formatMoney(estimatedSubtotal)}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Gallery({ photos, roomName }) {
  const [activePhoto, setActivePhoto] = useState(0);

  if (photos.length === 0) {
    return (
      <div className="h-72 sm:h-96 rounded-2xl bg-forest-50 border border-forest-900/10 flex items-center justify-center text-forest-200">
        <BedDouble size={48} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[96px_1fr] gap-3 h-72 sm:h-96">
      <div className="flex flex-col gap-2 overflow-y-auto">
        {photos.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActivePhoto(i)}
            className={`h-16 sm:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-colors ${
              i === activePhoto ? "border-sand-gold" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={`${BOOKING_API_URL}${p.url}`} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div className="relative rounded-2xl overflow-hidden bg-forest-50">
        <img
          src={`${BOOKING_API_URL}${photos[activePhoto].url}`}
          alt={roomName}
          className="h-full w-full object-cover"
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setActivePhoto((activePhoto - 1 + photos.length) % photos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 text-forest-900 flex items-center justify-center hover:bg-white"
              aria-label="Previous photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => setActivePhoto((activePhoto + 1) % photos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/85 text-forest-900 flex items-center justify-center hover:bg-white"
              aria-label="Next photo"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function BookingField({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-forest-900/60 mb-1">{label}</label>
      {children}
    </div>
  );
}

function RuleList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm text-forest-900/60">
          <CheckCircle2 size={15} className="text-sand-gold shrink-0 mt-0.5" />
          {item}
        </li>
      ))}
    </ul>
  );
}
