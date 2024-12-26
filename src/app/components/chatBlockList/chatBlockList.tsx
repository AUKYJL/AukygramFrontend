import { useQueries, useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import React, { useEffect } from "react";

import { ChatBlock } from "../chatBlock/chatBlock";

import style from "./chatBlockList.module.scss";
import { chatService } from "@/app/services/chatService";
import { userService } from "@/app/services/userService";
import { useUserStore } from "@/app/store/userStore";

interface Props {
  className?: string;
}

export const ChatBlockList: React.FC<Props> = ({ className }) => {
  const userStore = useUserStore();

  const { data: chatInfo, isLoading } = useQuery({
    queryKey: [userStore.id, "ownChats"],
    queryFn: userService.getUserChats,
    select: (data) => data.data,
  });
  const lastMessages = useQueries({
    queries: chatInfo?.chats
      ? chatInfo.chats.map((chat) => ({
          queryKey: [chat.id, "lastMessage"],
          queryFn: () => chatService.getLastMessage(chat.id),
          enabled: !!chatInfo,
        }))
      : [],
  });
  useEffect(() => {
    console.log(chatInfo?.unreadCount[0]);
  }, [lastMessages]);
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
      {chatInfo && lastMessages ? (
        chatInfo.chats.map((chat, i) => {
          const lastMessage = lastMessages[i]?.data?.data;

          return (
            <li key={chat.id}>
              <ChatBlock
                chat={chat}
                lastMessage={lastMessage}
                undreadCount={chatInfo.unreadCount[i]}
              />
            </li>
          );
        })
      ) : (
        <div>no chats</div>
      )}
    </ul>
  );
};
