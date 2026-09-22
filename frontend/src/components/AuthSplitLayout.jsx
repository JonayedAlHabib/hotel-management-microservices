import { Link } from "react-router-dom";
import { HOTEL_NAME, HOTEL_INITIAL } from "../config/hotel";
import logo from "../assets/Logo.jpg";

// Shared split-panel shell for Login/Register/Forgot-Password — a hotel
// photo + quote on one side, the form on the other. Stacks vertically on
// mobile (photo panel becomes a shorter strip on top) instead of side by
// side, per the responsive requirement.
export default function AuthSplitLayout({ photo, quote, quoteAuthor, children }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-sand-cream font-sans">
      <div className="relative h-56 sm:h-72 lg:h-auto lg:w-1/2 shrink-0 overflow-hidden">
        <img src={photo} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-forest-950/90 via-forest-950/30 to-forest-950/10" />

        <Link
          to="/"
          className="absolute top-5 left-5 flex items-center gap-2 bg-white/95 rounded-full pl-1.5 pr-4 py-1.5 hover:bg-white transition-colors"
        >
          <img src={logo} alt="" className="h-7 w-7 rounded-full object-cover" />
          <span className="text-xs font-semibold text-forest-900">{HOTEL_NAME}</span>
        </Link>

        {quote && (
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10">
            <p className="font-serif text-white text-lg lg:text-2xl leading-snug max-w-md">&ldquo;{quote}&rdquo;</p>
            {quoteAuthor && <p className="text-white/70 text-xs mt-2">{quoteAuthor}</p>}
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 justify-center mb-6">
            <div className="h-9 w-9 rounded-full bg-forest-900 flex items-center justify-center text-sand-cream font-serif text-sm font-semibold">
              {HOTEL_INITIAL}
            </div>
            <span className="text-sm font-semibold text-forest-900">{HOTEL_NAME}</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}
