import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Search, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./components/LogoutModal";
import { HOTEL_NAME, HOTEL_INITIAL } from "../../config/hotel";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/rooms", label: "Rooms" },
  { to: "/admin/bookings", label: "Bookings" },
  { to: "/admin/guests", label: "Guest" },
  { to: "/admin/tasks", label: "Task" },
];

function navLinkClass({ isActive }) {
  return `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? "bg-bronze-500 text-navy-900" : "text-white/70 hover:bg-white/10 hover:text-white"
  }`;
}

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  async function handleConfirmLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="h-screen flex bg-cream overflow-hidden">
      {/* Below lg, the sidebar is an off-canvas drawer instead of taking
          permanent width — same fix as GuestLayout, same underlying bug
          (a fixed-width sidebar forcing content to overflow on narrow
          screens instead of the layout reflowing). */}
      <aside className="hidden lg:flex w-60 shrink-0 bg-navy-900 text-white flex-col overflow-y-auto">
        <SidebarContent onLogoutClick={() => setLogoutOpen(true)} />
      </aside>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-navy-900 text-white flex flex-col overflow-y-auto">
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <SidebarContent
              onLogoutClick={() => {
                setMobileNavOpen(false);
                setLogoutOpen(true);
              }}
              onNavigate={() => setMobileNavOpen(false)}
            />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="shrink-0 bg-white border-b border-navy-100 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden text-navy-700 shrink-0"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="relative w-full max-w-xs hidden sm:block">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full pl-9 pr-3 py-2 border border-navy-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bronze-400/30 focus:border-bronze-400"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <Bell size={18} className="text-navy-400" />
            <div className="h-9 w-9 rounded-full bg-navy-100 flex items-center justify-center text-sm font-semibold text-navy-700 shrink-0">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div className="text-sm leading-tight hidden md:block">
              <p className="font-medium text-navy-900">{user?.name || "Admin"}</p>
              <p className="text-navy-400 text-xs">Hotel Manager</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      <LogoutModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
}

function SidebarContent({ onLogoutClick, onNavigate }) {
  return (
    <>
      <div className="px-6 py-6 flex items-center gap-2 border-b border-white/10">
        <div className="h-9 w-9 rounded-full bg-bronze-500 flex items-center justify-center font-serif font-semibold text-navy-900">
          {HOTEL_INITIAL}
        </div>
        <p className="text-sm font-semibold leading-tight">{HOTEL_NAME}</p>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        <p className="px-3 text-[11px] uppercase tracking-wider text-white/40 mb-2">Menu</p>
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass} onClick={onNavigate}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-5 border-t border-white/10 space-y-1">
        <p className="px-3 text-[11px] uppercase tracking-wider text-white/40 mb-2">General</p>
        <NavLink to="/admin/settings" className={navLinkClass} onClick={onNavigate}>
          Settings
        </NavLink>
        <button
          onClick={onLogoutClick}
          className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
}
