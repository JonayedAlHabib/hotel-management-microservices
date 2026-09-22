import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, MapPin, Phone, Mail, Clock, Navigation, Building2, BedDouble, Sunset, CalendarDays, Coffee } from "lucide-react";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { useAuth } from "../../context/AuthContext";
import {
  AMENITY_OPTIONS,
  AMENITY_ICONS,
  PROPERTY_AMENITY_KEYS,
  ROOM_AMENITY_KEYS,
  aggregateAmenityKeys,
} from "../../utils/amenities";
import { HOTEL_NAME, HOTEL_ADDRESS, HOTEL_PHONE, HOTEL_EMAIL, HOTEL_CHECK_IN, HOTEL_CHECK_OUT } from "../../config/hotel";
import PublicFooter from "../public/components/PublicFooter";
import fitnessPhoto from "../../assets/amenities/fitness.jpg";
import spaPhoto from "../../assets/amenities/spa.jpg";
import poolPhoto from "../../assets/amenities/pool.jpg";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";

// Facility highlight cards — editorial/marketing content, same treatment as
// PROMOTIONS below (not derived from live booking data). Each still links
// through to the real `/rooms?amenity=` filter added on RoomsPage.jsx, so a
// click isn't a dead end even for "spa" (not in any seeded room type yet —
// RoomsPage will honestly say "No rooms match here" until an admin checks
// it on a room type, rather than this page pretending it's unavailable).
const EXPERIENCE_CARDS = [
  { key: "gym", label: "Fitness Center", photo: fitnessPhoto },
  { key: "spa", label: "Spa & Wellness", photo: spaPhoto },
  { key: "pool", label: "Swimming Pool", photo: poolPhoto },
];

// Marketing copy, not booking data — same treatment a hotel's own site gives a
// seasonal promo banner. Always links through to real, live room data
// (/rooms), never a fabricated discount code or price.
const PROMOTIONS = [
  { title: "Weekend Getaway", body: "Book 2 nights and enjoy a relaxed weekend stay.", Icon: Sunset },
  { title: "Stay 3, Pay 2 Nights", body: "Longer stays go further — ask at booking.", Icon: CalendarDays },
  { title: "Free Breakfast Included", body: "Every stay includes complimentary breakfast.", Icon: Coffee },
];

const AMENITY_TABS = [
  { key: "all", label: "All" },
  { key: "property", label: "Property Amenities" },
  { key: "room", label: "Room Amenities" },
];

