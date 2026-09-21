import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white border-b border-slate-200 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold text-slate-900">
          Hotel
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link to="/" className="text-slate-600 hover:text-slate-900">
            Search Rooms
          </Link>

          {user && (
            <Link to="/my-bookings" className="text-slate-600 hover:text-slate-900">
              My Bookings
            </Link>
          )}

          {user ? (
            <>
              <Link to="/profile" className="text-slate-600 hover:text-slate-900">
                {user.name}
              </Link>
              <button onClick={handleLogout} className="text-slate-600 hover:text-slate-900">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-600 hover:text-slate-900">
                Log in
              </Link>
              <Link to="/register" className="text-slate-900 font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
