import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BedDouble } from "lucide-react";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { AMENITY_OPTIONS } from "../../utils/amenities";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";

export default function RoomsPage() {
  const [roomTypes, setRoomTypes] = useState(null);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // ?amenity=<key> is set by the "More Ways to Enjoy Your Stay" cards on the
  // guest dashboard (HomePage.jsx) — a real client-side filter over the
  // already-fetched room types, not a dead link.
  const amenityFilter = searchParams.get("amenity") || "";
  const amenityLabel = AMENITY_OPTIONS.find((a) => a.key === amenityFilter)?.label;

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

  const visibleRoomTypes = amenityFilter
    ? roomTypes?.filter((r) => r.amenities?.[amenityFilter])
    : roomTypes;

  return (
    <div className="w-full bg-sand-cream min-h-full px-4 sm:px-6 py-6 space-y-5">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest-900">Rooms</h1>
        <p className="text-sm text-forest-900/50 mt-1">Browse all room types and their availability.</p>
      </div>

      {amenityFilter && (
        <div className="flex items-center gap-2 text-sm text-forest-900/70 bg-forest-50 border border-forest-900/10 rounded-lg px-3 py-2 w-fit">
          Showing rooms with <span className="font-medium text-forest-900">{amenityLabel || amenityFilter}</span>
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="text-forest-900 font-medium hover:underline"
          >
            Clear
          </button>
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}
      {roomTypes === null && !error && <p className="text-sm text-forest-900/50">Loading…</p>}
      {visibleRoomTypes?.length === 0 && <p className="text-sm text-forest-900/50">No rooms match here.</p>}

      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {visibleRoomTypes?.map((room) => {
          const photo = room.photos?.[0];
          return (
            <Link
              key={room.id}
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
                <p className="text-xs text-forest-900/50">Up to {room.maxGuests} guests</p>
                <p className="text-forest-900 font-semibold">
                  {formatMoney(room.basePrice)} <span className="text-xs font-normal text-forest-900/50">/ night</span>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
