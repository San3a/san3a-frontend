import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-10xl mx-auto grid grid-cols-12 gap-6 p-4">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <Sidebar />
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10">
          <Topbar />
          <div className="mt-4">{children}</div>
        </main>
      </div>
    </div>
  );
}
