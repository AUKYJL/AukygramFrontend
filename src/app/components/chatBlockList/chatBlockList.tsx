import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import React, { useState } from "react";

import { ChatBlock } from "../chatBlock/chatBlock";

import style from "./chatBlockList.module.scss";
import { userService } from "@/app/services/userService";
import { IMessage } from "@/app/shared/types/types";

interface Props {
  className?: string;
}

export const ChatBlockList: React.FC<Props> = ({ className }) => {
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
  ]);

  const USERID = 15;

  const { data: chats, isLoading } = useQuery({
    queryKey: [USERID, "ownChats"],
    queryFn: userService.getUserChats,
    select: (data) => data.data,
  });

  if (isLoading)
    return (
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton.Button key={index} block />
        ))}
      </div>
    );

  return (
    <ul className={style.list}>
      {chats ? (
        chats.map((chat) => (
          <li key={chat.id}>
            <ChatBlock chat={chat} lastMessage={messages[0]} />
          </li>
        ))
      ) : (
        <div>no chats</div>
      )}
    </ul>
  );
};
