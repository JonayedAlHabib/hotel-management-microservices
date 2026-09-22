import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { HOTEL_NAME } from "../../../config/hotel";
import logo from "../../../assets/Logo.jpg";

// In-page anchors, not routes — this is currently a single-page public site,
// so "Rooms"/"About"/"Contact" scroll to sections on this same page rather
// than pointing at pages that don't exist yet.
const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

export default function PublicNav() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-sand-cream/90 backdrop-blur border-b border-forest-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-serif font-semibold text-forest-900 leading-tight">{HOTEL_NAME}</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-forest-900/80 hover:text-forest-900">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          {user ? (
            <Link to="/home" className="text-sm font-medium text-forest-900/80 hover:text-forest-900">
              My Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-sm font-medium text-forest-900/80 hover:text-forest-900">
              Login
            </Link>
          )}
          <Link
            to="/rooms"
            className="bg-forest-900 text-sand-cream rounded-full px-5 py-2.5 text-sm font-medium hover:bg-forest-800 transition-colors"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-forest-900 p-2 -mr-2"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-forest-900/10 bg-sand-cream px-4 py-4 space-y-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-forest-900/80 hover:text-forest-900"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-3">
            {user ? (
              <Link to="/home" className="text-sm font-medium text-forest-900/80" onClick={() => setOpen(false)}>
                My Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-sm font-medium text-forest-900/80" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
            <Link
              to="/rooms"
              onClick={() => setOpen(false)}
              className="bg-forest-900 text-sand-cream rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
