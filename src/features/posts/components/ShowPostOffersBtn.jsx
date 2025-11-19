import { useState } from "react";
import { FaUserCog, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import PostOffersModal from "./PostOffersModal";
import { useTranslation } from "react-i18next";

function ShowPostOffersBtn({ post, setSelectedIndex, setSelectedPostDetails }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="mx-auto w-full mt-5 px-6 py-3 rounded-full font-semibold text-base
          flex items-center justify-between gap-3 transition-all duration-300 
          transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer
          from-blue-500 to-green-600 text-white hover:from-blue-600 hover:to-green-700 bg-linear-to-r dark:from-blue-600 dark:to-green-700  dark:hover:from-blue-700 dark:hover:to-green-800"
        onClick={() => {
          setIsOpen(true);
          setSelectedIndex(null);
        }}
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <FaUserCog size={20} />
          </div>
          <span className="text-sm font-medium">{t("offers")}</span>
        </div>
        {isRTL ? (
          <FaArrowLeft className="text-xl animate-pulse" />
        ) : (
          <FaArrowRight className="text-xl animate-pulse" />
        )}
      </button>

      <PostOffersModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        post={post}
        setIndex={setSelectedIndex}
        setSelectedPostDetails={setSelectedPostDetails}
      />
    </>
  );
}

export default ShowPostOffersBtn;
