import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { useAuth } from "../../context/AuthContext";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";

const AMENITIES = [
  { icon: "📶", label: "Free WiFi" },
  { icon: "🍽️", label: "Restaurant" },
  { icon: "🅿️", label: "Free Parking" },
  { icon: "🏊", label: "Swimming Pool" },
  { icon: "💪", label: "Gym Access" },
];

// Marketing copy, not booking data — same treatment a hotel's own site gives a
// seasonal promo banner. Always links through to real, live room data
// (/rooms), never a fabricated discount code or price.
const PROMOTIONS = [
  { title: "Weekend Getaway", body: "Book 2 nights and enjoy a relaxed weekend stay.", icon: "🌅" },
  { title: "Stay 3, Pay 2 Nights", body: "Longer stays go further — ask at booking.", icon: "🗓️" },
  { title: "Free Breakfast Included", body: "Every stay includes complimentary breakfast.", icon: "🥐" },
];

export default function HomePage() {
  const { user } = useAuth();
  const [roomTypes, setRoomTypes] = useState(null);
  const [error, setError] = useState("");

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

  const heroPhoto = roomTypes?.find((r) => r.photos?.length)?.photos?.[0];

  return (
    <div className="w-full px-6 py-6 space-y-8">
      <section className="rounded-2xl overflow-hidden relative text-white min-h-80 flex items-center">
        <div className="absolute inset-0 bg-navy-900">
          {heroPhoto && (
            <img src={`${BOOKING_API_URL}${heroPhoto.url}`} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-navy-900 via-navy-900/75 to-navy-900/20" />
        <div className="relative px-8 py-10">
          <p className="text-bronze-400 text-sm mb-1">Welcome{user?.name ? `, ${user.name}` : ""}</p>
          <h1 className="text-3xl font-semibold max-w-md">Discover Comfort, Experience Luxury</h1>
          <p className="text-white/70 mt-2 max-w-md text-sm">
            Book your perfect stay from our wide range of rooms and world-class hospitality.
          </p>
          <Link
            to="/rooms"
            className="inline-block mt-5 bg-bronze-500 text-navy-900 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-bronze-400"
          >
            Browse Rooms
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-navy-900">Featured Rooms</h2>
          <Link to="/rooms" className="text-sm text-bronze-600 font-medium hover:text-bronze-700">
            View all rooms →
          </Link>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {error}
          </div>
        )}
        {roomTypes === null && !error && <p className="text-sm text-navy-400">Loading…</p>}
        {roomTypes?.length === 0 && <p className="text-sm text-navy-400">No rooms available yet.</p>}

        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {roomTypes?.slice(0, 6).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-navy-900 mb-3">Special Promotions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {PROMOTIONS.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl border border-navy-100 p-5 space-y-1">
              <span className="text-2xl">{p.icon}</span>
              <p className="font-semibold text-navy-900 text-sm">{p.title}</p>
              <p className="text-xs text-navy-400">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-navy-100 p-6">
        <h2 className="text-lg font-semibold text-navy-900 mb-4">Popular Amenities</h2>
        <div className="flex flex-wrap gap-6">
          {AMENITIES.map((a) => (
            <div key={a.label} className="flex items-center gap-2 text-sm text-navy-600">
              <span className="text-xl">{a.icon}</span>
              {a.label}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function RoomCard({ room }) {
  const photo = room.photos?.[0];
  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/rooms/${room.id}`} className="h-48 bg-navy-50 flex items-center justify-center overflow-hidden">
        {photo ? (
          <img src={`${BOOKING_API_URL}${photo.url}`} alt={room.name} className="h-full w-full object-cover" />
        ) : (
          <span className="text-navy-200 text-3xl">🛏️</span>
        )}
      </Link>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-navy-900">{room.name}</h3>
        <p className="text-xs text-navy-400">Up to {room.maxGuests} guests</p>
        <div className="flex items-center justify-between">
          <p className="text-bronze-600 font-semibold text-sm">
            {formatMoney(room.basePrice)} <span className="text-xs font-normal text-navy-400">/ night</span>
          </p>
          <Link
            to={`/rooms/${room.id}`}
            className="text-xs font-medium border border-navy-200 text-navy-700 rounded-full px-3 py-1.5 hover:bg-navy-50"
          >
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
