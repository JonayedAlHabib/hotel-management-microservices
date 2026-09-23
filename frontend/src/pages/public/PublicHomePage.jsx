import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  CalendarDays,
  Users,
  BedDouble,
  MapPin,
  CalendarCheck,
  ShieldCheck,
  Headset,
  Star,
  Quote,
} from "lucide-react";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { HOTEL_NAME, HOTEL_ADDRESS } from "../../config/hotel";
import PublicNav from "./components/PublicNav";
import PublicFooter from "./components/PublicFooter";
import HeroCarousel from "./components/HeroCarousel";

import poolPhoto from "../../assets/hero/pool.jpg";
import loungePhoto from "../../assets/hero/lounge.jpg";
import restaurantPhoto from "../../assets/hero/restaurant.jpg";
import barPhoto from "../../assets/hero/bar.jpg";

import { API_BASE_URL } from "../../config/api";

const HERO_SLIDES = [
  { src: poolPhoto, alt: "Poolside at " + HOTEL_NAME },
  { src: loungePhoto, alt: "Outdoor lounge terrace" },
  { src: restaurantPhoto, alt: "Al fresco dining" },
  { src: barPhoto, alt: "The hotel bar" },
];

const FEATURES = [
  {
    icon: BedDouble,
    title: "Wide Range of Rooms",
    body: "From cozy doubles to our Honeymoon Suite, there's a room for every kind of stay.",
  },
  {
    icon: MapPin,
    title: "Prime Location",
    body: HOTEL_ADDRESS + " — close to everything you're here for.",
  },
  {
    icon: CalendarCheck,
    title: "Hassle-Free Booking",
    body: "Reserve online in minutes and get instant confirmation once payment is complete.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    body: "Your stay and your payment details are protected, every step of the way.",
  },
];

// Placeholder guest reviews — same treatment as the existing "Special
// Promotions" marketing copy on the guest HomePage: clearly editorial
// content, not fetched from any reviews backend (none exists yet).
const TESTIMONIALS = [
  {
    name: "Nusrat Jahan",
    location: "Dhaka",
    quote:
      "Booking was effortless and the room was exactly as pictured. The staff made our anniversary stay feel truly special.",
  },
  {
    name: "Rafiul Islam",
    location: "Chattogram",
    quote:
      "Clean, comfortable, and the pool area at night is stunning. Will definitely be booking again for our next trip.",
  },
  {
    name: "Farhana Ahmed",
    location: "Sylhet",
    quote:
      "From check-in to check-out, everything felt well taken care of. The breakfast alone is worth coming back for.",
  },
];

