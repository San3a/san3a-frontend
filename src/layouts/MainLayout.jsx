import Navbar from "../components/Navbar";
import CategorySection from "../features/category/components/CategorySection";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CategorySection />
      <main className="flex-1 mt-20">{children}</main>
    </div>
  );
}
