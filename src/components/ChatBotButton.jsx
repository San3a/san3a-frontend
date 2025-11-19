import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChatBotButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/chat-bot-messaging");
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      className="w-8 h-8 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={t("chatbot")}
    >
      <img
        src="/robot.png"
        alt={t("chatbot")}
        className="w-full h-full object-contain"
        title={t("chatbot")}
      />
    </Button>
  );
};

export default ChatBotButton;
