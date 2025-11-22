function TopTechnicianShimmerCard({ cardBg }) {
  return (
    <div className={`${cardBg} flex items-center gap-3 mt-5`}>
      <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 rounded-full shrink-0" />

      <div className="flex flex-col gap-2 w-full">
        <div className="h-3 w-32 bg-gray-300 dark:bg-gray-700 rounded" />

        <div className="flex items-center gap-2 mt-1">
          <div className="h-2 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

export default TopTechnicianShimmerCard;
