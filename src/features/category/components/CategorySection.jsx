import { useEffect, useMemo } from "react";
import { useGetAllCategoriesQuery } from "../categoryApi";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { setCategories } from "../categorySlice";
import { useTranslation } from "react-i18next";
import { CategoryCard } from "./CategoryCard";

const CategorySection = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllCategoriesQuery();
  const categories = useMemo(() => data?.data || [], [data]);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const getName = (category) => {
    return isRTL && category.nameAr ? category.nameAr : category.name;
  };

  const getImageUrl = (category) => {
    return category.images && category.images.length > 0
      ? category.images[0].url
      : "/placeholder.png";
  };

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
      <section className="flex justify-center items-center h-64">
        <Spinner />
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section className="text-center text-gray-500 mt-8">
        {t("No categories available")}
      </section>
    );
  }

  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{t("All Categories")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id || cat._id}
            cat={cat}
            getName={getName}
            getImageUrl={getImageUrl}
            isRTL={isRTL}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
