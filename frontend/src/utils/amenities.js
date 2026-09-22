import { Wifi, Coffee, Waves, ParkingCircle, Dumbbell, Snowflake, Tv, Wine, ConciergeBell, Eye, Laptop, Bath, Flower2 } from "lucide-react";

// Shared between the admin create-room-type form (checkboxes) and the guest
// room detail page (display labels) — one source of truth for the fixed
// amenity list, matching the backend's `amenities: { [key]: true }` shape
// (roomTypeSchema in booking-service's validate.js).
const AMENITY_OPTIONS = [
  { key: "wifi", label: "Free WiFi" },
  { key: "breakfast", label: "Breakfast" },
  { key: "pool", label: "Swimming Pool" },
  { key: "parking", label: "Free Parking" },
  { key: "gym", label: "Gym Access" },
  { key: "ac", label: "Air Conditioning" },
  { key: "tv", label: "TV" },
  { key: "minibar", label: "Mini Bar" },
  { key: "roomService", label: "Room Service" },
  { key: "seaView", label: "Sea View" },
  { key: "workDesk", label: "Work Desk" },
  { key: "bathtub", label: "Bathtub" },
  // Not part of the original 12-key set or any seeded room type yet — added
  // so the admin form can actually offer it (the backend already accepts
  // any key in this JSON column, no schema change needed) and so the guest
  // dashboard's "Spa" card has a real amenity to link/filter against once a
  // room type has it checked, instead of a dead link.
  { key: "spa", label: "Spa & Wellness" },
];

const AMENITY_LABELS = Object.fromEntries(AMENITY_OPTIONS.map((a) => [a.key, a.label]));

// A real grouping of the real 12 keys above — not a separate/fabricated
// amenity catalog. "Property" = shared hotel-wide facilities, "Room" =
// features inside the room itself. Used to split one real amenities list
// into two tabs on the guest dashboard, instead of inventing categories
// (e.g. "Hotel Services") with no backing data.
const PROPERTY_AMENITY_KEYS = ["pool", "parking", "gym", "breakfast", "roomService", "seaView", "spa"];
const ROOM_AMENITY_KEYS = ["wifi", "ac", "tv", "minibar", "workDesk", "bathtub"];

const AMENITY_ICONS = {
  wifi: Wifi,
  breakfast: Coffee,
  pool: Waves,
  parking: ParkingCircle,
  gym: Dumbbell,
  ac: Snowflake,
  tv: Tv,
  minibar: Wine,
  roomService: ConciergeBell,
  seaView: Eye,
  workDesk: Laptop,
  bathtub: Bath,
  spa: Flower2,
};

// amenities comes back from the API as an object like { wifi: true, pool: true },
// not an array — this turns the checked keys into display labels, falling back
// to the raw key for anything outside the fixed list above.
function amenityLabels(amenities) {
  if (!amenities || typeof amenities !== "object") return [];
  return Object.entries(amenities)
    .filter(([, checked]) => checked)
    .map(([key]) => AMENITY_LABELS[key] || key);
}

// Same idea as amenityLabels, but keeps the key/icon around too — used
// anywhere the amenity needs an icon next to it (e.g. the room detail page's
// amenities grid), not just plain text.
function amenityEntries(amenities) {
  if (!amenities || typeof amenities !== "object") return [];
  return Object.entries(amenities)
    .filter(([, checked]) => checked)
    .map(([key]) => ({ key, label: AMENITY_LABELS[key] || key, Icon: AMENITY_ICONS[key] || ConciergeBell }));
}

// Aggregates which amenity keys actually appear (checked) across a list of
// room types — real, live data (what the hotel actually offers somewhere),
// not the full fixed option list regardless of what's in use.
function aggregateAmenityKeys(roomTypes) {
  const keys = new Set();
  (roomTypes || []).forEach((rt) => {
    if (!rt.amenities || typeof rt.amenities !== "object") return;
    Object.entries(rt.amenities).forEach(([key, checked]) => {
      if (checked) keys.add(key);
    });
  });
  return keys;
}

export {
  AMENITY_OPTIONS,
  AMENITY_ICONS,
  amenityLabels,
  amenityEntries,
  PROPERTY_AMENITY_KEYS,
  ROOM_AMENITY_KEYS,
  aggregateAmenityKeys,
};
