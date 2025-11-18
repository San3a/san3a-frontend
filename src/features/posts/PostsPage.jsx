import { useMemo, useState } from "react";
import PostImagesViewer from "./components/PostImagesViewer";
import PostMainContent from "./components/PostMainContent";
import AddPost from "./components/AddPost";
import { useGetAllPostsQuery } from "./postsApi";
import PostShimmer from "./components/PostShimmer";
import { useTheme } from "next-themes";

function PostsPage() {
  const { data, isError, error, isLoading } = useGetAllPostsQuery();
  const posts = useMemo(() => data?.data || [], [data]);
  const { theme } = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedPostDetails, setSelectedPostDetails] = useState(null);

  if (isLoading) {
    return Array.from({ length: 5 }).map((_, index) => {
      return <PostShimmer key={index}></PostShimmer>;
    });
  }
  if (isError) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
      <AddPost />
      {!posts || posts.length === 0 ? (
        <p className="text-gray-500 mt-8">No posts available</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className={`${
              theme === "light" ? "bg-[#252728]" : "bg-white"
            } p-8 rounded-xl shadow-lg w-full max-w-md`}
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
        ))
      )}
    </div>
  );
}

export default PostsPage;
