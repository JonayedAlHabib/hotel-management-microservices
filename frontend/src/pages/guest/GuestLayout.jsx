import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, Search, ChevronDown, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LogoutModal from "./components/LogoutModal";
import NotificationsDropdown from "./components/NotificationsDropdown";
import { HOTEL_NAME } from "../../config/hotel";
import logo from "../../assets/Logo.jpg";

const NAV_ITEMS = [
  { to: "/home", label: "Home", end: true },
  { to: "/rooms", label: "Rooms" },
  { to: "/my-bookings", label: "My Booking" },
];

function navClass({ isActive }) {
  return `text-sm font-medium transition-colors ${isActive ? "text-forest-900" : "text-forest-900/60 hover:text-forest-900"}`;
}

// No sidebar — every guest page (this dashboard included) is one straight
// top-to-bottom page under a single topbar, matching the wireframe exactly
// (logo + nav links + search + notification + avatar, all in one bar).
// Settings/Logout, previously in the sidebar's "General" section, now live
// in a dropdown off the avatar since there's no sidebar rail left to hold them.
export default function GuestLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const avatarMenuRef = useRef(null);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const term = searchTerm.trim();
    navigate(term ? `/rooms?q=${encodeURIComponent(term)}` : "/rooms");
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
        setAvatarMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleConfirmLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="h-screen flex flex-col bg-sand-cream overflow-hidden">
      <header className="shrink-0 bg-white border-b border-forest-900/10 px-4 sm:px-6">
        <div className="h-16 flex items-center gap-4">
          <NavLink to="/home" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="hidden sm:block font-serif font-semibold text-forest-900">{HOTEL_NAME}</span>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-6 ml-4">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-xs hidden md:block ml-auto">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-forest-900/30" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rooms..."
              className="w-full pl-9 pr-3 py-2 border border-forest-900/15 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sand-gold/40 focus:border-sand-gold"
            />
          </form>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0 md:ml-4 ml-auto">
            <NotificationsDropdown />

            <div className="relative" ref={avatarMenuRef}>
              <button
                type="button"
                onClick={() => setAvatarMenuOpen((v) => !v)}
                className="flex items-center gap-2"
              >
                <div className="h-9 w-9 rounded-full bg-forest-50 flex items-center justify-center text-sm font-semibold text-forest-800 shrink-0">
                  {user?.name?.[0]?.toUpperCase() || "G"}
                </div>
                <div className="text-sm leading-tight hidden md:block text-left">
                  <p className="font-medium text-forest-900">{user?.name || "Guest"}</p>
                  <p className="text-forest-900/40 text-xs">Guest</p>
                </div>
                <ChevronDown size={14} className="text-forest-900/40 hidden sm:block" />
              </button>

              {avatarMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl border border-forest-900/10 shadow-lg py-1.5 z-50">
                  <NavLink
                    to="/settings"
                    onClick={() => setAvatarMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-forest-900/80 hover:bg-forest-50"
                  >
                    <Settings size={15} />
                    Settings
                  </NavLink>
                  <button
                    onClick={() => {
                      setAvatarMenuOpen(false);
                      setLogoutOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden text-forest-900 shrink-0"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute top-0 right-0 w-64 bg-white h-full shadow-xl p-5">
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="absolute top-4 right-4 text-forest-900/50 hover:text-forest-900"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <nav className="mt-10 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive ? "bg-forest-900 text-white" : "text-forest-900/80 hover:bg-forest-50"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>

      <LogoutModal open={logoutOpen} onCancel={() => setLogoutOpen(false)} onConfirm={handleConfirmLogout} />
    </div>
  );
}
