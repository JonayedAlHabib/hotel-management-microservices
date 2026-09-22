import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { HOTEL_NAME } from "../config/hotel";
import AuthSplitLayout from "../components/AuthSplitLayout";
import loungePhoto from "../assets/hero/lounge.jpg";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setSubmitting(true);

    try {
      await register(form);
      navigate("/home");
    } catch (err) {
      const data = err.response?.data;
      setError(data?.message || "Something went wrong");

      // backend sends { errors: [{ field, message }] } for validation failures (UC-G01) —
      // turn that array into a lookup so each input can show its own message, exactly
      // as the API worded it, rather than a generic one written here.
      if (Array.isArray(data?.errors)) {
        const mapped = {};
        data.errors.forEach((fe) => {
          mapped[fe.field] = fe.message;
        });
        setFieldErrors(mapped);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthSplitLayout
      photo={loungePhoto}
      quote="Every stay starts with a warm welcome — create your account and let's get you settled in."
      quoteAuthor={HOTEL_NAME}
    >
      <h1 className="font-serif text-2xl font-semibold text-forest-900">Create an Account</h1>
      <p className="text-sm text-forest-900/50 mt-1 mb-6">Register to start booking your stay</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>
        )}

        <Field label="Full name" name="name" value={form.name} onChange={handleChange} error={fieldErrors.name} />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={fieldErrors.email}
        />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} error={fieldErrors.phone} />

        <div>
          <label className="block text-sm font-medium text-forest-900/80 mb-1">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
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
          {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-forest-900 text-white rounded-full py-2.5 text-sm font-medium hover:bg-forest-800 disabled:opacity-50 transition-colors"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>

        <p className="text-sm text-forest-900/60 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-forest-900 font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
}

function Field({ label, name, type = "text", value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-forest-900/80 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-forest-900/15 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
