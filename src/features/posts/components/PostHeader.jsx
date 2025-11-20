import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import UpsertPostModal from "./upsertPostModal/UpsertPostModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import { useDeletePostMutation } from "../postsApi";
import { toast } from "sonner";
import CustomActionsDropDown from "../../../components/customActionsDropDown";
import DefaultUserImage from "@/assets/default-user.jpg";
import { useSelector } from "react-redux";

function PostHeader({ post }) {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();
  const { user } = useSelector((state) => state.auth);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleCancelDelete = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    try {
      await deletePost(post._id).unwrap();
      setIsDeleteModalOpen(false);
      toast.success(t("postDeletedSuccessfully"));
    } catch (err) {
      toast.error(err.data?.message || t("errorOccurred"));
    }
  };

  const formatDate = (dateString) => {
    const isEnglish = i18n.language === "en";
    return format(new Date(dateString), `d MMMM '${t("atTime")}' h:mma`, {
      locale: isEnglish ? enUS : ar,
    });
  };

  const postOptions = [
    { onClick: handleOpenModal, name: t("update"), color: "text-green-600" },
    {
      onClick: handleDeleteClick,
      name: t("delete"),
      color: "text-red-600",
    },
  ];

  return (
    <div className="flex gap-2 items-center">
      <img
        className="h-12 w-12 bg-black object-cover rounded-full shrink-0"
        src={post.user?.image?.url || DefaultUserImage}
        fallback={DefaultUserImage}
      />
      <div>
        <h2 className="font-semibold text-black dark:text-white">
          {post.user.name}
        </h2>
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
          {formatDate(post.createdAt)}
        </p>
      </div>
      {user._id === post.user._id && (
        <CustomActionsDropDown options={postOptions} />
      )}

      <UpsertPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={post}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={t("deletePost")}
        description={t("thisActionCannotBeUndone")}
        warningMessage={`${t("warning")}: ${t("allOffersWillBeDeletedAsWell")}`}
        confirmButtonText={t("deleteNow")}
      />
    </div>
  );
}

export default PostHeader;
