import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import PostForm from "./PostForm";
import UserHeader from "./UserHeader";

export default function UpsertPostModal({ isOpen, onClose, post }) {
  const { t } = useTranslation();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-xl shadow-2xl animate-fadeIn my-auto">
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h2 className="text-lg font-semibold w-full text-center mb-4 text-gray-900 dark:text-white">
            {t("post")}
          </h2>

          <UserHeader />

          <PostForm post={post} onClose={onClose} />
        </div>
      </div>
    </div>
  );
}
