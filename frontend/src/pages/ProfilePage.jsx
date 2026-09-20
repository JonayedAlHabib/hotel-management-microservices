import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Your profile</h1>
          <p className="text-sm text-slate-500 mt-1">Fetched live from GET /auth/get-me</p>
        </div>

        <dl className="space-y-3 text-sm">
          <Row label="Name" value={user?.name} />
          <Row label="Email" value={user?.email} />
          <Row label="Phone" value={user?.phone} />
          <Row label="Role" value={user?.role} />
        </dl>

        <button
          onClick={handleLogout}
          className="w-full border border-slate-300 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-100"
        >
          Log out
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="text-slate-900 font-medium">{value}</dd>
    </div>
  );
}
