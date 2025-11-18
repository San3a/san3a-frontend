import { useTranslation } from "react-i18next";
import Card from "../components/Card";
import { useGetAllReviewsQuery, useDeleteReviewMutation } from "../adminApi";

export default function Reviews() {
  const { t } = useTranslation();
  const {
    data: reviews,
    isLoading,
    isError,
    refetch,
  } = useGetAllReviewsQuery();
  const [deleteReview] = useDeleteReviewMutation();

  const handleDelete = async (id) => {
    try {
      await deleteReview(id).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading)
    return (
      <p className="text-gray-400 text-center py-6 italic">
        {t("loadingReviews")}
      </p>
    );
  if (isError)
    return (
      <p className="text-red-500 text-center py-6 font-medium">
        {t("errorLoadingReviews")}
      </p>
    );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
        {t("reviews")}
      </h2>

      <Card className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
        <div className="space-y-4">
          {(reviews || []).map((r) => (
            <div
              key={r._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex-1 space-y-1">
                <div className="font-semibold text-gray-700">
                  {r.user?.name} {r.techService?.user?.name}
                </div>
                <div className="text-sm text-gray-500">{r.review}</div>
              </div>
              <div className="mt-3 md:mt-0 flex items-center gap-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                  {r.rating} ⭐
                </span>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="px-4 py-2 rounded-lg  bg-red-100 text-red-700 hover:bg-red-100 font-medium transition cursor-pointer"
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))}
          {(!reviews || reviews.length === 0) && (
            <p className="text-gray-400 text-center py-4">{t("noReviews")}</p>
          )}
        </div>
      </Card>
    </div>
  );
}
