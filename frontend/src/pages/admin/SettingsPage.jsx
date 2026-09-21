import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./components/LogoutModal";
import {
  HOTEL_NAME,
  HOTEL_ADDRESS,
  HOTEL_PHONE,
  HOTEL_EMAIL,
  HOTEL_CURRENCY,
  HOTEL_CHECK_IN,
  HOTEL_CHECK_OUT,
} from "../../config/hotel";

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

        <SettingsCard title="Hotel Information" subtitle="Read-only for now — editing needs a backend Hotel settings model">
          <dl className="space-y-2 text-sm">
            <Row label="Name" value={HOTEL_NAME} />
            <Row label="Address" value={HOTEL_ADDRESS} />
            <Row label="Phone" value={HOTEL_PHONE} />
            <Row label="Email" value={HOTEL_EMAIL} />
            <Row label="Currency" value={HOTEL_CURRENCY} />
            <Row label="Check-in" value={HOTEL_CHECK_IN} />
            <Row label="Check-out" value={HOTEL_CHECK_OUT} />
          </dl>
        </SettingsCard>
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
