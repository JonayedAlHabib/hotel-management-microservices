import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bookingApi from "../../api/bookingClient";
import { formatMoney } from "../../utils/money";
import { AMENITY_OPTIONS } from "../../utils/amenities";

import { API_BASE_URL } from "../../config/api";

const EMPTY_FORM = { name: "", description: "", basePrice: "", maxGuests: "", bedType: "" };

export default function RoomsManagementPage() {
  const [roomTypes, setRoomTypes] = useState(null);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [amenities, setAmenities] = useState({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deactivatingId, setDeactivatingId] = useState(null);
  const [uploadingId, setUploadingId] = useState(null);
  const [deletingPhotoId, setDeletingPhotoId] = useState(null);
  const fileInputRefs = useRef({});

  async function fetchRoomTypes() {
    const res = await bookingApi.get("/room-types");
    return res.data.data.roomTypes;
  }

  async function load() {
    try {
      setRoomTypes(await fetchRoomTypes());
    } catch (err) {
      setError(err.response?.data?.message || "Could not load room types");
    }
  }

  useEffect(() => {
    async function run() {
      try {
        setRoomTypes(await fetchRoomTypes());
      } catch (err) {
        setError(err.response?.data?.message || "Could not load room types");
      }
    }
    run();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleAmenity(key) {
    setAmenities({ ...amenities, [key]: !amenities[key] });
  }

  async function handleCreate(e) {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const selectedAmenities = Object.fromEntries(Object.entries(amenities).filter(([, checked]) => checked));
      await bookingApi.post("/room-types", {
        name: form.name,
        description: form.description || undefined,
        basePrice: Number(form.basePrice),
        maxGuests: Number(form.maxGuests),
        bedType: form.bedType || undefined,
        amenities: Object.keys(selectedAmenities).length > 0 ? selectedAmenities : undefined,
      });
      setModalOpen(false);
      setForm(EMPTY_FORM);
      setAmenities({});
      await load();
    } catch (err) {
      setFormError(err.response?.data?.message || "Could not create room type");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeactivate(id) {
    if (!window.confirm("Deactivate this room type? Guests will no longer be able to book it.")) return;
    setDeactivatingId(id);
    try {
      await bookingApi.patch(`/room-types/${id}/deactivate`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not deactivate this room type");
    } finally {
      setDeactivatingId(null);
    }
  }

  async function handlePhotoSelect(roomTypeId, e) {
    const files = Array.from(e.target.files || []);
    e.target.value = ""; // let the same file be re-selected later
    if (files.length === 0) return;

    setUploadingId(roomTypeId);
    setError("");
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("photos", f));
      await bookingApi.post(`/room-types/${roomTypeId}/photos`, formData);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not upload photo(s)");
    } finally {
      setUploadingId(null);
    }
  }

  async function handleDeletePhoto(roomTypeId, photoId) {
    setDeletingPhotoId(photoId);
    try {
      await bookingApi.delete(`/room-types/${roomTypeId}/photos/${photoId}`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete photo");
    } finally {
      setDeletingPhotoId(null);
    }
  }

  return (
    <div className="px-6 py-6 space-y-5 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Rooms Management</h1>
          <p className="text-sm text-navy-400 mt-1">Browse all room types and their availability</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-navy-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-navy-900"
        >
          + Add Room
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}
      {roomTypes === null && !error && <p className="text-sm text-navy-400">Loading…</p>}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roomTypes?.map((room) => {
          const photos = room.photos || [];
          const mainPhoto = photos[0];
          return (
            <div key={room.id} className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
              <div className="h-32 bg-navy-50 flex items-center justify-center overflow-hidden">
                {mainPhoto ? (
                  <img src={`${API_BASE_URL}${mainPhoto.url}`} alt={room.name} className="h-full w-full object-cover" />
                ) : (
                  <span className="text-navy-200 text-3xl">🛏️</span>
                )}
              </div>

              {photos.length > 0 && (
                <div className="flex gap-1.5 px-4 pt-3 flex-wrap">
                  {photos.map((p) => (
                    <div key={p.id} className="relative h-10 w-10 rounded-lg overflow-hidden group shrink-0">
                      <img src={`${API_BASE_URL}${p.url}`} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(room.id, p.id)}
                        disabled={deletingPhotoId === p.id}
                        className="absolute inset-0 bg-navy-900/60 text-white text-xs opacity-0 group-hover:opacity-100 flex items-center justify-center"
                        title="Delete photo"
                      >
                        {deletingPhotoId === p.id ? "…" : "×"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-navy-900">{room.name}</h3>
                    <p className="text-xs text-navy-400">Up to {room.maxGuests} guests</p>
                  </div>
                  <span className="text-xs font-medium border rounded-full px-2.5 py-1 bg-green-50 text-green-700 border-green-200 whitespace-nowrap">
                    Available
                  </span>
                </div>
                <p className="text-bronze-600 font-semibold">
                  {formatMoney(room.basePrice)} <span className="text-xs font-normal text-navy-400">/ night</span>
                </p>

                <input
                  ref={(el) => (fileInputRefs.current[room.id] = el)}
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  className="hidden"
                  onChange={(e) => handlePhotoSelect(room.id, e)}
                />
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[room.id]?.click()}
                  disabled={uploadingId === room.id || photos.length >= 10}
                  className="w-full border border-navy-100 text-navy-700 rounded-lg py-1.5 text-sm font-medium hover:bg-navy-50 disabled:opacity-50"
                >
                  {uploadingId === room.id
                    ? "Uploading…"
                    : photos.length >= 10
                      ? "Photo limit reached (10)"
                      : "Upload Photo"}
                </button>

                <Link
                  to={`/admin/room-types/${room.id}/rooms`}
                  className="block text-center border border-navy-100 text-navy-700 rounded-lg py-1.5 text-sm font-medium hover:bg-navy-50"
                >
                  Manage Rooms
                </Link>

                <button
                  onClick={() => handleDeactivate(room.id)}
                  disabled={deactivatingId === room.id}
                  className="w-full text-red-600 rounded-lg py-1.5 text-sm font-medium hover:bg-red-50 disabled:opacity-50"
                >
                  {deactivatingId === room.id ? "Deactivating…" : "Deactivate"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 px-4 py-8 overflow-y-auto">
          <form
            onSubmit={handleCreate}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-4 my-auto"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy-900">Add Room Type</h2>
              <button type="button" onClick={() => setModalOpen(false)} className="text-navy-400 hover:text-navy-700">
                ×
              </button>
            </div>

            {formError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {formError}
              </div>
            )}

            <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Description" name="description" value={form.description} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Base price (৳ minor units)"
                name="basePrice"
                type="number"
                value={form.basePrice}
                onChange={handleChange}
                required
              />
              <Field
                label="Max guests"
                name="maxGuests"
                type="number"
                value={form.maxGuests}
                onChange={handleChange}
                required
              />
            </div>
            <Field label="Bed type" name="bedType" value={form.bedType} onChange={handleChange} />

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {AMENITY_OPTIONS.map((a) => (
                  <label key={a.key} className="flex items-center gap-2 text-sm text-navy-600">
                    <input
                      type="checkbox"
                      checked={!!amenities[a.key]}
                      onChange={() => toggleAmenity(a.key)}
                      className="rounded border-navy-200 text-bronze-500 focus:ring-bronze-400"
                    />
                    {a.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-navy-800 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-navy-900 disabled:opacity-50"
            >
              {submitting ? "Creating…" : "Create Room Type"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
      />
    </div>
  );
}
