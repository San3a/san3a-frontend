import { useTheme } from "next-themes";

function PostShimmer() {
  const { theme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? "bg-black" : "bg-white"
      } p-8 rounded-xl shadow-lg w-full max-w-lg animate-pulse mx-auto mb-2`}
    >
      <div className="flex gap-2 items-center mb-3">
        <div className="h-12 w-12 bg-gray-300 rounded-full shrink-0" />
        <div className="flex flex-col gap-2 w-full">
          <div className="h-3 w-32 bg-gray-300 rounded" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-2 w-8 bg-gray-300 rounded ms-auto" />
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <div className="h-3 bg-gray-300 rounded w-full" />
        <div className="h-3 bg-gray-300 rounded w-5/6" />
        <div className="h-3 bg-gray-300 rounded w-4/6" />
      </div>

      <div className="grid grid-cols-2 gap-0.5 mt-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-40 bg-gray-300" />
        ))}
      </div>

      <div className="h-10 mt-5 bg-gray-300 rounded" />
    </div>
  );
}

export default PostShimmer;
