import { useState } from "react";
import DefaultUser from "@/assets/default-user.jpg";
import { useTranslation } from "react-i18next";
import {
  useGetTechServiceReviewsQuery,
  useAddReviewMutation,
  useEditUserReviewMutation,
  useDeleteUserReviewMutation,
} from "../techServiceApi";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

const ReviewsSection = ({ id, userId, userHasBooked }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1); // current page
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);

  const { data, isLoading, isError, error } = useGetTechServiceReviewsQuery(
    { id, page },
    { refetchOnMountOrArgChange: true }
  );

  const [addReview, { isLoading: isAdding }] = useAddReviewMutation();
  const [editReview, { isLoading: isEditing }] = useEditUserReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] =
    useDeleteUserReviewMutation();

  const openModal = (type, review = null) => {
    setModalType(type);
    setSelectedReview(review);
    if (type === "edit" && review) {
      setRating(review.rating);
      setReviewText(review.review);
    } else {
      setRating(0);
      setReviewText("");
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
    setRating(0);
    setReviewText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating || !reviewText) return;

    try {
      if (modalType === "add") {
        await addReview({
          rating,
          review: reviewText,
          techService: id,
          user: userId,
        }).unwrap();
      } else if (modalType === "edit" && selectedReview) {
        await editReview({
          reviewId: selectedReview._id,
          rating,
          review: reviewText,
          techServiceId: id,
        }).unwrap();
      }
      closeModal();
    } catch (err) {
      toast.error("Failed to submit review:", err);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedReview) {
        await deleteReview({
          reviewId: selectedReview._id,
          techServiceId: id,
        }).unwrap();
      }
      closeModal();
    } catch (err) {
      toast.error("Failed to delete review:", err);
    }
  };

  if (isLoading)
    return <p className="text-center py-4">{t("Loading reviews...")}</p>;

  if (isError)
    return (
      <p className="text-center py-4 text-red-500">
        {error?.message || t("Please try again later.")}
      </p>
    );

  const reviews = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-4">
      {userHasBooked && userId && (
        <Button onClick={() => openModal("add")}>
          {t("share your review")}
        </Button>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="bg-white dark:bg-gray-800  p-6 w-full max-w-md relative z-10">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            {(modalType === "add" || modalType === "edit") && (
              <>
                <h3 className="font-semibold text-lg mb-4">
                  {modalType === "add"
                    ? t("share your review")
                    : t("Edit review")}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label className="mb-1">
                      {t("Rating")}: {rating} ⭐
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={5}
                      step={0.1}
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder={t("Write your review...")}
                    className="w-full border rounded p-2"
                    rows={3}
                  />
                  <Button type="submit" disabled={isAdding || isEditing}>
                    {isAdding || isEditing
                      ? t("Submitting...")
                      : t("Submit Review")}
                  </Button>
                </form>
              </>
            )}

            {modalType === "delete" && (
              <>
                <h3 className="font-semibold text-lg mb-4">
                  {t("Delete review")}
                </h3>
                <p className="mb-4">
                  {t("Are you sure you want to delete this review?")}
                </p>
                <div className="flex justify-end gap-2">
                  <Button onClick={closeModal} variant="secondary">
                    {t("Cancel")}
                  </Button>
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-500"
                  >
                    {isDeleting ? t("Deleting...") : t("Delete")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length ? (
        reviews.map((rev) => (
          <div
            key={rev._id}
            className="border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800 relative"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={rev.user?.image?.url || DefaultUser}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = DefaultUser;
                  }}
                />
                <div>
                  <p className="font-semibold">{rev.user?.name}</p>
                  <p className="text-sm text-gray-500">{rev.rating} ⭐</p>
                </div>
              </div>

              {/* Three-dot menu */}
              {rev.user?._id === userId && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(
                        activeDropdown === rev._id ? null : rev._id
                      )
                    }
                    className="text-gray-500 hover:text-gray-700 font-bold text-xl"
                  >
                    ⋮
                  </button>
                  {activeDropdown === rev._id && (
                    <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 border rounded shadow-lg z-20">
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                        onClick={() => {
                          openModal("edit", rev);
                          setActiveDropdown(null);
                        }}
                      >
                        {t("Edit")}
                      </button>
                      <button
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500"
                        onClick={() => {
                          openModal("delete", rev);
                          setActiveDropdown(null);
                        }}
                      >
                        {t("Delete")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-200">{rev.review}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 py-4">{t("No reviews yet")}</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            {t("Previous")}
          </Button>
          <span>
            {page} / {totalPages}
          </span>
          <Button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            {t("Next")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
