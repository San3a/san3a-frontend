import { useSelector } from "react-redux";
import DefaultUserImage from "@/assets/default-user.jpg";

export default function UserHeader() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center gap-4 mb-4">
      <img
        className="h-12 w-12 rounded-full object-cover"
        src={user?.image?.url}
        alt={user?.name}
        fallback={DefaultUserImage}
      />
      <h2 className="font-semibold text-black dark:text-white">
        Yousef Mohamed
      </h2>
    </div>
  );
}
