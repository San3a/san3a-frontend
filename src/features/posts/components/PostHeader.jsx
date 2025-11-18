import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { FaEllipsisH } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import UpsertPostModal from "./upsertPostModal/UpsertPostModal";
import ConfirmModal from "@/components/ConfirmModal";
import { useState } from "react";
import { useDeletePostMutation } from "../postsApi";
import { toast } from "sonner";
import { useTheme } from "next-themes";

function PostHeader({ post }) {
  const { theme } = useTheme();

  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePost] = useDeletePostMutation();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDeleteClick = () => setIsDeleteModalOpen(true);
  const handleCancelDelete = () => setIsDeleteModalOpen(false);

  const handleConfirmDelete = async () => {
    try {
      await deletePost(post._id);
      setIsDeleteModalOpen(false);
      toast.success(t("postDeletedSuccessfully"));
    } catch {
      toast.error(t("errorOccurred"));
    }
  };

  const formatDate = (dateString) => {
    const isEnglish = i18n.language === "en";
    return format(new Date(dateString), `d MMMM '${t("atTime")}' h:mma`, {
      locale: isEnglish ? enUS : ar,
    });
  };
  const currentLang = i18n.language || "en";

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
        className="h-12 w-12 bg-black rounded-full "
        src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div>
        <h2
          className={`font-semibold ${
            theme === "light" ? "text-white" : "text-black"
          }`}
        >
          {post.user.name}
        </h2>
        <p
          className={`text-xs font-semibold ${
            theme === "light" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {formatDate(post.createdAt)}
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={`w-8 h-8 ms-auto rounded-full bg-transparent border-none ${
              theme === "light" ? "hover:bg-gray-100" : "hover:bg-black"
            }`}
          >
            <FaEllipsisH
              className={`text-gray-600 ${
                theme === " dark" ? "hover:text-black" : "hover:text-white"
              }`}
            />
            <ChevronDown size={16} className="absolute opacity-0" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={currentLang === "ar" ? "start" : "end"}
          className={`min-w-fit ${theme === "light" ? "bg-black" : "bg-white"}`}
        >
          {postOptions.map((option, index) => (
            <DropdownMenuItem
              key={index}
              onClick={option.onClick}
              className={`cursor-pointer hover:bg-blue-900 hover:text-blue-700 font-semibold flex justify-center"
                  
              }`}
            >
              <span className={`text-md mr-2 ${option.color}`}>
                {option.name}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
