import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 5000;

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  function goTo(i) {
    setIndex((i + slides.length) % slides.length);
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <img
          key={slide.alt}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-t from-forest-950/85 via-forest-950/40 to-forest-950/20" />

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous slide"
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-sand-cream/20 hover:bg-sand-cream/30 text-white items-center justify-center backdrop-blur transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next slide"
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-sand-cream/20 hover:bg-sand-cream/30 text-white items-center justify-center backdrop-blur transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-24 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.alt}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-sand-gold" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
