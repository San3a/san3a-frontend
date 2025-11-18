import { useState } from "react";
import { useTranslation } from "react-i18next";
import UpsertPostModal from "./upsertPostModal/UpsertPostModal"; // import the modal we created earlier
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import DefaultUserImage from "@/assets/default-user.jpg";

function AddPost() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className={`${
          theme === "dark" ? "bg-[#252728]" : "bg-white"
        } p-8 rounded-xl shadow-lg w-full max-w-lg flex justify-center items-center gap-4 `}
      >
        <img
          className="h-12 w-12 bg-black border border-black object-cover rounded-full shrink-0"
          src={user.image.url}
          fallback={DefaultUserImage}
        />

        <button
          onClick={handleOpenModal}
          className={`h-[80%] ${
            theme === "dark" ? "bg-[#333334]" : "bg-gray-100"
          } ${
            theme === "dark" ? "text-gray-300" : "text-black/80"
          } hover:text-black font-medium w-full rounded-full px-4 py-4 text-start hover:bg-gray-200 cursor-pointer`}
        >
          {t("startTypingPost")}
        </button>
      </div>

      <UpsertPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default AddPost;
