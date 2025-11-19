import { useEffect, useMemo, useState } from "react";
import { useGetAllCategoriesQuery } from "../categoryApi";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { setCategories } from "../categorySlice";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading, isError } = useGetAllCategoriesQuery();
  const categories = useMemo(() => data?.data || [], [data]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl"; // safer than checking language === 'ar'
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || null
  );

  const getName = (category) =>
    isRTL && category.nameAr ? category.nameAr : category.name;

  useEffect(() => {
    if (isError) {
      const msg =
        error?.data?.message || error?.error || "Failed to fetch categories";
      toast.error(msg, {
        description: t("Please try again later."),
        duration: 4000,
      });
    }
  }, [isError, error, t]);

  useEffect(() => {
    if (categories.length) {
      dispatch(setCategories({ categories }));
    }
  }, [categories, dispatch]);

  const handleCategoryClick = (catId) => {
    setActiveCategory(catId);

    searchParams.set("category", catId);
    setSearchParams(searchParams);

    navigate(`/tech-services?${searchParams.toString()}`);
  };

  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-20">
        <Spinner />
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="text-center text-gray-500 mt-2 py-2">
        {t("No categories available")}
      </section>
    );
  }

  return (
    <div
      className={`w-full py-2 px-4 flex justify-center overflow-x-auto scrollbar-hide ${
        isRTL ? "space-x-reverse" : "space-x-3"
      }`}
    >
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => handleCategoryClick(cat._id)}
          className={`flex-shrink-0 flex items-center px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
            activeCategory === cat._id
              ? "bg-white text-black shadow"
              : "bg-background text-foreground"
          }`}
          style={{ flexDirection: isRTL ? "row-reverse" : "row" }}
        >
          <span className="whitespace-nowrap">{getName(cat)}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySection;
