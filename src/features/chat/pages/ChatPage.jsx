import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../chatApi";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  connectSocket,
  joinConversation,
  sendSocketMessage,
  onNewMessage,
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
  const messagesEndRef = useRef(null);

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
      setMessages((prev) => {
        if (prev.some((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    };

    onNewMessage(handleNewMessage);
    return () => {
      if (socket) socket.off("newMessage", handleNewMessage);
    };
  }, [conversationId, user._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    sendSocketMessage(conversationId, user._id, newMessage);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Navbar */}
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
              {receiver.email?.slice(0, 2).toUpperCase() || "??"}
            </div>
          )}
          <span className="font-medium text-gray-800">{receiver.name}</span>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-6 space-y-4 flex flex-col">
        {messages.map(
          (m) => (
            console.log(JSON.stringify(m)),
            (
              <div
                key={m._id}
                className={`w-full max-w-lg break-words p-4 rounded-2xl shadow-sm
              ${
                m.author?._id === user._id
                  ? "bg-blue-500 text-white self-end rounded-bl-none"
                  : "bg-white text-gray-800 self-start rounded-br-none"
              }`}
              >
                <div className="text-sm font-semibold mb-1">
                  {m.author?.name || "Unknown"}
                </div>
                <div className="text-base">{m.content}</div>
              </div>
            )
          )
        )}
        <div ref={messagesEndRef} />
      </div>

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
    </div>
  );
}
