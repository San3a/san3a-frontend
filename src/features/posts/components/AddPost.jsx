import { useState } from "react";
import { useTranslation } from "react-i18next";
import UpsertPostModal from "./upsertPostModal/UpsertPostModal"; // import the modal we created earlier
import { useTheme } from "next-themes";

function AddPost() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className={`${
          theme === "light" ? "bg-[#252728]" : "bg-white"
        } p-8 rounded-xl shadow-lg w-full max-w-md flex justify-center items-center gap-4 `}
      >
        <img
          className="h-12 w-12 bg-black rounded-full shrink-0"
          src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <button
          onClick={handleOpenModal}
          className={`h-[80%] ${
            theme === "light" ? "bg-[#333334]" : "bg-gray-100"
          } ${
            theme === "light" ? "text-gray-300" : "text-black/80"
          } font-medium w-full rounded-full px-4 py-4 text-start hover:bg-gray-200 cursor-pointer`}
        >
          {t("startTypingPost")}
        </button>
      </div>

      <UpsertPostModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default AddPost;