// No blog exists in this system — same honest-placeholder pattern used
// elsewhere (e.g. admin TaskManagementPage) for a section the design calls
// for but has no real backend behind yet.
const BLOG_POSTS = [
  { category: "Guest Tips", title: "5 Reasons to Book Your Stay Early This Season" },
  { category: "Local Guide", title: "A Guide to the Best Spots Near " + HOTEL_NAME },
  { category: "Hotel News", title: "Why Our Guests Keep Coming Back" },
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function PublicHomePage() {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState(null);
  const [error, setError] = useState("");

  const [search, setSearch] = useState({ checkIn: "", checkOut: "", guests: 2, roomTypeId: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

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

  // Real booking requires an account — this app's /rooms route is already
  // behind ProtectedRoute, so a logged-out visitor is bounced to /login
  // automatically and lands back on /rooms after signing in. Nothing here
  // fakes a search result.
  function handleSearchSubmit(e) {
    e.preventDefault();
    navigate("/rooms");
  }

  // No newsletter/notification endpoint exists on any service yet — this is
  // a UI-only confirmation, not persisted anywhere.
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSent(true);
  }

  return (
    <div className="bg-sand-cream font-sans">
      <PublicNav />

      <section id="home" className="relative h-[640px] sm:h-[600px] flex items-end sm:items-center">
        <HeroCarousel slides={HERO_SLIDES} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full pb-28 sm:pb-10">
          <p className="text-sand-gold text-sm font-medium tracking-wide mb-3">Welcome to {HOTEL_NAME}</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white max-w-2xl leading-tight">
            Find Comfort Where Every Stay Feels Like Home
          </h1>
          <p className="text-white/80 mt-4 max-w-md text-sm sm:text-base">
            Discover thoughtfully designed rooms, warm hospitality, and everything you need for a stay worth
            remembering.
          </p>
          <Link
            to="/rooms"
            className="inline-block mt-7 bg-sand-gold text-forest-950 rounded-full px-7 py-3 text-sm font-semibold hover:bg-sand-gold/90 transition-colors"
          >
            Explore Rooms
          </Link>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[92%] max-w-4xl bg-white rounded-2xl shadow-xl p-4 sm:p-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto_auto_auto] items-end"
        >
          <SearchField label="Check-in" icon={CalendarDays}>
            <input
              type="date"
              value={search.checkIn}
              onChange={(e) => setSearch({ ...search, checkIn: e.target.value })}
              className="w-full text-sm text-forest-900 focus:outline-none"
            />
          </SearchField>

          <SearchField label="Check-out" icon={CalendarDays}>
            <input
              type="date"
              value={search.checkOut}
              onChange={(e) => setSearch({ ...search, checkOut: e.target.value })}
              className="w-full text-sm text-forest-900 focus:outline-none"
            />
          </SearchField>

          <SearchField label="Guests" icon={Users}>
            <select
              value={search.guests}
              onChange={(e) => setSearch({ ...search, guests: Number(e.target.value) })}
              className="w-full text-sm text-forest-900 focus:outline-none bg-transparent"
            >
              {GUEST_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} Guest{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </SearchField>

          <SearchField label="Room Type" icon={BedDouble}>
            <select
              value={search.roomTypeId}
              onChange={(e) => setSearch({ ...search, roomTypeId: e.target.value })}
              className="w-full text-sm text-forest-900 focus:outline-none bg-transparent"
            >
              <option value="">Any Room Type</option>
              {roomTypes?.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </SearchField>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-forest-900 text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-forest-800 transition-colors h-fit"
          >
            <Search size={16} />
            <span className="sm:hidden lg:inline">Search</span>
          </button>
        </form>
      </section>

      <section id="rooms" className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-28 pb-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-sand-gold text-sm font-medium tracking-wide mb-2">Featured Properties</p>
            <h2 className="font-serif text-3xl font-semibold text-forest-900">Handpicked Rooms For You</h2>
          </div>
          <Link
            to="/rooms"
            className="hidden sm:block text-sm font-medium text-forest-900 hover:text-forest-700 shrink-0"
          >
            View All Rooms →
          </Link>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-6">
            {error}
          </div>
        )}
        {roomTypes === null && !error && <p className="text-sm text-forest-900/50">Loading rooms…</p>}
        {roomTypes?.length === 0 && <p className="text-sm text-forest-900/50">No rooms available yet.</p>}

        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {roomTypes?.slice(0, 6).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <p className="text-sand-gold text-sm font-medium tracking-wide mb-2">Why Choose Us</p>
        <h2 className="font-serif text-3xl font-semibold text-forest-900 max-w-lg mb-10">
          More Than Just a Place to Stay
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-forest-900/10 p-6">
              <div className="h-11 w-11 rounded-full bg-forest-50 flex items-center justify-center text-forest-800 mb-4">
                <f.icon size={20} />
              </div>
              <p className="font-semibold text-forest-900 mb-1.5">{f.title}</p>
              <p className="text-sm text-forest-900/60 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid gap-8 grid-cols-2 lg:grid-cols-4 text-center text-white">
          <StatTile icon={BedDouble} label="Room Types" value={roomTypes ? `${roomTypes.length}` : "—"} />
          <StatTile icon={MapPin} label="Location" value="Dhaka, BD" />
          <StatTile icon={Headset} label="Front Desk" value="24/7" />
          <StatTile icon={Star} label="Guest Rated" value="5★" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-sand-gold text-sm font-medium tracking-wide mb-2">Testimonials</p>
            <h2 className="font-serif text-3xl font-semibold text-forest-900">What Our Guests Say</h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-white rounded-2xl border border-forest-900/10 p-6 space-y-4">
              <Quote className="text-sand-gold" size={22} />
              <p className="text-sm text-forest-900/70 leading-relaxed">{t.quote}</p>
              <div>
                <p className="font-semibold text-forest-900 text-sm">{t.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-forest-900/50">{t.location}</span>
                  <span className="flex text-sand-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <p className="text-sand-gold text-sm font-medium tracking-wide mb-2">From the Blog</p>
          <h2 className="font-serif text-3xl font-semibold text-forest-900 mb-10">Stories & Guides</h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {BLOG_POSTS.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden">
                <div className="h-36 bg-forest-100" />
                <div className="p-5 space-y-2">
                  <span className="inline-block text-xs font-medium text-forest-700 bg-forest-100 rounded-full px-3 py-1">
                    {p.category}
                  </span>
                  <p className="font-semibold text-forest-900 text-sm leading-snug">{p.title}</p>
                  <span className="inline-block text-xs font-medium text-forest-900/60 cursor-default">
                    Coming soon
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="bg-forest-900 rounded-3xl px-6 sm:px-10 py-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <p className="text-white font-serif text-2xl font-semibold">Stay Updated</p>
            <p className="text-sand-cream/70 text-sm mt-1">
              Get the latest offers and updates from {HOTEL_NAME}, straight to your inbox.
            </p>
          </div>
          {newsletterSent ? (
            <p className="text-sand-gold text-sm font-medium">Thanks — we'll be in touch soon!</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 md:w-64 rounded-full px-4 py-2.5 text-sm text-forest-900 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-sand-gold text-forest-950 rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-sand-gold/90 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function SearchField({ label, icon: Icon, children }) {
  return (
    <div className="border border-forest-900/10 sm:border-0 sm:border-r sm:last-of-type:border-r-0 rounded-xl sm:rounded-none px-3 py-2 sm:px-3">
      <p className="text-[11px] font-medium text-forest-900/50 flex items-center gap-1.5 mb-1">
        <Icon size={12} />
        {label}
      </p>
      {children}
    </div>
  );
}

function StatTile({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon size={22} className="text-sand-gold" />
      <p className="font-serif text-2xl font-semibold">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}

function RoomCard({ room }) {
  const photo = room.photos?.[0];
  return (
    <div className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-forest-50">
        <Link to={`/rooms/${room.id}`} className="block h-full w-full">
          {photo ? (
            <img src={`${API_BASE_URL}${photo.url}`} alt={room.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-forest-200">
              <BedDouble size={32} />
            </div>
          )}
        </Link>
        <span className="absolute top-3 left-3 bg-white/95 text-forest-800 text-xs font-medium rounded-full px-3 py-1">
          Available
        </span>
      </div>
      <div className="p-4 space-y-2.5">
        <p className="font-semibold text-forest-900">{room.name}</p>
        <div className="flex items-center gap-3 text-xs text-forest-900/50">
          {room.bedType && (
            <span className="flex items-center gap-1">
              <BedDouble size={13} />
              {room.bedType}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Users size={13} />
            Up to {room.maxGuests}
          </span>
        </div>
        <div className="flex items-center justify-between pt-1">
          <p className="text-forest-900 font-semibold text-sm">
            {formatMoney(room.basePrice)} <span className="text-xs font-normal text-forest-900/50">/ night</span>
          </p>
          <Link
            to={`/rooms/${room.id}`}
            className="text-xs font-medium border border-forest-900/20 text-forest-900 rounded-full px-3.5 py-1.5 hover:bg-forest-50"
          >
            View Room
          </Link>
        </div>
      </div>
    </div>
  );
}
