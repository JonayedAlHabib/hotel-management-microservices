import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
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
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      setError(data?.message || "Something went wrong");

      // backend sends { errors: [{ field, message }] } for validation failures (UC-G01) —
      // turn that array into a lookup so each input can show its own message
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
    <div className="min-h-screen flex items-center justify-center bg-navy-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 space-y-5"
      >
        <div>
          <h1 className="text-xl font-semibold text-navy-900">Create an account</h1>
          <p className="text-sm text-navy-400 mt-1">Register to book a room.</p>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </div>
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
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Field
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-navy-700 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-navy-800 disabled:opacity-50"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>

        <p className="text-sm text-navy-500 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-bronze-600 font-medium hover:text-bronze-700">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-800 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/40 focus:border-bronze-400"
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
