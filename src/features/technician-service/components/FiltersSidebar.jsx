import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function FiltersSidebar() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const categories = useSelector((state) => state.category.categories);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (!value) searchParams.delete("category");
    else searchParams.set("category", value);
    setSearchParams(searchParams);
  };

  const handleRatingChange = (rating) => {
    if (rating === 0) searchParams.delete("ratingsAverage[gte]");
    else searchParams.set("ratingsAverage[gte]", rating);
    setSearchParams(searchParams);
  };
  const handlePriceChange = (type, value) => {
    const numericValue = Number(value);
    if (value === "" || numericValue < 0) {
      searchParams.delete(`price[${type}]`);
    } else {
      searchParams.set(`price[${type}]`, numericValue);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    searchParams.delete("category");
    searchParams.delete("ratingsAverage[gte]");
    searchParams.delete("price[gte]");
    searchParams.delete("price[lte]");
    searchParams.delete("search");
    setSearchParams(searchParams);
  };

  const selectedCategory = searchParams.get("category") || "";
  const selectedMinPrice = searchParams.get("price[gte]") || "";
  const selectedMaxPrice = searchParams.get("price[lte]") || "";
  const selectedRating = Number(searchParams.get("ratingsAverage[gte]") || 0);

  return (
    <div
      className={`w-64 p-4 ${
        isRTL ? "border-l" : "border-r"
      } dark:border-gray-700`}
    >
      <div className="mb-4">
        <p className="text-sm font-medium dark:text-gray-200">
          {t("Category")}
        </p>
        <div className="mt-2 space-y-2">
          <label className="flex items-center space-x-2 dark:text-gray-200">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ""}
              onChange={handleCategoryChange}
            />
            <span>{t("All")}</span>
          </label>
          {categories?.map((c) => (
            <label
              key={c._id}
              className="flex items-center space-x-2 dark:text-gray-200"
            >
              <input
                type="radio"
                name="category"
                value={c._id}
                checked={selectedCategory === c._id}
                onChange={handleCategoryChange}
              />
              <span>{isRTL ? c.nameAr : c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium dark:text-gray-200">{t("Rating")}</p>
        <div className="flex items-center space-x-1 mt-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleRatingChange(rating)}
              className={`w-8 h-2 rounded-full transition-colors cursor-pointer 
                ${
                  selectedRating >= rating
                    ? "bg-yellow-400 dark:bg-yellow-500"
                    : "bg-gray-300 dark:bg-gray-700"
                } hover:bg-yellow-300 dark:hover:bg-yellow-400`}
              title={rating === 0 ? t("Any") : `${rating}+ ${t("Stars")}`}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium dark:text-gray-200">{t("Price")}</p>
        <div className="mt-2 space-y-2">
          <input
            type="number"
            placeholder={t("Min")}
            value={selectedMinPrice}
            onChange={(e) => handlePriceChange("gte", e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
          />
          <input
            type="number"
            placeholder={t("Max")}
            value={selectedMaxPrice}
            onChange={(e) => handlePriceChange("lte", e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200"
          />
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full py-2 px-4 bg-primary text-secondary rounded hover:bg-popover  transition"
      >
        {t("Clear Filters")}
      </button>
    </div>
  );
}
