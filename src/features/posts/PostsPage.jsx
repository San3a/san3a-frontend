import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import PostImagesViewer from "./components/PostImagesViewer";
import PostMainContent from "./components/PostMainContent";
import AddPost from "./components/AddPost";
import { useGetAllPostsQuery } from "./postsApi";
import PostShimmer from "./components/PostShimmer";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

function PostsPage() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isError, error, isLoading, isFetching } = useGetAllPostsQuery(
    page,
    {
      skip: !hasMore && page > 1,
    }
  );
  const posts = useMemo(() => data?.data || [], [data]);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPostDetails, setSelectedPostDetails] = useState(null);

  useEffect(() => {
    if (data) {
      setHasMore(data.page < data.totalPages);
    }
  }, [data]);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isLoading || isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, hasMore]
  );

  if (isLoading && page === 1) {
    return Array.from({ length: 5 }).map((_, index) => {
      return <PostShimmer key={index}></PostShimmer>;
    });
  }
  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <AddPost />
      {!posts || posts.length === 0 ? (
        <p className="text-gray-500 mt-8">{t("noPostsAvailable")}</p>
      ) : (
        posts.map((post, index) => {
          const isLastPost = posts.length === index + 1;
          return (
            <div
              ref={isLastPost ? lastPostElementRef : null}
              key={post._id}
              className={`${
                theme === "dark" ? "bg-[#252728]" : "bg-white"
              } p-8 rounded-xl shadow-lg w-full max-w-lg`}
            >
              <PostMainContent
                setSelectedIndex={setSelectedIndex}
                setSelectedPostDetails={setSelectedPostDetails}
                post={post}
                showOffers={false}
              />
              {selectedIndex !== null && (
                <PostImagesViewer
                  post={selectedPostDetails}
                  selectedIndex={selectedIndex}
                  setSelectedPostDetails={setSelectedPostDetails}
                  onClose={() => setSelectedIndex(null)}
                />
              )}
            </div>
          );
        })
      )}
      {isFetching &&
        hasMore &&
        Array.from({ length: 3 }).map((_, index) => (
          <PostShimmer key={`shimmer-${index}`} />
        ))}
    </div>
  );
}

export default PostsPage;
