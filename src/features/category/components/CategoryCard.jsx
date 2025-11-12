export const CategoryCard = ({ cat, getName, getImageUrl, isRTL }) => {
  const getDescription = (category) => {
    return isRTL && category.descriptionAr
      ? category.descriptionAr
      : category.description;
  };

  const optimizedImageUrl = getImageUrl(cat);
  const description = getDescription(cat);

  return (
    <div
      key={cat.id || cat._id}
      className="group relative flex flex-col items-center justify-center p-2 bg-card shadow-sm rounded-lg transform transition duration-200 hover:scale-[1.05] cursor-pointer border border-border/10 text-center overflow-hidden"
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <div className="h-12 w-12 flex items-center justify-center overflow-hidden mb-1 bg-transparent transition-opacity duration-300 group-hover:opacity-0">
        <img
          src={optimizedImageUrl}
          alt={getName(cat)}
          className="w-full h-full object-contain opacity-0 data-[loaded=true]:opacity-100"
          loading="lazy"
          onLoad={(e) => e.target.setAttribute("data-loaded", "true")}
        />
      </div>

      <h3
        className={`text-xs font-medium text-foreground transition-opacity duration-300 group-hover:opacity-0 ${
          isRTL ? "text-right" : "text-left"
        }`}
      >
        {getName(cat)}
      </h3>

      <div
        className={`absolute inset-0 flex items-center justify-center p-1 bg-primary/95 text-primary-foreground rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      >
        <p
          className={`text-xs font-light ${isRTL ? "text-right" : "text-left"}`}
        >
          {description
            ? description
            : isRTL
            ? "لا يوجد وصف متاح."
            : "No description available."}
        </p>
      </div>
    </div>
  );
};
