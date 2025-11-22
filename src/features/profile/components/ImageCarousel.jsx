import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ images = [] }) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-44 overflow-hidden rounded-lg">
      {/* Images */}
      <img
        src={images[index].url}
        alt="carousel"
        className="w-full h-full object-cover transition-all duration-500"
      />

      {/* LEFT BUTTON */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* RIGHT BUTTON */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
        >
          <ChevronRight size={18} />
        </button>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 w-full flex justify-center gap-1">
          {images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === index ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
