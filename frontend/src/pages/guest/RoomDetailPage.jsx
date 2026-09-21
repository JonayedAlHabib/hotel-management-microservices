import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { amenityLabels } from "../../utils/amenities";

const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL || "http://localhost:4002";

export default function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [error, setError] = useState("");
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const res = await bookingApi.get(`/room-types/${id}`);
        setRoom(res.data.data.roomType);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load this room");
      }
    }
    load();
  }, [id]);

  if (error) {
    return (
      <div className="px-6 py-10 max-w-md space-y-3">
        <p className="text-sm text-red-600">{error}</p>
        <Link to="/rooms" className="text-sm text-bronze-600 font-medium">
          Back to rooms
        </Link>
      </div>
    );
  }

  if (!room) {
    return <p className="px-6 py-10 text-sm text-navy-400">Loading…</p>;
  }

  const photos = room.photos || [];
  const amenities = amenityLabels(room.amenities);

  return (
    <div className="px-6 py-6 max-w-4xl space-y-6">
      <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
        <div className="h-72 bg-navy-50 flex items-center justify-center relative">
          {photos.length > 0 ? (
            <img
              src={`${BOOKING_API_URL}${photos[activePhoto].url}`}
              alt={room.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-navy-200 text-5xl">🛏️</span>
          )}

          {photos.length > 1 && (
            <>
              <button
                onClick={() => setActivePhoto((p) => (p - 1 + photos.length) % photos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 text-navy-800 flex items-center justify-center hover:bg-white"
              >
                ‹
              </button>
              <button
                onClick={() => setActivePhoto((p) => (p + 1) % photos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 text-navy-800 flex items-center justify-center hover:bg-white"
              >
                ›
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {photos.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${i === activePhoto ? "bg-bronze-500" : "bg-white/70"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-semibold text-navy-900">{room.name}</h1>
            <p className="text-lg font-semibold text-bronze-600 whitespace-nowrap">
              {formatMoney(room.basePrice)} <span className="text-xs font-normal text-navy-400">/ night</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 border border-navy-100 rounded-xl px-4 py-3">
            {amenities.map((a) => (
              <span key={a} className="flex items-center gap-1.5 text-sm text-navy-600">
                <span className="text-base">✓</span>
                {a}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-sm text-navy-600">
              <span className="text-base">👥</span>
              {room.maxGuests} Guest{room.maxGuests === 1 ? "" : "s"}
            </span>
            {room.bedType && (
              <span className="flex items-center gap-1.5 text-sm text-navy-600">
                <span className="text-base">🛏️</span>
                {room.bedType}
              </span>
            )}
          </div>

          {room.description && (
            <div>
              <h2 className="text-sm font-semibold text-navy-900 mb-1">About this room</h2>
              <p className="text-sm text-navy-500">{room.description}</p>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => navigate(`/rooms/${room.id}/book`, { state: { photo: photos[0] || null } })}
              className="bg-navy-800 text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-navy-900"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
