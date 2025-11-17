import { useNavigate } from "react-router-dom";
import { useCreateConversationMutation } from "../chatApi";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next"; // import i18n hook

const ChatButton = ({ userId, currentUserId }) => {
  const navigate = useNavigate();
  const [createConversation] = useCreateConversationMutation();
  const { t } = useTranslation();
  const handleChatClick = async () => {
    const { data } = await createConversation({
      participants: [currentUserId, userId],
    });
    navigate(`/chat/${data._id}`);
  };

  return (
    <button
      onClick={handleChatClick}
      className="cursor-pointer flex flex-col items-center justify-center gap-1 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 transition"
    >
      <div className="bg-blue-500 text-white p-2 rounded-full">
        <Mail size={20} />
      </div>
      <span className="text-gray-700 text-sm font-medium">{t("Chat")}</span>{" "}
    </button>
  );
};

export default ChatButton;
