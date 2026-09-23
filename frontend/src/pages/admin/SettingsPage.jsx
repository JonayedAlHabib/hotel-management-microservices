import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./components/LogoutModal";
import bookingApi from "../../api/bookingClient";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  async function handleConfirmLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="px-6 py-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Settings</h1>
        <p className="text-sm text-navy-400 mt-1">Manage your hotel details</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SettingsCard title="Your Account" subtitle="Fetched live from GET /auth/get-me">
          <dl className="space-y-2 text-sm">
            <Row label="Name" value={user?.name} />
            <Row label="Email" value={user?.email} />
            <Row label="Phone" value={user?.phone} />
            <Row label="Role" value={user?.role} />
          </dl>
        </SettingsCard>

        <HotelConfigCard />

        <SettingsCard title="User Management" subtitle="Manage user system · Coming soon" disabled />
        <SettingsCard title="Notifications" subtitle="Choose notifications system of hotel · Coming soon" disabled />
        <SettingsCard title="Security Setting" subtitle="Change password, authentication, session timeout · Coming soon" disabled />
      </div>

      <button
        onClick={() => setLogoutOpen(true)}
        className="border border-navy-100 text-red-600 rounded-lg px-5 py-2.5 text-sm font-medium hover:bg-red-50"
      >
        Log Out
      </button>

      <LogoutModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
}

function SettingsCard({ title, subtitle, disabled, children }) {
  return (
    <div className={`bg-white rounded-2xl border border-navy-100 p-5 space-y-3 ${disabled ? "opacity-60" : ""}`}>
      <div>
        <h2 className="text-sm font-semibold text-navy-900">{title}</h2>
        <p className="text-xs text-navy-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-navy-50 pb-2">
      <dt className="text-navy-400">{label}</dt>
      <dd className="text-navy-900 font-medium">{value}</dd>
    </div>
  );
}

const EMPTY_CONFIG = {
  name: "",
  description: "",
  address: "",
  phone: "",
  email: "",
  checkInTime: "",
  checkOutTime: "",
  cancellationPolicy: "",
};

// UC-A29: content fields only (taxRateBp/amenities are a pricing-policy
// change, not editable here — see hotelConfig.controller.js).
function HotelConfigCard() {
  const [form, setForm] = useState(EMPTY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await bookingApi.get("/hotel-config");
        const c = res.data.data.hotelConfig;
        if (cancelled) return;
        setForm({
          name: c.name || "",
          description: c.description || "",
          address: c.address || "",
          phone: c.phone || "",
          email: c.email || "",
          checkInTime: c.checkInTime || "",
          checkOutTime: c.checkOutTime || "",
          cancellationPolicy: c.cancellationPolicy || "",
        });
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || "Could not load hotel configuration");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await bookingApi.patch("/hotel-config", form);
      const c = res.data.data.hotelConfig;
      setForm({
        name: c.name || "",
        description: c.description || "",
        address: c.address || "",
        phone: c.phone || "",
        email: c.email || "",
        checkInTime: c.checkInTime || "",
        checkOutTime: c.checkOutTime || "",
        cancellationPolicy: c.cancellationPolicy || "",
      });
      setSuccess("Hotel configuration updated");
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update hotel configuration");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-navy-100 p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-navy-900">Hotel Information</h2>
          <p className="text-xs text-navy-400">Shown to guests on the hotel page (UC-G06)</p>
        </div>
        {!loading && !editing && (
          <button onClick={() => setEditing(true)} className="text-xs font-medium text-navy-700 hover:underline shrink-0">
            Edit
          </button>
        )}
      </div>

      {loading && <p className="text-sm text-navy-400">Loading…</p>}

      {!loading && error && !editing && (
        <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
      )}

      {!loading && !editing && (
        <dl className="space-y-2 text-sm">
          <Row label="Name" value={form.name} />
          <Row label="Address" value={form.address} />
          <Row label="Phone" value={form.phone} />
          <Row label="Email" value={form.email} />
          <Row label="Check-in" value={form.checkInTime} />
          <Row label="Check-out" value={form.checkOutTime} />
        </dl>
      )}

      {!loading && editing && (
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          {error && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
          {success && <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{success}</div>}

          <ConfigField label="Name" name="name" value={form.name} onChange={handleChange} />
          <ConfigField label="Description" name="description" value={form.description} onChange={handleChange} textarea />
          <ConfigField label="Address" name="address" value={form.address} onChange={handleChange} />
          <ConfigField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <ConfigField label="Email" name="email" value={form.email} onChange={handleChange} />
          <div className="grid grid-cols-2 gap-3">
            <ConfigField label="Check-in (HH:mm)" name="checkInTime" value={form.checkInTime} onChange={handleChange} placeholder="14:00" />
            <ConfigField label="Check-out (HH:mm)" name="checkOutTime" value={form.checkOutTime} onChange={handleChange} placeholder="12:00" />
          </div>
          <ConfigField
            label="Cancellation Policy"
            name="cancellationPolicy"
            value={form.cancellationPolicy}
            onChange={handleChange}
            textarea
          />

          <div className="flex gap-2 pt-1">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-navy-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-navy-800 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={saving}
              className="border border-navy-100 text-navy-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-navy-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function ConfigField({ label, name, value, onChange, placeholder, textarea }) {
  const className =
    "w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-navy-200 focus:border-navy-300";
  return (
    <div>
      <label className="block text-xs font-medium text-navy-500 mb-1">{label}</label>
      {textarea ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={2} className={className} />
      ) : (
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} />
      )}
    </div>
  );
}
