import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BedDouble, SlidersHorizontal, X } from "lucide-react";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { AMENITY_OPTIONS } from "../../utils/amenities";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";
const today = new Date().toISOString().slice(0, 10);

// Every filter this page understands lives in the URL, same treatment the
// existing ?amenity= param (set by HomePage's "More Ways to Enjoy Your Stay"
// cards) already gets — refreshing or sharing the link keeps the same results.
function readFiltersFromParams(searchParams) {
  return {
    checkIn: searchParams.get("checkIn") || "",
    checkOut: searchParams.get("checkOut") || "",
    guestCount: searchParams.get("guestCount") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedType: searchParams.get("bedType") || "",
    amenity: searchParams.get("amenity") || "",
    sortDir: searchParams.get("sortDir") || "",
  };
}

export default function RoomsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = readFiltersFromParams(searchParams);

  const [roomTypes, setRoomTypes] = useState(null); // browse mode (no dates): plain room-types list
  const [results, setResults] = useState(null); // search mode (dates set): availability results
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const hasDates = Boolean(filters.checkIn && filters.checkOut);
  const amenityLabel = AMENITY_OPTIONS.find((a) => a.key === filters.amenity)?.label;

  function setFilters(patch) {
    const next = { ...filters, ...patch };
    const params = {};
    Object.entries(next).forEach(([key, value]) => {
      if (value) params[key] = value;
    });
    setSearchParams(params);
  }

  function clearFilters() {
    setSearchParams({});
  }

  // Browse mode: no dates set — same GET /room-types call this page always made.
  useEffect(() => {
    if (hasDates) return;
    let cancelled = false;
    async function load() {
      setError("");
      try {
        const res = await bookingApi.get("/room-types");
        if (!cancelled) setRoomTypes(res.data.data.roomTypes);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Could not load rooms right now");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [hasDates]);

  // Search mode: dates set — the exact same GET /availability contract
  // RoomDetailPage.jsx already uses (bookingApi.get("/availability", { params })),
  // just without roomTypeId, which is the "search across every room type" mode
  // availability.controller.js already implements server-side.
  useEffect(() => {
    if (!hasDates) return;
    let cancelled = false;
    async function load() {
      setError("");
      setResults(null);
      try {
        const res = await bookingApi.get("/availability", {
          params: {
            checkIn: filters.checkIn,
            checkOut: filters.checkOut,
            guestCount: filters.guestCount || undefined,
            minPrice: filters.minPrice ? Number(filters.minPrice) * 100 : undefined,
            maxPrice: filters.maxPrice ? Number(filters.maxPrice) * 100 : undefined,
            bedType: filters.bedType || undefined,
            amenities: filters.amenity || undefined,
            sortDir: filters.sortDir || undefined,
          },
        });
        if (!cancelled) setResults(res.data.data.results);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Could not search availability right now");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [hasDates, filters.checkIn, filters.checkOut, filters.guestCount, filters.minPrice, filters.maxPrice, filters.bedType, filters.amenity, filters.sortDir]);

  // Browse mode still supports the older single ?amenity= client-side filter
  // over /room-types (no dates -> no server-side amenity filtering happens).
  const visibleRoomTypes = filters.amenity
    ? roomTypes?.filter((r) => r.amenities?.[filters.amenity])
    : roomTypes;

  const filtersActive =
    filters.guestCount || filters.minPrice || filters.maxPrice || filters.bedType || filters.amenity || filters.sortDir;

  return (
    <div className="w-full bg-sand-cream min-h-full">
      <div className="flex">
        <aside className="hidden lg:block w-72 shrink-0 border-r border-forest-900/10 bg-white px-5 py-6">
          <RoomFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
        </aside>

        <div className="flex-1 min-w-0 px-4 sm:px-6 py-6 space-y-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-serif text-2xl font-semibold text-forest-900">Rooms</h1>
              <p className="text-sm text-forest-900/50 mt-1">
                {hasDates ? "Rooms available for your selected dates." : "Browse all room types and their availability."}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden relative flex items-center gap-1.5 border border-forest-900/15 rounded-lg px-3 py-2 text-sm font-medium text-forest-900"
            >
              <SlidersHorizontal size={15} />
              Filters
              {filtersActive && <span className="h-1.5 w-1.5 rounded-full bg-sand-gold absolute -top-0.5 -right-0.5" />}
            </button>
          </div>

          {filters.amenity && !hasDates && (
            <div className="flex items-center gap-2 text-sm text-forest-900/70 bg-forest-50 border border-forest-900/10 rounded-lg px-3 py-2 w-fit">
              Showing rooms with <span className="font-medium text-forest-900">{amenityLabel || filters.amenity}</span>
              <button type="button" onClick={clearFilters} className="text-forest-900 font-medium hover:underline">
                Clear
              </button>
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
          )}

          {hasDates ? (
            <SearchResultsGrid results={results} />
          ) : (
            <BrowseGrid roomTypes={visibleRoomTypes} loading={roomTypes === null && !error} />
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-forest-950/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-xs bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <p className="font-semibold text-forest-900">Filters</p>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="text-forest-900/50 hover:text-forest-900" aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <RoomFilters filters={filters} onChange={setFilters} onClear={clearFilters} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full mt-5 bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium"
            >
              Show Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RoomFilters({ filters, onChange, onClear }) {
  function set(patch) {
    onChange(patch);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Dates</p>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-forest-900/50 mb-1">Check-in</label>
            <input
              type="date"
              min={today}
              value={filters.checkIn}
              onChange={(e) => set({ checkIn: e.target.value })}
              className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </div>
          <div>
            <label className="block text-xs text-forest-900/50 mb-1">Check-out</label>
            <input
              type="date"
              min={filters.checkIn || today}
              value={filters.checkOut}
              onChange={(e) => set({ checkOut: e.target.value })}
              className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Guests</p>
        <input
          type="number"
          min={1}
          value={filters.guestCount}
          onChange={(e) => set({ guestCount: e.target.value })}
          placeholder="Any"
          className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Price per night (৳)</p>
        <div className="flex gap-2">
          <input
            type="number"
            min={0}
            value={filters.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })}
            placeholder="Min"
            className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
          />
          <input
            type="number"
            min={0}
            value={filters.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })}
            placeholder="Max"
            className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Bed Type</p>
        <input
          type="text"
          value={filters.bedType}
          onChange={(e) => set({ bedType: e.target.value })}
          placeholder="e.g. King Bed"
          className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Amenity</p>
        <select
          value={filters.amenity}
          onChange={(e) => set({ amenity: e.target.value })}
          className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
        >
          <option value="">Any</option>
          {AMENITY_OPTIONS.map((a) => (
            <option key={a.key} value={a.key}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-900/40 mb-3">Sort by Price</p>
        <select
          value={filters.sortDir}
          onChange={(e) => set({ sortDir: e.target.value })}
          className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
        >
          <option value="">Default</option>
          <option value="asc">Lowest first</option>
          <option value="desc">Highest first</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-full text-center text-sm font-medium text-forest-900/60 hover:text-forest-900 border border-forest-900/15 rounded-lg py-2"
      >
        Clear Filters
      </button>
    </div>
  );
}

function BrowseGrid({ roomTypes, loading }) {
  if (loading) return <p className="text-sm text-forest-900/50">Loading…</p>;
  if (roomTypes?.length === 0) return <p className="text-sm text-forest-900/50">No rooms match here.</p>;

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {roomTypes?.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
}

function SearchResultsGrid({ results }) {
  if (results === null) return <p className="text-sm text-forest-900/50">Searching…</p>;
  if (results.length === 0) {
    return <p className="text-sm text-forest-900/50">No rooms available for these dates and filters.</p>;
  }

  return (
    <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
      {results.map((r) => (
        <RoomCard key={r.roomType.id} room={r.roomType} remaining={r.remaining} />
      ))}
    </div>
  );
}

function RoomCard({ room, remaining }) {
  const photo = room.photos?.[0];
  return (
    <Link
      to={`/rooms/${room.id}`}
      className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden hover:shadow-md transition-shadow block"
    >
      <div className="h-36 bg-forest-50 flex items-center justify-center overflow-hidden">
        {photo ? (
          <img src={`${BOOKING_API_URL}${photo.url}`} alt={room.name} className="h-full w-full object-cover" />
        ) : (
          <BedDouble size={28} className="text-forest-200" />
        )}
      </div>
      <div className="p-4 space-y-1">
        <h3 className="font-semibold text-forest-900">{room.name}</h3>
        {room.description && <p className="text-xs text-forest-900/50 line-clamp-2">{room.description}</p>}
        <p className="text-xs text-forest-900/50">
          Up to {room.maxGuests} guests
          {typeof remaining === "number" && ` · ${remaining} room${remaining === 1 ? "" : "s"} left`}
        </p>
        <p className="text-forest-900 font-semibold">
          {formatMoney(room.basePrice)} <span className="text-xs font-normal text-forest-900/50">/ night</span>
        </p>
      </div>
    </Link>
  );
}
