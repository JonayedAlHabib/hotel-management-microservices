import { Globe, Share2, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { HOTEL_NAME, HOTEL_ADDRESS, HOTEL_PHONE, HOTEL_EMAIL } from "../../../config/hotel";
import logo from "../../../assets/Logo.jpg";

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#rooms", label: "Rooms" },
  { href: "#about", label: "About Us" },
  { href: "#contact", label: "Contact" },
];

// No blog/FAQ/policy pages exist yet — these are placeholders for the site
// structure this footer is designed for, same treatment as the blog teaser
// cards above it.
const EXPLORE_LINKS = ["Our Rooms", "Amenities", "Gallery", "Guest Reviews"];

export default function PublicFooter() {
  return (
    <footer id="contact" className="bg-forest-950 text-sand-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="" className="h-9 w-9 rounded-full object-cover" />
            <span className="font-serif font-semibold text-white">{HOTEL_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            A place where comfort meets hospitality — book your stay with us and experience it for yourself.
          </p>
          <div className="flex items-center gap-3 pt-1">
            {[Globe, Share2, MessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm">Quick Links</p>
          <ul className="space-y-2.5 text-sm">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm">Explore</p>
          <ul className="space-y-2.5 text-sm">
            {EXPLORE_LINKS.map((label) => (
              <li key={label}>
                <span className="hover:text-white transition-colors cursor-default">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-semibold mb-4 text-sm">Contact Us</p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>{HOTEL_ADDRESS}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <span>{HOTEL_PHONE}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0" />
              <span>{HOTEL_EMAIL}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 px-4 sm:px-6 text-xs text-center text-sand-cream/50">
        © {new Date().getFullYear()} {HOTEL_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
