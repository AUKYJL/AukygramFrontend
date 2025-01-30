import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

import { chatService } from "@/app/services/chatService";
import { userService } from "@/app/services/userService";
import { IUnreadCount } from "@/app/shared/types/types";
import { useOwnChatsStore } from "@/app/store/ownChatsStore";
import { useUserStore } from "@/app/store/userStore";

export const useChatBlockList = () => {
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
  return { ownChatsStore, isLoading };
};
