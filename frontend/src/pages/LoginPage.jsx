import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { HOTEL_NAME } from "../config/hotel";
import AuthSplitLayout from "../components/AuthSplitLayout";
import poolPhoto from "../assets/hero/pool.jpg";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const loggedInUser = await login(form);
      navigate(loggedInUser.role === "ADMIN" ? "/admin" : "/home");
    } catch (err) {
      // login only ever returns one generic message ("Email or password is incorrect"),
      // never per-field errors — matching the backend's deliberate choice not to reveal
      // which one was wrong. Surfaced as-is, not replaced with our own copy.
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthSplitLayout
      photo={poolPhoto}
      quote="Find your sweet stay — booking your next room takes just a few clicks."
      quoteAuthor={HOTEL_NAME}
    >
      <h1 className="font-serif text-2xl font-semibold text-forest-900">Welcome Back</h1>
      <p className="text-sm text-forest-900/50 mt-1 mb-6">Sign in to continue to your account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-forest-900/80 mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border border-forest-900/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-forest-900/80">Password</label>
            <Link to="/forgot-password" className="text-xs font-medium text-forest-700 hover:text-forest-900">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              value={form.password}
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

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Logging in…" : "Login"}
        </button>

        <p className="text-sm text-forest-900/60 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-forest-900 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}
