import { useState } from "react";
import { useTranslation } from "react-i18next";
import CreatePostModal from "./CreatePostModal"; // import the modal we created earlier

function AddPost() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePostSubmit = (postData) => {
    console.log("Submitting post data to backend:", postData);
    // You can call your API here, e.g.,
    // axios.post("/api/posts", postData)
  };

  return (
    <>
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex justify-center items-center gap-4 ">
        <img
          className="h-12 w-12 bg-black rounded-full shrink-0"
          src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <button
          onClick={handleOpenModal}
          className="h-[80%] bg-gray-100 text-black/80 font-medium w-full rounded-full px-4 py-4 text-start hover:bg-gray-200 cursor-pointer"
        >
          {t("startTypingPost")}
        </button>
      </div>

      {/* Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePostSubmit}
      />
    </>
  );
}

export default AddPost;
