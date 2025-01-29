import { useQueries, useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useEffect, useMemo } from "react";

import { ChatBlock } from "../chatBlock/chatBlock";

import style from "./chatBlockList.module.scss";
import { chatService } from "@/app/services/chatService";
import { userService } from "@/app/services/userService";
import { IUnreadCount } from "@/app/shared/types/types";
import { useOwnChatsStore } from "@/app/store/ownChatsStore";
import { useUserStore } from "@/app/store/userStore";

interface Props {
  className?: string;
}

export const ChatBlockList: React.FC<Props> = ({ className }) => {
  const userStore = useUserStore();
  const ownChatsStore = useOwnChatsStore();
  const {
    data: ownChat,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [userStore.id, "ownChats"],
    queryFn: userService.getUserChats,
    select: (data) => data.data,
  });
  const queries = useMemo(() => {
    return ownChat?.chats
      ? ownChat.chats.map((chat) => ({
          queryKey: [chat.id, "lastMessage"],
          queryFn: async () => {
            const messageResponse = await chatService.getLastMessage(chat.id);
            const message = messageResponse.data;
            ownChatsStore.addLastMessage({
              chatId: chat.id,
              message,
            });
            return message;
          },
          enabled: !!ownChat,
        }))
      : [];
  }, [ownChat]);
  useQueries({ queries });

  useEffect(() => {
    if (!ownChat) return;
    ownChatsStore.setChats(ownChat?.chats || []);

    const unreadCount: IUnreadCount[] | null = ownChat
      ? ownChat.chats.map((chat, i) => ({
          chatId: chat.id,
          count: ownChat?.unreadCount[i] || 0,
        }))
      : null;

    ownChatsStore.setUnreadCount(unreadCount || []);
  }, [isSuccess, ownChat]);

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
      {ownChatsStore.chats && ownChatsStore.lastMessagesInChat ? (
        ownChatsStore.chats.map((chat, i) => {
          const lastMessage = ownChatsStore.lastMessagesInChat.find(
            (message) => message.chatId === chat.id,
          )?.message;

          return (
            <li key={chat.id}>
              <ChatBlock
                chat={chat}
                lastMessage={lastMessage}
                undreadCount={ownChatsStore.unreadCount[i].count}
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
