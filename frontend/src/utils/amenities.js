import { Wifi, Coffee, Waves, ParkingCircle, Dumbbell, Snowflake, Tv, Wine, ConciergeBell, Eye, Laptop, Bath } from "lucide-react";

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
];

const AMENITY_LABELS = Object.fromEntries(AMENITY_OPTIONS.map((a) => [a.key, a.label]));

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

export { AMENITY_OPTIONS, amenityLabels, amenityEntries };
