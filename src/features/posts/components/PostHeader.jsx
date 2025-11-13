import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { FaEllipsisH } from "react-icons/fa";

function PostHeader() {
  const { t, i18n } = useTranslation();
  const formatDate = (dateString) => {
    const isEnglish = i18n.language === "en";
    return format(new Date(dateString), `d MMMM '${t("atTime")}' h:mma`, {
      locale: isEnglish ? enUS : ar,
    });
  };
  return (
    <div className="flex gap-2 justify-center items-center">
      <img
        className="h-12 w-12 bg-black rounded-full "
        src="https://plus.unsplash.com/premium_photo-1755882951408-b6d668ccca21?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
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
