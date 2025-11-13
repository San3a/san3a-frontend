import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: { userId },
      autoConnect: true,
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  }
  return socket;
};

export const joinConversation = (conversationId) => {
  if (socket && socket.connected) {
    socket.emit("joinRoom", conversationId);
  } else if (socket) {
    socket.on("connect", () => {
      socket.emit("joinRoom", conversationId);
    });
  }
};

export const sendSocketMessage = (
  conversationId,
  authorId,
  content,
  type = "text"
) => {
  if (socket) {
    socket.emit("sendMessage", { conversationId, authorId, content, type });
  }
};

export const onNewMessage = (callback) => {
  if (socket) {
    socket.on("newMessage", callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const unsendMessage = (messageId, conversationId) => {
  if (socket) {
    socket.emit("unsendMessage", { messageId, conversationId });
  }
};

export const onMessageDeleted = (callback) => {
  if (socket) {
    socket.on("messageDeleted", callback);
  }
};

export const sendTyping = (conversationId, userId) => {
  if (socket) {
    socket.emit("typing", { conversationId, userId });
  }
};

export const onTyping = (callback) => {
  if (socket) {
    socket.on("typing", callback);
  }
};
