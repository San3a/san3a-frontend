function PostImagesArrowBtn({ onClick, direction, icon }) {
  return (
    <button
      onClick={onClick}
      className={`absolute ${
        direction === "left" ? "left-15" : "right-15"
      } text-white text-xl bg-gray-700 p-3 rounded-full hover:bg-gray-700/60 cursor-pointer`}
    >
      {icon}
    </button>
  );
}

export default PostImagesArrowBtn;
