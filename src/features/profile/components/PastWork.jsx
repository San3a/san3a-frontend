import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const PastWork = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = item.images || [];

  const handlePrev = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Carousel */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 group">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex].url}
              alt={`${item.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300"
            />

            {/* Image Counter Badge */}
            {images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Navigation Buttons - Show on hover */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dot Indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex
                        ? "bg-white w-4"
                        : "bg-white bg-opacity-50 hover:bg-opacity-75"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
            <div className="text-center">
              <Briefcase size={40} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {item.title || "Untitled Work"}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {item.description || "No description provided."}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar size={14} />
            <span>
              {new Date(item.createdAt).getDate().toString().padStart(2, "0")}/
              {(new Date(item.createdAt).getMonth() + 1)
                .toString()
                .padStart(2, "0")}
              /{new Date(item.createdAt).getFullYear()}
            </span>
          </div>

          {item.status && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              {item.status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastWork;