export default function HomePage() {
  const { user } = useAuth();
  const [roomTypes, setRoomTypes] = useState(null);
  const [error, setError] = useState("");
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [amenityTab, setAmenityTab] = useState("all");

  // Falls back to the static config/hotel.js constants until this resolves
  // (or if it fails) — the Hotel Information section always has something to
  // show, never a blank spot while loading or if booking-service is down.
  const [hotelInfo, setHotelInfo] = useState({
    name: HOTEL_NAME,
    address: HOTEL_ADDRESS,
    phone: HOTEL_PHONE,
    email: HOTEL_EMAIL,
    checkInTime: HOTEL_CHECK_IN,
    checkOutTime: HOTEL_CHECK_OUT,
    description: null,
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await bookingApi.get("/room-types");
        setRoomTypes(res.data.data.roomTypes);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load rooms right now");
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function loadHotelConfig() {
      try {
        const res = await bookingApi.get("/hotel-config");
        const c = res.data.data.hotelConfig;
        setHotelInfo({
          name: c.name,
          address: c.address,
          phone: c.phone,
          email: c.email,
          checkInTime: c.checkInTime,
          checkOutTime: c.checkOutTime,
          description: c.description,
        });
      } catch {
        // Live config unavailable — the static fallback set above stays as-is.
      }
    }
    loadHotelConfig();
  }, []);

  const heroPhoto = roomTypes?.find((r) => r.photos?.length)?.photos?.[0];

  // Real amenities actually present across the hotel's own room types — not
  // the full fixed option list regardless of what's in use.
  const presentKeys = useMemo(() => aggregateAmenityKeys(roomTypes), [roomTypes]);

  const amenityCounts = useMemo(
    () => ({
      all: presentKeys.size,
      property: [...presentKeys].filter((k) => PROPERTY_AMENITY_KEYS.includes(k)).length,
      room: [...presentKeys].filter((k) => ROOM_AMENITY_KEYS.includes(k)).length,
    }),
    [presentKeys]
  );

  const visibleAmenities = useMemo(() => {
    return AMENITY_OPTIONS.filter((a) => {
      if (!presentKeys.has(a.key)) return false;
      if (amenityTab === "property") return PROPERTY_AMENITY_KEYS.includes(a.key);
      if (amenityTab === "room") return ROOM_AMENITY_KEYS.includes(a.key);
      return true;
    });
  }, [presentKeys, amenityTab]);

  const displayedRooms = roomTypes?.slice(0, showAllRooms ? 6 : 4);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(HOTEL_ADDRESS)}`;
  // Keyless Google Maps iframe embed (the legacy `/maps?...&output=embed`
  // form, not the JS Embed API, which needs a billing-enabled key) — shows
  // the hotel's real, live location, not a screenshot of the wrong city.
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(HOTEL_ADDRESS)}&output=embed`;

  return (
    <div className="w-full bg-sand-cream">
      <div className="px-4 sm:px-6 py-6 space-y-10">
        <section className="rounded-2xl overflow-hidden relative text-white min-h-80 flex items-center">
          <div className="absolute inset-0 bg-forest-900">
            {heroPhoto && (
              <img src={`${BOOKING_API_URL}${heroPhoto.url}`} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="absolute inset-0 bg-linear-to-r from-forest-950/90 via-forest-950/70 to-forest-950/20" />
          <div className="relative px-6 sm:px-8 py-10">
            <p className="text-sand-gold text-sm mb-1">Welcome{user?.name ? `, ${user.name}` : ""}</p>
            <h1 className="font-serif text-3xl font-semibold max-w-md">Discover Comfort, Experience Luxury</h1>
            <p className="text-white/70 mt-2 max-w-md text-sm">
              Book your perfect stay from our wide range of rooms and world-class hospitality.
            </p>
            <Link
              to="/rooms"
              className="inline-block mt-5 bg-sand-gold text-forest-950 rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-sand-gold/90 transition-colors"
            >
              Browse Rooms
            </Link>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-forest-900">Featured Rooms</h2>
            <Link to="/rooms" className="text-sm text-forest-700 font-medium hover:text-forest-900">
              Browse all rooms →
            </Link>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
              {error}
            </div>
          )}
          {roomTypes === null && !error && <p className="text-sm text-forest-900/50">Loading…</p>}
          {roomTypes?.length === 0 && <p className="text-sm text-forest-900/50">No rooms available yet.</p>}

          <div className="flex flex-wrap gap-5">
            {displayedRooms?.map((room) => (
              <div key={room.id} className="flex-1 basis-72 min-w-65 max-w-sm">
                <RoomCard room={room} />
              </div>
            ))}
          </div>

          {roomTypes?.length > 4 && (
            <button
              type="button"
              onClick={() => setShowAllRooms((v) => !v)}
              className="mx-auto mt-5 flex items-center gap-1.5 text-sm font-medium text-forest-900 hover:text-forest-700"
            >
              {showAllRooms ? "View Less" : "View More"}
              <ChevronDown size={16} className={`transition-transform ${showAllRooms ? "rotate-180" : ""}`} />
            </button>
          )}
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-forest-900 mb-3">Special Promotions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {PROMOTIONS.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-forest-900/10 p-5 space-y-2">
                <span className="h-9 w-9 rounded-full bg-forest-50 flex items-center justify-center text-forest-800">
                  <p.Icon size={17} />
                </span>
                <p className="font-semibold text-forest-900 text-sm">{p.title}</p>
                <p className="text-xs text-forest-900/50">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {presentKeys.size > 0 && (
          <section className="bg-white rounded-2xl border border-forest-900/10 p-6">
            <h2 className="font-serif text-xl font-semibold text-forest-900 mb-1">Featured Amenities on Site</h2>
            <p className="text-sm text-forest-900/50 mb-5">Everything our rooms and property currently offer</p>

            <div className="flex flex-wrap gap-2 mb-5 border-b border-forest-900/10 pb-4">
              {AMENITY_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setAmenityTab(t.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    amenityTab === t.key ? "bg-forest-900 text-white" : "bg-forest-50 text-forest-900/70 hover:bg-forest-100"
                  }`}
                >
                  {t.label} ({amenityCounts[t.key]})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleAmenities.map((a) => {
                const Icon = AMENITY_ICONS[a.key];
                return (
                  <div key={a.key} className="flex items-center gap-2.5 text-sm text-forest-900/70">
                    {Icon ? (
                      <Icon size={16} className="text-forest-800 shrink-0" />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-sand-gold shrink-0" />
                    )}
                    {a.label}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="bg-forest-900 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={18} className="text-sand-gold" />
            <h2 className="font-serif text-xl font-semibold">Hotel Information</h2>
          </div>
          <p className="text-sm text-white/70 max-w-2xl mb-5">
            {hotelInfo.description ||
              `${hotelInfo.name} offers comfortable rooms, attentive service, and a convenient central location — everything you need for a relaxed stay, whether you're here for a night or a week.`}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <InfoRow icon={MapPin} label="Address" value={hotelInfo.address} />
            <InfoRow icon={Phone} label="Phone" value={hotelInfo.phone} />
            <InfoRow icon={Mail} label="Email" value={hotelInfo.email} />
            <InfoRow
              icon={Clock}
              label="Check-in / Check-out"
              value={`${hotelInfo.checkInTime} · ${hotelInfo.checkOutTime}`}
            />
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-forest-900 mb-4 text-center">
            More Ways to Enjoy Your Stay
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {EXPERIENCE_CARDS.map((c) => (
              <Link
                key={c.key}
                to={`/rooms?amenity=${c.key}`}
                className="group relative h-48 rounded-2xl overflow-hidden block"
              >
                <img src={c.photo} alt={c.label} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-linear-to-t from-forest-950/85 via-forest-950/20 to-transparent" />
                <p className="absolute bottom-4 left-4 text-white font-serif font-semibold">{c.label}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-xl font-semibold text-forest-900 mb-4">Getting Here</h2>
          <div className="grid gap-5 sm:grid-cols-[280px_1fr] bg-white rounded-2xl border border-forest-900/10 overflow-hidden">
            <div className="p-5 space-y-3">
              <p className="font-semibold text-forest-900 text-sm">{HOTEL_NAME}</p>
              <p className="text-sm text-forest-900/60 flex items-start gap-2">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                {HOTEL_ADDRESS}
              </p>
              <p className="text-sm text-forest-900/60 flex items-center gap-2">
                <Phone size={15} className="shrink-0" />
                {HOTEL_PHONE}
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-forest-900 border border-forest-900/15 rounded-full px-4 py-2 hover:bg-forest-50 mt-2"
              >
                <Navigation size={14} />
                Get Directions
              </a>
            </div>

            <iframe
              title="Hotel location map"
              src={mapEmbedUrl}
              className="h-56 sm:h-auto w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={16} className="text-sand-gold shrink-0 mt-0.5" />
      <div>
        <p className="text-white/50 text-xs">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </div>
  );
}

function RoomCard({ room }) {
  const photo = room.photos?.[0];
  return (
    <div className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/rooms/${room.id}`} className="h-44 bg-forest-50 flex items-center justify-center overflow-hidden">
        {photo ? (
          <img src={`${BOOKING_API_URL}${photo.url}`} alt={room.name} className="h-full w-full object-cover" />
        ) : (
          <BedDouble size={28} className="text-forest-200" />
        )}
      </Link>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-forest-900">{room.name}</h3>
        <p className="text-xs text-forest-900/50">Up to {room.maxGuests} guests</p>
        <div className="flex items-center justify-between">
          <p className="text-forest-900 font-semibold text-sm">
            {formatMoney(room.basePrice)} <span className="text-xs font-normal text-forest-900/50">/ night</span>
          </p>
          <Link
            to={`/rooms/${room.id}`}
            className="text-xs font-medium border border-forest-900/20 text-forest-900 rounded-full px-3 py-1.5 hover:bg-forest-50"
          >
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
