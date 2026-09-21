import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HOTEL_NAME, HOTEL_INITIAL } from "../config/hotel";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
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
      navigate(loggedInUser.role === "ADMIN" ? "/admin" : "/");
    } catch (err) {
      // login only ever returns one generic message ("Email or password is incorrect"),
      // never per-field errors — matching your backend's deliberate choice not to reveal
      // which one was wrong
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-bronze-500 flex items-center justify-center text-navy-900 font-serif text-xl font-semibold">
            {HOTEL_INITIAL}
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-white tracking-wide">Welcome!</h1>
          <p className="text-sm text-navy-100/70 mt-1">Log in to continue managing {HOTEL_NAME}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 space-y-5"
        >
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/40 focus:border-bronze-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-800 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/40 focus:border-bronze-400"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-navy-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-navy-800 disabled:opacity-50 transition-colors"
          >
            {submitting ? "Logging in…" : "Log in"}
          </button>

          <p className="text-sm text-navy-500 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-bronze-600 font-medium hover:text-bronze-700">
              Register
            </Link>
          </p>
        </form>

        <p className="text-center text-xs text-navy-100/50 mt-6">Secured Admin Panel</p>
      </div>
    </div>
  );
}
