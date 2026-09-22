import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Bell, CreditCard, LogOut, ChevronDown, ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/client";
import LogoutModal from "./components/LogoutModal";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(true);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  async function handleConfirmLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="w-full bg-sand-cream min-h-full px-4 sm:px-6 py-6 space-y-4">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-forest-900">Settings</h1>
        <p className="text-sm text-forest-900/50 mt-1">Manage your details</p>
      </div>

      <SettingRow
        icon={User}
        title="Profile Setting"
        subtitle="Update your personal detail"
        expanded={profileOpen}
        onToggle={() => setProfileOpen((v) => !v)}
      >
        <ProfileForm fallbackEmail={user?.email} />
      </SettingRow>

      <SettingRow
        icon={Lock}
        title="Change Password"
        subtitle="Update your password to keep your account safe"
        expanded={passwordOpen}
        onToggle={() => setPasswordOpen((v) => !v)}
      >
        <ChangePasswordForm onChanged={handleConfirmLogout} />
      </SettingRow>

      <SettingRow icon={Bell} title="Notifications Preferences" subtitle="Choose what notifications you want" disabled />
      <SettingRow icon={CreditCard} title="Payment Method" subtitle="Manage your saved payment method" disabled />

      <button
        onClick={() => setLogoutOpen(true)}
        className="w-full flex items-center gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4 text-left hover:bg-red-100/60"
      >
        <span className="h-9 w-9 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <LogOut size={16} />
        </span>
        <div>
          <p className="text-sm font-medium text-red-600">Log Out</p>
          <p className="text-xs text-red-400">Sign out from your account</p>
        </div>
      </button>

      <LogoutModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
}

function SettingRow({ icon: Icon, title, subtitle, expanded, onToggle, disabled, children }) {
  return (
    <div className="bg-white rounded-2xl border border-forest-900/10 overflow-hidden">
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`w-full flex items-center gap-3 px-5 py-4 text-left ${
          disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-forest-50/60"
        }`}
      >
        <span className="h-9 w-9 rounded-full bg-forest-50 flex items-center justify-center text-forest-800">
          <Icon size={16} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-forest-900">{title}</p>
          <p className="text-xs text-forest-900/50">{disabled ? `${subtitle} · Coming soon` : subtitle}</p>
        </div>
        {!disabled && (expanded ? <ChevronDown size={16} className="text-forest-900/30" /> : <ChevronRight size={16} className="text-forest-900/30" />)}
      </button>
      {expanded && !disabled && children}
    </div>
  );
}

const EMPTY_PROFILE = { name: "", phone: "", address: "", nationality: "", idType: "", idNumber: "" };

function ProfileForm({ fallbackEmail }) {
  const [form, setForm] = useState(EMPTY_PROFILE);
  const [email, setEmail] = useState(fallbackEmail || "");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      try {
        const res = await apiClient.get("/auth/profile");
        const u = res.data.data.user;
        if (cancelled) return;
        setEmail(u.email);
        setForm({
          name: u.name || "",
          phone: u.phone || "",
          address: u.address || "",
          nationality: u.nationality || "",
          idType: u.idType || "",
          idNumber: u.idNumber || "",
        });
      } catch {
        // profile fetch failed — form still usable with whatever we already have from auth context
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadProfile();
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
      const res = await apiClient.patch("/auth/profile", form);
      const u = res.data.data.user;
      setForm((f) => ({ ...f, idNumber: u.idNumber || f.idNumber }));
      setSuccess("Profile updated");
    } catch (err) {
      setError(err.response?.data?.message || "Could not update profile");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="px-5 pb-4 text-sm text-forest-900/50">Loading…</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-4 space-y-3 text-sm">
      {error && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}
      {success && <div className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">{success}</div>}

      <ProfileField label="Name" name="name" value={form.name} onChange={handleChange} />
      <ProfileField label="Email" value={email} disabled />
      <ProfileField label="Phone" name="phone" value={form.phone} onChange={handleChange} />
      <ProfileField label="Address" name="address" value={form.address} onChange={handleChange} />
      <ProfileField label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} />
      <ProfileField label="ID Type" name="idType" value={form.idType} onChange={handleChange} placeholder="Passport, NID, ..." />
      <ProfileField label="ID Number" name="idNumber" value={form.idNumber} onChange={handleChange} />

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}

function ProfileField({ label, name, value, onChange, disabled, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-medium text-forest-900/60 mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold ${
          disabled ? "bg-forest-50/60 text-forest-900/40 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}

function ChangePasswordForm({ onChanged }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation don't match");
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.patch("/auth/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      // every session (including this one) was just revoked server-side —
      // log out locally so this tab isn't left holding a dead refresh token
      await onChanged();
    } catch (err) {
      setError(err.response?.data?.message || "Could not change password");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="px-5 pb-4 space-y-3 text-sm">
      {error && <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      <ProfileField
        label="Current password"
        name="currentPassword"
        value={form.currentPassword}
        onChange={handleChange}
      />
      <PasswordField label="New password" name="newPassword" value={form.newPassword} onChange={handleChange} />
      <PasswordField
        label="Confirm new password"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={handleChange}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50"
      >
        {submitting ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}

function PasswordField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-forest-900/60 mb-1">{label}</label>
      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-forest-900/15 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
      />
    </div>
  );
}
