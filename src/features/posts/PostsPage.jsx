import PostHeader from "./components/PostHeader";

function PostsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <PostHeader />
      </div>
    </div>
  );
}

export default PostsPage;
