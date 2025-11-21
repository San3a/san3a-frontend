import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";

const RatingComponent = ({ ratingsAverage, ratingsQuantity }) => {
  const { t } = useTranslation();
  return (
    <>
      <p className="font-bold">{t("rating")}</p>
      <div className="flex items-center gap-2">
        <Star size={16} className="text-yellow-400 fill-yellow-400" />
        <span className="font-semibold">{ratingsAverage}</span>
        <span className="text-gray-500 dark:text-gray-400">
          ({ratingsQuantity})
        </span>
      </div>
    </>
  );
};

export default RatingComponent;
