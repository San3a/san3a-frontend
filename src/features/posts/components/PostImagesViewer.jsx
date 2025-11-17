import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

import PostImagesArrowBtn from "./PostImagesArrowBtn";
import PostMainContent from "./PostMainContent";
import AddOfferForm from "./AddOfferForm";

function PostImagesViewer({
  post,
  selectedIndex,
  setSelectedPostDetails,
  onClose,
}) {
  const [index, setIndex] = useState(selectedIndex);

  const images = post.images.map((img) => img.url);
  console.log(`These are the images: ${images}`);

  const prev = () => setIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  const next = () => setIndex((i) => (i < images.length - 1 ? i + 1 : 0));

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -200, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block bg-white p-6 ms-5 max-w-md w-full h-[80vh] overflow-y-auto"
        >
          <PostMainContent
            post={post}
            setSelectedIndex={setIndex}
            setSelectedPostDetails={setSelectedPostDetails}
            showImages={false}
            isShowPostOffersBtnVisible={false}
          />
          <AddOfferForm post={post} />
        </motion.div>

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center justify-center bg-black h-[80vh] w-full max-w-4xl"
        >
          <img
            src={images[index]}
            alt=""
            className="max-h-full max-w-full object-contain rounded-lg"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-15 text-black bg-white rounded-full p-1 text-xl hover:scale-110 transition cursor-pointer"
          >
            <FaTimes />
          </button>

          {images.length > 1 && (
            <>
              <PostImagesArrowBtn
                onClick={prev}
                direction="left"
                icon={<FaChevronLeft />}
              />
              <PostImagesArrowBtn
                onClick={next}
                direction="right"
                icon={<FaChevronRight />}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PostImagesViewer;
