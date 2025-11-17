import { useTranslation } from "react-i18next";
import PostForm from "./PostForm";
import UserHeader from "./UserHeader";

export default function UpsertPostModal({ isOpen, onClose, post }) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl animate-fadeIn max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold w-full text-center">
          {t("post")}
        </h2>

        <UserHeader />

        <PostForm post={post} onClose={onClose} />
      </div>
    </div>
  );
}
