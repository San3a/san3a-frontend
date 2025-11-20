import { Star } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RatingComponent from "./RatingComponent";

export default function TechServiceCard({
  _id,
  images,
  title,
  description,
  price,
  category,
  ratingsAverage,
  ratingsQuantity,
}) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleClick = () => {
    navigate(`/tech-service/${_id}`);
  };
  const isRTL = i18n.dir() == "rtl";
  return (
    <div
      onClick={handleClick}
      className="
      w-64 rounded-xl border overflow-hidden shadow-sm 
      bg-white dark:bg-[#1e1e1e] 
      border-gray-200 dark:border-gray-700 
      cursor-pointer hover:shadow-md transition
    "
    >
      <div className="relative">
        <ImageCarousel images={images} />

        <div
          className="
          absolute top-2 left-2 
          bg-green-600 text-white 
          text-xs px-2 py-1 rounded-md
        "
        >
          {isRTL ? category.nameAr : category.name}
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3
          className="
          text-sm font-semibold 
          text-gray-800 dark:text-gray-100
          leading-5
        "
        >
          {title}
        </h3>

        <RatingComponent
          ratingsAverage={ratingsAverage}
          ratingsQuantity={ratingsQuantity}
        />

        <div className="space-y-[-4px]">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {price} {t("egp")}
          </span>
        </div>

        <div
          className="
          inline-flex items-center gap-1 text-xs font-semibold 
          bg-yellow-400 px-2 py-1 rounded-md 
          text-black
        "
        >
          {description.slice(0, 35)}...
        </div>
      </div>
    </div>
  );
}
