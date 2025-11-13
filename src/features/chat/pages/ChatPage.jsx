import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../chatApi";
import { Send, MoreVertical } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@headlessui/react";
import {
  connectSocket,
  joinConversation,
  sendSocketMessage,
  onNewMessage,
  unsendMessage,
  onMessageDeleted,
} from "../../../socket/socket";
import { useSelector } from "react-redux";

export default function ChatPage() {
  const { t } = useTranslation();
  const { conversationId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: messagesData = [] } = useGetMessagesQuery(conversationId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null); // track which dropdown is open
  const messagesEndRef = useRef(null);

  // Set initial messages & receiver
  useEffect(() => {
    setMessages(messagesData);
    const otherUser = messagesData.find(
      (m) => m.author?._id !== user._id
    )?.author;
    setReceiver(otherUser || null);
  }, [messagesData, user._id]);

  // Socket connection & listeners
  useEffect(() => {
    if (!user?._id) return;
    const socket = connectSocket(user._id);
    joinConversation(conversationId);

    const handleNewMessage = (msg) => {
      if (!msg || msg.conversation !== conversationId) return;
      setMessages((prev) =>
        prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]
      );
    };

    const handleDeletedMessage = ({ messageId }) => {
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    };

    onNewMessage(handleNewMessage);
    onMessageDeleted(handleDeletedMessage);

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
        socket.off("messageDeleted", handleDeletedMessage);
      }
    };
  }, [conversationId, user._id]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendSocketMessage(conversationId, user._id, newMessage);
    setNewMessage("");
  };

  // Open modal for confirmation
  const confirmUnsend = (messageId) => {
    setMessageToDelete(messageId);
    setModalOpen(true);
    setOpenDropdownId(null);
  };

  // Unsend message after confirmation
  const handleUnsendConfirmed = () => {
    unsendMessage(messageToDelete, conversationId);
    setModalOpen(false);
    setMessageToDelete(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
      {receiver && (
        <div className="flex items-center gap-3 p-4 bg-white shadow border-b">
          {receiver.avatar ? (
            <img
              src={receiver.avatar}
              alt={receiver.name || receiver.username}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              {receiver.name?.slice(0, 2).toUpperCase() || "??"}
            </div>
          )}
          <span className="font-medium text-gray-800">
            {receiver.name || "Unknown"}
          </span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`w-full max-w-lg break-words p-4 rounded-2xl shadow-sm relative
              ${
                m.author?._id === user._id
                  ? "bg-blue-500 text-white self-end rounded-bl-none"
                  : "bg-white text-gray-800 self-start rounded-br-none"
              }`}
          >
            {/* Header with dropdown */}
            <div className="flex justify-between items-center text-sm font-semibold mb-1 relative">
              <span>{m.author?.name || m.author?.username || "Unknown"}</span>

              {m.author?._id === user._id && (
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdownId(openDropdownId === m._id ? null : m._id)
                    }
                    className="p-1 hover:bg-blue-600 hover:bg-opacity-20 rounded-full transition"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openDropdownId === m._id && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-25 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <button
                        onClick={() => confirmUnsend(m._id)}
                        className="w-full text-center px-4 py-2 hover:bg-red-100 text-red-600 transition rounded-md"
                      >
                        {t("Delete Message")}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Message content */}
            <div className="text-base">
              {typeof m.content === "string"
                ? m.content
                : JSON.stringify(m.content)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t flex items-center gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={t("Message")}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full flex items-center justify-center transition"
        >
          <Send size={20} />
        </button>
      </div>

      {/* Unsend Confirmation Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30"
      >
        <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4">
          <Dialog.Title className="text-lg font-semibold">
            {t("Confirm Delete")}
          </Dialog.Title>
          <Dialog.Description className="text-gray-600">
            {t("Are you sure you want to delete this message?")}
          </Dialog.Description>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
            >
              {t("Cancel")}
            </button>
            <button
              onClick={handleUnsendConfirmed}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              {t("Delete")}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
