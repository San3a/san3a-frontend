import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useGetAllUserConversationsMutation } from "../chatApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ChatDropdown({ currentUserId }) {
  const { t } = useTranslation(); // i18n hook
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const [getConversations, { data: conversations, isLoading, isError }] =
    useGetAllUserConversationsMutation();

  useEffect(() => {
    if (open) {
      getConversations(currentUserId);
    }
  }, [open]);

  const handleOpenConversation = (conversationId) => {
    navigate(`/chat/${conversationId}`);
  };

  const hasUnread = conversations?.some((conv) => conv.unread);

  const renderAvatar = (user) => {
    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
      );
    } else {
      return (
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mr-3 text-sm font-semibold text-gray-800 dark:text-gray-100">
          {user?.name?.slice(0, 2).toUpperCase()}
        </div>
      );
    }
  };

  // Filter conversations with messages only
  const conversationsWithMessages = conversations?.filter(
    (conv) => conv.lastMessage?.content
  );

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      >
        <MessageCircle size={28} strokeWidth={2} />
        {hasUnread && (
          <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-1 ring-white dark:ring-gray-900"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 max-h-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-y-auto z-50">
          {isLoading && <p className="p-4 text-gray-500">{t("loading")}...</p>}
          {isError && (
            <p className="p-4 text-red-500">{t("errorLoadingConversations")}</p>
          )}
          {!isLoading &&
            (!conversationsWithMessages ||
              conversationsWithMessages.length === 0) && (
              <p className="p-4 text-gray-500">{t("noConversationsYet")}</p>
            )}

          {conversationsWithMessages?.map((conv) => (
            <div
              key={conv._id}
              onClick={() => handleOpenConversation(conv._id)}
              className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer relative"
            >
              {renderAvatar(conv.otherUser)}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 dark:text-gray-100 truncate">
                  {conv.otherUser?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {conv.lastMessage.content}
                </p>
              </div>
              {conv.unread && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
