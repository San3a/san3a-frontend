import { format } from "date-fns";
import { FaEllipsisH } from "react-icons/fa";

function PostHeader() {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "d MMMM 'at' h:mma");
  };
  return (
    <div className="flex gap-2 justify-center items-center">
      <div className="h-12 w-12 bg-black rounded-full "></div>
      <div>
        <h2 className="font-semibold">Yousef Mohamed</h2>
        <p className="text-xs font-semibold text-gray-600">
          {formatDate("2025-11-05T18:30:00")}
        </p>
      </div>
      <FaEllipsisH className="ms-auto text-gray-500 cursor-pointer" />
    </div>
  );
}

export default PostHeader;
