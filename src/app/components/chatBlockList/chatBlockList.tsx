import { useQueries, useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import React, { useState } from "react";

import { ChatBlock } from "../chatBlock/chatBlock";

import style from "./chatBlockList.module.scss";
import { chatService } from "@/app/services/chatService";
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
  const lastMessages = useQueries({
    queries: chats
      ? chats.map((chat) => ({
          queryKey: [chat.id, "lastMessage"],
          queryFn: () => chatService.getLastMessage(chat.id),
          enabled: !!chats,
        }))
      : [],
  });

  if (isLoading)
    return (
      <div className={style.skeletons}>
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton.Button key={index} block size="large" />
        ))}
      </div>
    );

  return (
    <ul className={style.list}>
      {chats && lastMessages ? (
        chats.map((chat, i) => {
          const lastMessage = lastMessages[i]?.data?.data;

          return (
            <li key={chat.id}>
              <ChatBlock chat={chat} lastMessage={lastMessage} />
            </li>
          );
        })
      ) : (
        <div>no chats</div>
      )}
    </ul>
  );
};
