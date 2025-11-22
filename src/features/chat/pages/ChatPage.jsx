import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery, useUploadMessageImageMutation } from "../chatApi";
import { Send, MoreVertical, Paperclip } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Dialog } from "@headlessui/react";
import {
  connectSocket,
  joinConversation,
  sendSocketMessage,
  onNewMessage,
  unsendMessage,
  onMessageDeleted,
  sendTyping,
  onTyping,
} from "../../../socket/socket";
import { useSelector } from "react-redux";

export default function ChatPage() {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language === "ar" ? "ar-EG" : "en-GB";
  const { conversationId } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { data: messagesData = [] } = useGetMessagesQuery(conversationId);
  const [uploadMessageImage] = useUploadMessageImageMutation();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setMessages(messagesData);
    const otherUser = messagesData.find(
      (m) => m.author?._id !== user._id
    )?.author;
    setReceiver(otherUser || null);
  }, [messagesData, user._id]);

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

    const handleTyping = ({ userId }) => {
      if (userId !== user._id) {
        setIsTyping(true);
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 2000);
      }
    };

    onNewMessage(handleNewMessage);
    onMessageDeleted(handleDeletedMessage);
    onTyping(handleTyping);

    return () => {
      if (socket) {
        socket.off("newMessage", handleNewMessage);
        socket.off("messageDeleted", handleDeletedMessage);
        socket.off("typing", handleTyping);
      }
    };
  }, [conversationId, user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, selectedImages]);
  const handleSendMessage = async () => {
    if (!newMessage.trim() && selectedImages.length === 0) return;

    // Send images
    for (const img of selectedImages) {
      try {
        const data = await uploadMessageImage({
          conversationId,
          file: img.file,
          author: user._id,
        }).unwrap();

        if (!data.url) throw new Error("No URL returned from server");

        sendSocketMessage(conversationId, user._id, {
          type: "image",
          url: data.url,
        });
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }

    // Send text message
    if (newMessage.trim()) {
      sendSocketMessage(conversationId, user._id, newMessage);
      setNewMessage("");
    }

    // Clear selected images
    setSelectedImages([]);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    sendTyping(conversationId, user._id);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImages((prev) => [
      ...prev,
      { file, preview: URL.createObjectURL(file) },
    ]);
    e.target.value = null;
  };

  const confirmUnsend = (messageId) => {
    setMessageToDelete(messageId);
    setModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleUnsendConfirmed = () => {
    unsendMessage(messageToDelete, conversationId);
    setModalOpen(false);
    setMessageToDelete(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {receiver && (
        <div className="flex items-center gap-3 p-4 bg-white shadow border-b">
          {receiver.avatar ? (
            <img
              src={receiver.avatar}
              alt={receiver.name}
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

      <div className="flex-1 overflow-y-auto p-15 space-y-4 flex flex-col">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`w-full max-w-lg break-words p-4 rounded-2xl shadow-sm relative flex flex-col ${
              m.author?._id === user._id
                ? "bg-blue-500 text-white self-end rounded-bl-none"
                : "bg-white text-gray-800 self-start rounded-br-none"
            }`}
          >
            <div className="flex justify-between items-center text-sm font-semibold mb-1 relative">
              <span>{m.author?.name || "Unknown"}</span>
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
                    <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
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

            <div className="mb-2">
              {m.type === "image" && m.images?.length > 0 ? (
                <div className="w-full rounded-xl overflow-hidden shadow-sm">
                  <img
                    src={m.images[0].url}
                    alt="uploaded"
                    className="w-full max-w-full max-h-80 object-contain rounded-xl"
                  />
                </div>
              ) : (
                <span>{m.content}</span>
              )}
            </div>

            <div className="text-xs self-end">
              {new Date(m.date).toLocaleDateString(currentLocale, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-sm text-gray-500 italic ml-2">
            {receiver?.name || receiver?.username || "User"} {t("is typing...")}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t flex flex-col gap-2">
        {selectedImages.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {selectedImages.map((img, idx) => (
              <div
                key={idx}
                className="relative w-20 h-20 rounded-md overflow-hidden border"
              >
                <img
                  src={img.preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() =>
                    setSelectedImages((prev) =>
                      prev.filter((_, i) => i !== idx)
                    )
                  }
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder={t("Message")}
            className="flex-1 text-black border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full transition"
            title="Upload Image"
          >
            <Paperclip size={20} />
          </button>
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full flex items-center justify-center transition"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

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
