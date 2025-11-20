import { useTranslation } from "react-i18next";
import { useDeleteOfferMutation, useGetPostOffersQuery } from "../postsApi";
import { useEffect, useState } from "react";
import OfferShimmer from "./OfferShimmer";
import CustomActionsDropDown from "../../../components/customActionsDropDown";
import UpdateOfferModal from "./UpdateOfferModal";
import { toast } from "sonner";
import ConfirmModal from "../../../components/ConfirmModal";
import DefaultUserImage from "@/assets/default-user.jpg";
import { useSelector } from "react-redux";
import { useCreateConversationMutation } from "../../chat/chatApi";
import { useNavigate } from "react-router-dom";

function PostOffer({ postId }) {
  const { data, isLoading, isError, error } = useGetPostOffersQuery(postId);
  const [createConversation] = useCreateConversationMutation();
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [deleteOffer] = useDeleteOfferMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleDeleteClick = (offer) => {
    setSelectedOffer(offer);
    setIsDeleteModalOpen(true);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedOffer(null);
  };

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  useEffect(() => {
    if (data) {
      setOffers(data?.data || []);
    }
  }, [data]);

  if (isLoading) {
    return Array.from({ length: 5 }).map((_, index) => {
      return <OfferShimmer key={index}></OfferShimmer>;
    });
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  const handleUpdateOffer = (offer) => {
    setSelectedOffer(offer);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedOffer(null);
  };

  const handleConfirmDelete = async (offer) => {
    try {
      await deleteOffer({ postId: postId, offerId: offer._id });
      setIsDeleteModalOpen(false);
      toast.success(t("offerDeletedSuccessfully"));
    } catch (err) {
      console.error(`This is the error while deleting offer: ${err}`);
      toast.error(t("errorOccurred"));
    }
  };

  const getOfferOptions = (offer) => [
    {
      onClick: () => handleUpdateOffer(offer),
      name: t("update"),
      color: "text-green-600",
    },
    {
      onClick: () => handleDeleteClick(offer),
      name: t("delete"),
      color: "text-red-600",
    },
  ];

  async function handleStartConversation(technicianId) {
    try {
      const res = await createConversation({
        participants: [user._id, technicianId],
      });
      console.log(
        `This the response after calling createConversation:${JSON.stringify(
          res
        )}`
      );
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      toast.error(err?.data?.message || t("errorOccurred"));
    }
  }

  return offers.length === 0 ? (
    <p className="text-gray-500 my-8 text-center">{t("noOffersAvailable")}</p>
  ) : (
    <>
      {offers.map((offer) => (
        <div key={offer._id} className="mt-5 border-t pt-4">
          <div className="flex">
            <img
              className="h-8 w-8 bg-black rounded-full shrink-0"
              src={offer.technician.image?.url ?? DefaultUserImage}
              fallback={DefaultUserImage}
            />
            <div className="w-full bg-black/10 rounded-lg px-3 py-1 ms-2 dark:text-white text-black">
              <div className="flex justify-between">
                <div>
                  <span className="font-semibold text-[16px]">
                    {offer.technician.name}
                  </span>
                  <span
                    dir={isRTL ? "rtl" : "ltr"}
                    className="font-bold dark:text-gray-40 text-gray-700 text-[14px]"
                  >
                    .{offer.price}
                    {t("egp")}
                  </span>
                </div>

                {user._id === offer.technician._id && (
                  <CustomActionsDropDown options={getOfferOptions(offer)} />
                )}
              </div>

              <p className="font-normal dark:text-white text-black">
                {offer.message}
              </p>
            </div>
          </div>

          {user.role === "user" && (
            <button
              onClick={() => handleStartConversation(offer.technician._id)}
              className="text-blue-600 ms-10 font-bold hover:scale-102 transition-transform mt-2 cursor-pointer"
            >
              {t("startChat")}
            </button>
          )}
        </div>
      ))}

      <UpdateOfferModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        offer={selectedOffer}
        postId={postId}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={() => handleConfirmDelete(selectedOffer)}
        title={t("deleteOffer")}
        description={t("thisActionCannotBeUndone")}
        warningMessage={`${t("warning")}: ${t(
          "offerWillBeDeletedPermanently"
        )}`}
        confirmButtonText={t("deleteNow")}
      />
    </>
  );
}

export default PostOffer;
