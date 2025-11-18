import { useState } from "react";
import { useTranslation } from "react-i18next";
import UpsertPostModal from "./upsertPostModal/UpsertPostModal"; // import the modal we created earlier
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

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
        {user?.image === null ? (
          <div className="h-12 w-12 bg-blue-600 rounded-full shrink-0"></div>
        ) : (
          <img
            className="h-12 w-12 bg-black rounded-full shrink-0"
            src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        )}
        <button
          onClick={handleOpenModal}
          className={`h-[80%] ${
            theme === "dark" ? "bg-[#333334]" : "bg-gray-100"
          } ${
            theme === "dark" ? "text-gray-300" : "text-black/80"
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
