import PostsPage from "../features/posts/PostsPage";
import TopTechniciansSidebar from "../features/technician-service/TopTechniciansSidebar";

const HomePage = () => {
  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <div className="flex w-full max-w-6xl gap-4 lg:gap-6">
        <div className="hidden lg:block w-72 shrink-0">
          <TopTechniciansSidebar />
        </div>

        <div className="flex-auto">
          <PostsPage />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
