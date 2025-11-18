function PostImages({ images, onImageClick }) {
  if (images.length === 1) {
    return (
      <div className="relative cursor-pointe" onClick={() => onImageClick(0)}>
        <img
          src={images[0]}
          alt=""
          className=" w-full max-h-96 object-contain hover:opacity-90 transition cursor-pointer"
        />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-0.5 mt-3">
      {images.slice(0, 4).map((img, index) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => onImageClick(index)}
        >
          <img
            src={img}
            alt=""
            className=" w-full h-40 object-cover hover:opacity-90 transition cursor-pointer"
          />
          {index === 3 && images.length > 4 && (
            <div className="absolute inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center text-white text-xl font-semibold ">
              +{images.length - 4}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostImages;
