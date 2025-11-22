import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PastWork from "../components/PastWork";
import { Briefcase } from "lucide-react";

import {
  useAddPastWorkMutation,
  useGetReviewsQuery,
  usePastWorkQuery,
  useUpdateProfileMutation,
} from "../../profile/profileApi";

const TechnicanProfile = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  const [pastwork, setPastWork] = useState([]);
  const {
    data: pastWork,
    isLoading,
    isError,
    error,
    refetch,
  } = usePastWorkQuery(user?._id);

  const [updateProfile, isLoadingUpdateProfile, isErrorUpdateProfile] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (pastWork) {
      setPastWork(pastWork);
    }
  }, [pastWork]);

  useEffect(() => {
    if (isErrorUpdateProfile) {
      const msg =
        error?.data?.message ||
        error?.error ||
        "You must fill all required fields";
      toast.error(msg);
    }
  }, [isErrorUpdateProfile, updateProfile]);

  const [addOpen, setAddOpen] = useState(false);

  const [pwTitle, setPwTitle] = useState("");
  const [pwDesc, setPwDesc] = useState("");
  const [pwImages, setPwImages] = useState([]);
  const [pwDate, setPwDate] = useState("");
  const [pwCustomer, setPwCustomer] = useState("");

  const [createPastWork] = useAddPastWorkMutation();

  const handlePastWorkImages = (e) => {
    setPwImages([...e.target.files]);
  };

  const handlePastWorkSave = async (e) => {
    e.preventDefault();

    if (!pwTitle || !pwDesc || !pwImages.length) {
      toast.error(t("Please fill in all fields"));
      return;
    }

    const formData = new FormData();
    formData.append("title", pwTitle);
    formData.append("description", pwDesc);
    formData.append("dateCompleted", pwDate);
    formData.append("customerName", pwCustomer);
    pwImages.forEach((img) => formData.append("images", img));
    try {
      await createPastWork(formData).unwrap();
      await refetch();
      toast.success(t("Past work added successfully"));
      setAddOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Error submitting form");
    }
  };

  const { data: reviews } = useGetReviewsQuery(user._id);

  if (isLoading) return <p className="text-center py-10">{t("Loading...")}</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        {t("Error")}: {error?.data?.message}
      </p>
    );

  return (
    <div className="mt-10">
      {/* Modal Trigger */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {t("My Past Work")}
        </h2>
        <button
          onClick={() => setAddOpen(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
        >
          + {t("Add Past Work")}
        </button>
      </div>

      {/* Add Past Work Modal */}
      {addOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-pastwork-title"
        >
          <div className="w-full max-w-md rounded-xl p-6 shadow-lg bg-card text-card-foreground border border-border overflow-auto max-h-[90vh]">
            <h2 id="add-pastwork-title" className="text-xl font-bold mb-4">
              {t("Add Past Work")}
            </h2>

            {/* Title */}
            <label className="block text-sm font-medium mb-1">
              {t("Title")}*
            </label>
            <input
              className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
              value={pwTitle}
              onChange={(e) => setPwTitle(e.target.value)}
            />

            {/* Description */}
            <label className="block text-sm font-medium mb-1">
              {t("Description")}*
            </label>
            <textarea
              className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
              rows="3"
              value={pwDesc}
              onChange={(e) => setPwDesc(e.target.value)}
            />

            {/* Images */}
            <label className="block text-sm font-medium mb-1">
              {t("Images")}*
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePastWorkImages}
              className="mb-3"
            />

            {/* Date Completed */}
            <label className="block text-sm font-medium mb-1">
              {t("Date Completed")}
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
              value={pwDate}
              onChange={(e) => setPwDate(e.target.value)}
            />

            {/* Customer Name */}
            <label className="block text-sm font-medium mb-1">
              {t("Customer Name")}
            </label>
            <input
              className="w-full p-2 border rounded-md mb-3 bg-background text-foreground border-border"
              value={pwCustomer}
              onChange={(e) => setPwCustomer(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setAddOpen(false)}
                className="px-4 py-2 rounded-md border border-border"
              >
                {t("Cancel")}
              </button>

              <button
                onClick={handlePastWorkSave}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80"
              >
                {t("Save")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Past Work List */}
      {pastWork?.data?.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <Briefcase
            size={48}
            className="mx-auto text-gray-300 dark:text-gray-500 mb-4"
          />
          <p className="text-gray-500 dark:text-gray-300 text-lg font-semibold">
            {t("No past work uploaded yet.")}
          </p>
          <p className="text-gray-400 dark:text-gray-400 text-sm mt-2">
            {t("Your completed projects will appear here")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastWork.data.map((item) => (
            <PastWork item={item} key={item._id} />
          ))}
        </div>
      )}

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {t("Reviews")}
        </h2>
        {reviews?.data?.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300">
            {t("No reviews yet")}
          </p>
        ) : (
          <div className="space-y-4">
            {reviews?.data.map((r) => (
              <div
                key={r._id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-between">
                  <p className="font-semibold">{r.user.name}</p>
                  <p className="text-yellow-600 font-bold">{r.rating} ⭐</p>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-200">
                  {r.review}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-400 mt-2">
                  {new Date(r.createdAt).toLocaleDateString("en-GB")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechnicanProfile;
