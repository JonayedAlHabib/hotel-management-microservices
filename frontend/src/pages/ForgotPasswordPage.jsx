import { useState } from "react";
import { Link } from "react-router-dom";
import { HOTEL_NAME } from "../config/hotel";
import AuthSplitLayout from "../components/AuthSplitLayout";
import apiClient from "../api/client";
import restaurantPhoto from "../assets/hero/restaurant.jpg";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await apiClient.post("/auth/forgot-password", { email });
      // backend always returns a generic success regardless of whether the email
      // exists, to avoid account enumeration — the UI just reflects that
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthSplitLayout
      photo={restaurantPhoto}
      quote="We're here whenever you need us — a real person is always just a call away."
      quoteAuthor={HOTEL_NAME}
    >
      <h1 className="font-serif text-2xl font-semibold text-forest-900">Reset Password</h1>
      <p className="text-sm text-forest-900/50 mt-1 mb-6">Enter your account email to reset your password</p>

      {sent ? (
        <div className="text-sm text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 mb-5">
          If an account exists for that email, a reset link has been sent. Check your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
          )}

          <div>
            <label className="block text-sm font-medium text-forest-900/80 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-forest-900/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}

      <p className="text-sm text-forest-900/60 text-center mt-4">
        Remembered it after all?{" "}
        <Link to="/login" className="text-forest-900 font-semibold hover:underline">
          Back to login
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
