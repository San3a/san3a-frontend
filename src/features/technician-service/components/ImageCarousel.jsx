import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ImageCarousel({ images = [] }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  return (
    <div className="relative w-full h-48 overflow-hidden rounded-lg">
      {images.length > 0 && (
        <img
          src={images[current].url}
          alt={`Service ${current + 1}`}
          className="w-full h-48 object-cover transition-opacity duration-500"
        />
      )}

      <button
        onClick={prev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-1 shadow"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        onClick={next}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/60 hover:bg-white rounded-full p-1 shadow"
      >
        <ChevronRight size={18} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === current ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
