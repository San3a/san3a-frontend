import PostHeader from "./PostHeader";
import PostImages from "./PostImages";
import PostOffer from "./PostOffer";
import PostText from "./PostText";
import ShowPostOffersBtn from "./ShowPostOffersBtn";

function PostMainContent({
  setSelectedIndex,
  setSelectedPostDetails,
  post,
  isShowPostOffersBtnVisible = true,
  showOffers = true,
  showImages = true,
}) {
  const images = post.images.map((image) => image.url);
  return (
    <>
      <PostHeader post={post} />
      <PostText post={post} />
      {showImages && images && (
        <PostImages
          images={images}
          onImageClick={(val) => {
            setSelectedIndex(val);
            setSelectedPostDetails(post);
          }}
        />
      )}
      {showOffers && <PostOffer post={post} />}
      {isShowPostOffersBtnVisible && (
        <ShowPostOffersBtn
          post={post}
          setSelectedIndex={setSelectedIndex}
          setSelectedPostDetails={setSelectedPostDetails}
        />
      )}
    </>
  );
}

export default PostMainContent;
