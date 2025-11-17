import { useEffect, useMemo, useState } from "react";
import { useGetAllCategoriesQuery } from "../categoryApi";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { setCategories } from "../categorySlice";
import { useTranslation } from "react-i18next";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllCategoriesQuery();
  const categories = useMemo(() => data?.data || [], [data]);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [activeCategory, setActiveCategory] = useState(null);

  const getName = (category) =>
    isRTL && category.nameAr ? category.nameAr : category.name;

  // const getImageUrl = (category) =>
  //   category.images && category.images.length > 0
  //     ? category.images[0].url
  //     : "/placeholder.png";

  useEffect(() => {
    if (error) {
      const msg =
        error?.data?.message || error?.error || "Failed to fetch categories";
      toast.error(msg, {
        description: "Please try again later.",
        duration: 4000,
      });
    }
  }, [error]);

  useEffect(() => {
    if (categories.length) {
      dispatch(setCategories({ categories }));
    }
  }, [categories, dispatch]);

  if (isLoading) {
    return (
      <section className="flex justify-center items-center h-20 bg-primary/95">
        <Spinner />
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="text-center text-gray-500 mt-2 bg-primary/95 py-2">
        {t("No categories available")}
      </section>
    );
  }

  return (
    <div className="w-full py-2 px-4 flex justify-center overflow-x-auto space-x-3 scrollbar-hide">
      {categories.map((cat) => (
        <button
          key={cat.id || cat._id}
          onClick={() => setActiveCategory(cat._id)}
          className={`flex-shrink-0 flex items-center space-x-3 px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
            activeCategory === cat._id
              ? "bg-white text-black shadow"
              : "bg-background text-foreground "
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
