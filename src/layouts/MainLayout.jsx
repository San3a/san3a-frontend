import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategorySection from "../features/category/components/CategorySection";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <CategorySection />
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
}
