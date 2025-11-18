import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ChatBotPage = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="flex justify-center items-center h-screen  p-4">
      <Card className="w-full max-w-md flex flex-col">
        <CardHeader>
          <CardTitle>{t("chatbot")}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {messages.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400">
              {t("Say hi to start the chat")}
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-gray-100 px-3 py-1 rounded self-start max-w-[80%]"
            >
              {msg}
            </div>
          ))}
        </CardContent>

        <CardFooter className="flex gap-2">
          <Input
            placeholder={t("Type a message...")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button className="bg-primary" onClick={sendMessage}>
            {t("Send")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBotPage;
