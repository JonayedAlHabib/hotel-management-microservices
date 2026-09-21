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

// amenities comes back from the API as an object like { wifi: true, pool: true },
// not an array — this turns the checked keys into display labels, falling back
// to the raw key for anything outside the fixed list above.
function amenityLabels(amenities) {
  if (!amenities || typeof amenities !== "object") return [];
  return Object.entries(amenities)
    .filter(([, checked]) => checked)
    .map(([key]) => AMENITY_LABELS[key] || key);
}

export { AMENITY_OPTIONS, amenityLabels };
