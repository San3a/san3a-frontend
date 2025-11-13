import { useState } from "react";
import PostImagesViewer from "./components/PostImagesViewer";
import PostMainContent from "./components/PostMainContent";
import PostShimmer from "./components/PostShimmer";

function PostsPage() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const images = [
    "https://images.unsplash.com/photo-1762930163317-01b67347b1bf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1762930163317-01b67347b1bf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1762930163317-01b67347b1bf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1762930163317-01b67347b1bf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1762930163317-01b67347b1bf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center">
      {Array.from({ length: 10 }).map((_, index) => (
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <PostMainContent
            setSelectedIndex={setSelectedIndex}
            images={images}
            showOffers={false}
          />
          {selectedIndex !== null && (
            <PostImagesViewer
              images={images}
              selectedIndex={selectedIndex}
              onClose={() => setSelectedIndex(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default PostsPage;
