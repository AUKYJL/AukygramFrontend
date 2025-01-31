import { useEffect, useRef } from "react";
import { useIntersection } from "react-use";

import { EVENTS } from "@/app/shared/consts/consts";
import { IMessage, IReadMessage } from "@/app/shared/types/types";
import { getSocket } from "@/app/shared/ws/socket";
import { useActiveChatStore } from "@/app/store/activeChatStore";
import { useOwnChatsStore } from "@/app/store/ownChatsStore";
import { useUserStore } from "@/app/store/userStore";

export const useMessage = (message: IMessage) => {
  const socket = getSocket();
  const userStore = useUserStore();
  const ownChatStore = useOwnChatsStore();
  const activeChatStore = useActiveChatStore();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  let timer: NodeJS.Timeout;

  const decreaseUnreadCount = () => {
    const currentCount = ownChatStore.unreadCount.find(
      (count) => count.chatId === activeChatStore.chatId,
    )?.count;
    ownChatStore.changeUnreadCount({
      chatId: activeChatStore.chatId,
      count: currentCount ? currentCount - 1 : 0,
    });
  };

  const markAsReadInChat = async (chatId: number) => {
    if (chatId !== activeChatStore.chatId) return;
    const readedMessage: IReadMessage = {
      chatId: activeChatStore.chatId,
      messageId: message.id,
      readerId: userStore.id!,
    };
    //TODO: норм ли на каждый мессадж слать сокет
    //TODO: первйы таймаут в юзэффекте 1сек и в дебаунсе 300мс, потенциально если успеться
    //  релоаднуть страницу в 1000-1300мс то невозможно будет правильно получить анридкаунт
    // (пока не появятся новые сообщения которые отработают правильно)
    socket.emit(EVENTS.READ_MESSAGE, readedMessage);
    decreaseUnreadCount();
    if (
      message.id > activeChatStore.lastReadedMessageIdInChat &&
      message.sendBy.id !== userStore.id
    ) {
      activeChatStore.setLastReadedMessageIdInChat(message.id);
      activeChatStore.debounceLastReadedMessageId(message.id, userStore.id!);
    }
  };
  useEffect(() => {
    if (timer) clearTimeout(timer);
    if (
      message.readedBy.every((user) => user.id !== userStore.id) &&
      message.sendBy.id !== userStore.id &&
      intersection?.isIntersecting
    ) {
      timer = setTimeout(() => markAsReadInChat(activeChatStore.chatId), 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [intersection]);

  const isOwn = message.sendBy.id === userStore.id;
  return { isOwn, intersectionRef };
};
