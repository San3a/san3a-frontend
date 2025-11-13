import PostHeader from "./PostHeader";
import PostImages from "./PostImages";
import PostOffer from "./PostOffer";
import PostText from "./PostText";
import ShowPostOffersBtn from "./ShowPostOffersBtn";

function PostMainContent({
  setSelectedIndex,
  images,
  isShowPostOffersBtnVisible = true,
  showOffers = true,
}) {
  return (
    <>
      <PostHeader />
      <PostText />
      {images && <PostImages images={images} onImageClick={setSelectedIndex} />}
      {showOffers && <PostOffer />}
      {isShowPostOffersBtnVisible && (
        <ShowPostOffersBtn
          images={images}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </>
  );
}

export default PostMainContent;
