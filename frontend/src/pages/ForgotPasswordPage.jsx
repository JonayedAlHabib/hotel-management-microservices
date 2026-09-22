import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { HOTEL_NAME, HOTEL_PHONE, HOTEL_EMAIL } from "../config/hotel";
import AuthSplitLayout from "../components/AuthSplitLayout";
import restaurantPhoto from "../assets/hero/restaurant.jpg";

// auth-service has no password-reset endpoint (checked routes/auth.routes.js
// and controllers/auth.controller.js — only register/login/refresh/get-me/
// logout exist), and this task's hard limits explicitly forbid touching
// auth-service's backend logic. Rather than posting to a made-up endpoint or
// faking a "check your email" success state, the form is honestly disabled
// and points guests at the hotel's real contact info instead — same pattern
// this codebase already uses for other not-yet-wired features (e.g. Wallet/
// Net Banking on PaymentPage, Settings' "Coming soon" rows).
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  return (
    <AuthSplitLayout
      photo={restaurantPhoto}
      quote="We're here whenever you need us — a real person is always just a call away."
      quoteAuthor={HOTEL_NAME}
    >
      <h1 className="font-serif text-2xl font-semibold text-forest-900">Reset Password</h1>
      <p className="text-sm text-forest-900/50 mt-1 mb-6">Enter your account email to reset your password</p>

      <div className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mb-5 space-y-2">
        <p>Self-service password reset isn't available yet. Please reach out and we'll help you directly:</p>
        <p className="flex items-center gap-2 font-medium">
          <Phone size={14} /> {HOTEL_PHONE}
        </p>
        <p className="flex items-center gap-2 font-medium">
          <Mail size={14} /> {HOTEL_EMAIL}
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-forest-900/80 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
            placeholder="Coming soon"
            className="w-full border border-forest-900/15 rounded-lg px-3 py-2.5 text-sm bg-forest-50/60 text-forest-900/40 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          disabled
          className="w-full bg-forest-900/30 text-white rounded-lg py-2.5 text-sm font-medium cursor-not-allowed"
        >
          Send reset link
        </button>

        <p className="text-sm text-forest-900/60 text-center">
          Remembered it after all?{" "}
          <Link to="/login" className="text-forest-900 font-semibold hover:underline">
            Back to login
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
