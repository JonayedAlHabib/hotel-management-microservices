import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./components/LogoutModal";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(true);
  const [logoutOpen, setLogoutOpen] = useState(false);

  async function handleConfirmLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="w-full px-6 py-6 space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-navy-900">Settings</h1>
        <p className="text-sm text-navy-400 mt-1">Manage your details</p>
      </div>

      <SettingRow
        icon="👤"
        title="Profile Setting"
        subtitle="Update your personal detail"
        expanded={profileOpen}
        onToggle={() => setProfileOpen((v) => !v)}
      >
        <dl className="px-5 pb-4 space-y-2 text-sm">
          <Row label="Name" value={user?.name} />
          <Row label="Email" value={user?.email} />
          <Row label="Phone" value={user?.phone} />
        </dl>
      </SettingRow>

      <SettingRow icon="🔒" title="Change Password" subtitle="Update your password to keep your code safe" disabled />
      <SettingRow icon="🔔" title="Notifications Preferences" subtitle="Choose what notifications you want" disabled />
      <SettingRow icon="💳" title="Payment Method" subtitle="Manage your saved payment method" disabled />

      <button
        onClick={() => setLogoutOpen(true)}
        className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-left hover:bg-red-100/60"
      >
        <span className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">🚪</span>
        <div>
          <p className="text-sm font-medium text-red-600">Log Out</p>
          <p className="text-xs text-red-400">Sign out from your account</p>
        </div>
      </button>

      <LogoutModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
}

function SettingRow({ icon, title, subtitle, expanded, onToggle, disabled, children }) {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 overflow-hidden">
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`w-full flex items-center gap-3 px-5 py-4 text-left ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-navy-50/60"
        }`}
      >
        <span className="h-9 w-9 rounded-full bg-navy-50 flex items-center justify-center text-navy-700">{icon}</span>
        <div className="flex-1">
          <p className="text-sm font-medium text-navy-900">{title}</p>
          <p className="text-xs text-navy-400">{disabled ? `${subtitle} · Coming soon` : subtitle}</p>
        </div>
        {!disabled && <span className="text-navy-300">{expanded ? "⌄" : "›"}</span>}
      </button>
      {expanded && !disabled && children}
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
