import { useState } from "react";
import { MdLocalOffer } from "react-icons/md";
import PostOffersModal from "./PostOffersModal";
import { useTranslation } from "react-i18next";

function ShowPostOffersBtn({ post, setSelectedIndex, setSelectedPostDetails }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="mx-auto text-center w-full mt-5 flex justify-center items-center gap-2 bg-gray-300 py-2 cursor-pointer hover:bg-[#F2F8FE] hover:text-black font-semibold text-blue-600 transition-all"
        onClick={() => {
          setIsOpen(true);
          setSelectedIndex(null);
        }}
      >
        <MdLocalOffer />
        {t("showOffers")}
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
