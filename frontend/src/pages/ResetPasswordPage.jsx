import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { HOTEL_NAME } from "../config/hotel";
import AuthSplitLayout from "../components/AuthSplitLayout";
import apiClient from "../api/client";
import loungePhoto from "../assets/hero/lounge.jpg";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setSubmitting(true);
    try {
      await apiClient.post(`/auth/reset-password/${token}`, { newPassword: form.newPassword });
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.message || "Reset link is invalid or has expired");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthSplitLayout
      photo={loungePhoto}
      quote="A fresh start is just a new password away."
      quoteAuthor={HOTEL_NAME}
    >
      <h1 className="font-serif text-2xl font-semibold text-forest-900">Set a New Password</h1>
      <p className="text-sm text-forest-900/50 mt-1 mb-6">Choose a new password for your account</p>

      {done ? (
        <div className="space-y-4">
          <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5">
            Password reset successfully. You can now log in with your new password.
          </div>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 transition-colors"
          >
            Back to login
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-forest-900/80 mb-1">New password</label>
            <div className="relative">
              <input
                name="newPassword"
                type={showPassword ? "text" : "password"}
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border border-forest-900/15 rounded-lg px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-forest-900/40 hover:text-forest-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-forest-900/80 mb-1">Confirm new password</label>
            <input
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border border-forest-900/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Resetting…" : "Reset password"}
          </button>

          <p className="text-sm text-forest-900/60 text-center">
            <Link to="/login" className="text-forest-900 font-semibold hover:underline">
              Back to login
            </Link>
          </p>
        </form>
      )}
    </AuthSplitLayout>
  );
}
