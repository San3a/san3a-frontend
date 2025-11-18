import { MdClose, MdLocalOffer } from "react-icons/md";
import PostMainContent from "./PostMainContent";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import AddOfferForm from "./AddOfferForm";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

function PostOffersModal({
  isOpen,
  onClose,
  post,
  setIndex,
  setSelectedPostDetails,
}) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`${
          theme === "dark" ? "bg-black" : "bg-white"
        } w-full max-w-lg rounded-xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2
            className={`font-semibold text-lg mx-auto ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            {t("post")}
          </h2>
          <MdClose
            size={24}
            className="cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={onClose}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <PostMainContent
            post={post}
            setSelectedIndex={setIndex}
            setSelectedPostDetails={setSelectedPostDetails}
            isShowPostOffersBtnVisible={false}
          />
        </div>
        {user.role === "technician" && <AddOfferForm post={post} />}
      </div>
    </div>
  );
}

export default PostOffersModal;
