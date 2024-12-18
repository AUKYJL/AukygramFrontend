import { Input } from "antd";

import { Chat } from "./shared/ui/chat/chat";

export default function Home() {
  const user1 = {
    id: 1,
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
  const messages = [
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
  ];
  return (
    <>
      <Chat messages={messages} />

      <Input placeholder="Type message..." />
    </>
  );
}
