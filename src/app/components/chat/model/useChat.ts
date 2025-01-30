import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { chatUserService } from "@/app/services/chatUserService";
import { EVENTS } from "@/app/shared/consts/consts";
import { IMessage, ISendMessage } from "@/app/shared/types/types";
import { getSocket } from "@/app/shared/ws/socket";
import { useActiveChatStore } from "@/app/store/activeChatStore";
import { useOwnChatsStore } from "@/app/store/ownChatsStore";
import { useUserStore } from "@/app/store/userStore";

export const useChat = () => {
  const socket = getSocket();
  const activeChatStore = useActiveChatStore();
  const userStore = useUserStore();
  const ownChatsStore = useOwnChatsStore();

  const { data: lastReadMessageId, isSuccess } = useQuery({
    queryKey: ["chatUsersLastReadMessageIdInChat", activeChatStore.chatId],
    queryFn: () => chatUserService.getLastReadedMessage(activeChatStore.chatId),
    select: (data) => data.data,
  });
  useEffect(() => {
    if (isSuccess) {
      activeChatStore.setLastReadedMessageIdInChat(lastReadMessageId!);
    }
  }, [isSuccess]);
  const sendMessage = (message: ISendMessage) => {
    socket.emit(EVENTS.MESSAGE, message);
  };
  const handleMessage = ({
    message,
    chatId,
  }: {
    message: IMessage;
    chatId: number;
  }) => {
    ownChatsStore.addMessage(chatId, message);
    ownChatsStore.changeLastMessage({ chatId, message });
    if (message.sendBy.id !== userStore.id) {
      const unreadCount =
        ownChatsStore.unreadCount.find((count) => count.chatId === chatId)
          ?.count || 0;
      ownChatsStore.changeUnreadCount({ chatId, count: unreadCount + 1 });
    }

    if (chatId === activeChatStore.chatId) {
      activeChatStore.addMessage(message);
    }
  };
  const handleReadMessage = ({
    message,
    chatId,
  }: {
    message: IMessage;
    chatId: number;
  }) => {
    activeChatStore.readMessage(message);
    if (message.sendBy.id === userStore.id) {
      ownChatsStore.markAsReadOwnLastMessage({ chatId, message });
    }
  };
  const handleConnect = () => console.log("connected");
  useEffect(() => {
    socket.on(EVENTS.CONNECT, handleConnect);
    socket.on(EVENTS.MESSAGE, handleMessage);
    socket.on(EVENTS.READ_MESSAGE, handleReadMessage);

    return () => {
      socket.off(EVENTS.CONNECT, handleConnect);
      socket.off(EVENTS.MESSAGE, handleMessage);
      socket.off(EVENTS.READ_MESSAGE, handleReadMessage);
    };
  }, []);
  return { sendMessage };
};
