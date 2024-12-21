"use client";

import { Input } from "antd";
import { useEffect, useState } from "react";

import { USER } from "./shared/consts/consts";
import { IMessage } from "./shared/types/types";
import { Chat } from "./shared/ui/chat/chat";
import { getSocket } from "./shared/ws/socket";

const socket = getSocket();

export default function Home() {
  const user1 = {
    id: 26,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "John Doe",
    tagName: "johndoe",
  };
  const user2 = {
    id: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "John Doe",
    tagName: "johndoe",
  };
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      text: "hello how r u how is it going",
      createdAt: new Date(),
      updatedAt: new Date(),
      sendBy: user1,
      readedBy: [user2],
    },
    {
      id: 2,
      text: "hello how r u how is it going",
      createdAt: new Date(),
      updatedAt: new Date(),
      sendBy: user1,
      readedBy: [user2],
    },
    {
      id: 3,
      text: "hello how r u how is it going",
      createdAt: new Date(),
      updatedAt: new Date(),
      sendBy: user2,
      readedBy: [],
    },
    {
      id: 4,
      text: "hello how r u how is it going",
      createdAt: new Date(),
      updatedAt: new Date(),
      sendBy: user2,
      readedBy: [],
    },
  ]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on(
      "message",
      (data: { message: string; chatId: number; senderId: number }) => {
        setMessages((messages) => [
          ...messages,
          {
            id: messages.length + 1,
            text: data.message,
            createdAt: new Date(),
            updatedAt: new Date(),
            sendBy: data.senderId === 26 ? user1 : user2,
            readedBy: [],
          },
        ]);
      },
    );
  }, []);
  const sendMessage = () => {
    socket.emit("message", {
      message: value,
      chatId: 15,
      senderId: +JSON.parse(localStorage.getItem(USER) || "{}").id,
    });
  };
  const [value, setValue] = useState("");
  return (
    <>
      <Chat messages={messages} />
      <Input
        placeholder="Type message..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={sendMessage}>send</button>
    </>
  );
}
