import { MdClose, MdLocalOffer } from "react-icons/md";
import PostMainContent from "./PostMainContent";
import { useTranslation } from "react-i18next";

import AddOfferForm from "./AddOfferForm";

function PostOffersModal({
  isOpen,
  onClose,
  post,
  setIndex,
  setSelectedPostDetails,
}) {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg flex flex-col max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="font-semibold text-lg mx-auto">{t("post")}</h2>
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
        <AddOfferForm post={post} />
      </div>
    </div>
  );
}

export default PostOffersModal;
