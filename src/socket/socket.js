import { io } from "socket.io-client";

let socket = null;

// Connect socket with auth (userId)
export const connectSocket = (userId) => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      auth: { userId }, // use auth instead of query
      autoConnect: true, // ensures socket tries to connect automatically
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });
  }
  return socket;
};

// Join a conversation room AFTER socket is connected
export const joinConversation = (conversationId) => {
  if (socket && socket.connected) {
    socket.emit("joinRoom", conversationId);
  } else if (socket) {
    socket.on("connect", () => {
      socket.emit("joinRoom", conversationId);
    });
  }
};

// Send a new message
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

// Listen for new messages
export const onNewMessage = (callback) => {
  if (socket) {
    socket.on("newMessage", callback);
  }
};

// Disconnect socket safely
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
