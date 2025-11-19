import PostsPage from "../features/posts/PostsPage";
import TopTechniciansSidebar from "../features/home/sections/TopTechniciansSidebar";
import HomeHelperSidebar from "../features/home/sections/HomeHelperSidebar";

const HomePage = () => {
  return (
    <div className="w-full flex justify-center px-2 sm:px-4">
      <div className="flex w-full max-w-6xl gap-4 lg:gap-6">
        <div className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24">
            <TopTechniciansSidebar />
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <PostsPage />
        </div>

        <div className="hidden xl:block w-72 shrink-0">
          <div className="sticky top-24">
            <HomeHelperSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
