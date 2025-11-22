import { useNavigate } from "react-router-dom";
import { useCreateConversationMutation } from "../chatApi";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

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
    <Button onClick={handleChatClick}>
      <Mail size={20} />
      <span>{t("Chat with Technician")}</span>
    </Button>
  );
};

export default ChatButton;
