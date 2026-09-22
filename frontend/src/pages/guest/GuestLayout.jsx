import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./components/LogoutModal";
import { HOTEL_NAME, HOTEL_INITIAL } from "../../config/hotel";

const NAV_ITEMS = [
  { to: "/home", label: "Home", end: true, icon: "🏠" },
  { to: "/rooms", label: "Rooms", icon: "🛏️" },
  { to: "/my-bookings", label: "My Booking", icon: "📖" },
];

function navClass({ isActive }) {
  return `flex items-center gap-3 mx-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${
    isActive ? "bg-bronze-500 text-navy-900" : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;
}

export default function GuestLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  async function handleConfirmLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="h-screen flex bg-cream overflow-hidden">
      <aside className="w-60 shrink-0 bg-navy-900 text-white flex flex-col overflow-y-auto">
        <div className="px-6 py-6 flex flex-col items-center text-center gap-2 border-b border-white/10">
          <div className="h-14 w-14 rounded-full bg-bronze-500 flex items-center justify-center font-serif font-semibold text-navy-900 text-lg">
            {HOTEL_INITIAL}
          </div>
          <p className="text-sm font-semibold leading-tight">{HOTEL_NAME}</p>
        </div>

        <nav className="flex-1 py-5 space-y-1">
          <p className="px-5 text-[11px] uppercase tracking-wider text-white/40 mb-2">Menu</p>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="py-5 border-t border-white/10 space-y-1">
          <p className="px-5 text-[11px] uppercase tracking-wider text-white/40 mb-2">General</p>
          <NavLink to="/settings" className={navClass}>
            <span>⚙️</span>
            Settings
          </NavLink>
          <button
            onClick={() => setLogoutOpen(true)}
            className="w-full flex items-center gap-3 mx-2 px-4 py-2.5 rounded-full text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
            style={{ width: "calc(100% - 1rem)" }}
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="shrink-0 bg-white border-b border-navy-100 px-6 py-3 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full max-w-xs border border-navy-100 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
          />
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-navy-400">🔔</span>
            <div className="h-9 w-9 rounded-full bg-navy-100 flex items-center justify-center text-sm font-semibold text-navy-700">
              {user?.name?.[0]?.toUpperCase() || "G"}
            </div>
            <div className="text-sm leading-tight hidden sm:block">
              <p className="font-medium text-navy-900">{user?.name || "Guest"}</p>
              <p className="text-navy-400 text-xs">Guest</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <LogoutModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
}
