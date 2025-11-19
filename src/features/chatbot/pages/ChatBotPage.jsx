import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSendChatAiMutation } from "../chatBotApi";
import ReactMarkdown from "react-markdown";
import { Bot, User } from "lucide-react";

const ChatBotPage = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationId] = useState("default");
  const [sendChatAi, { isLoading }] = useSendChatAiMutation();

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    const thinkingId = Date.now();
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: "...", id: thinkingId, thinking: true },
    ]);

    try {
      const result = await sendChatAi({
        conversationId,
        userMessage,
      }).unwrap();

      if (result.status === "success") {
        const { response, category } = result.data;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === thinkingId
              ? { sender: "bot", text: response, category }
              : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === thinkingId
              ? { sender: "bot", text: "AI is currently unavailable." }
              : msg
          )
        );
      }
    } catch (err) {
      console.error("Send message error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? { sender: "bot", text: "Failed to send message. Try again." }
            : msg
        )
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle>{t("chatbot")}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
          {messages.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400 text-center">
              {t("Say hi to start the chat")}
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start px-3 py-2 rounded max-w-[70%] space-x-2 ${
                msg.sender === "user"
                  ? "bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100 self-end flex-row-reverse"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 self-start"
              } ${msg.thinking ? "italic opacity-70" : ""}`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-1">
                {msg.sender === "bot" ? (
                  <Bot className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                ) : (
                  <User className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                )}
              </div>

              {/* Message Text */}
              <div className="prose dark:prose-invert break-words">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                {msg.category && (
                  <div className="text-xs text-gray-500 mt-1">
                    {t("Category")}: {msg.category}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </CardContent>

        <CardFooter className="flex gap-2">
          <Input
            placeholder={t("Type a message...")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={isLoading}
          />
          <Button
            className="bg-primary"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? t("Sending...") : t("Send")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBotPage;
