import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import { useIntersection } from "react-use";

import { EVENTS } from "../../consts/consts";
import { IMessage, IReadMessage } from "../../types/types";
import { timeToHHMM } from "../../utils/utils";
import { getSocket } from "../../ws/socket";
import { MessageSender } from "../messageSender";

import styles from "./message.module.scss";
import { useActiveChatStore } from "@/app/store/activeChatStore";
import { useOwnChatsStore } from "@/app/store/ownChatsStore";
import { useUserStore } from "@/app/store/userStore";

interface Props {
  className?: string;
  showSender: boolean;
  message: IMessage;
}

export const Message: React.FC<Props> = ({
  className,
  message,
  showSender,
}) => {
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
  return (
    <div
      ref={intersectionRef}
      className={clsx(className, styles.messageWrapper, isOwn && styles.own)}
    >
      {showSender && <MessageSender sender={message.sendBy} isOwn={isOwn} />}
      <div className={clsx(styles.message)}>
        <p>{message.text}</p>
        <div className={styles.bottom}>
          <span className={styles.time}>{timeToHHMM(message.createdAt)}</span>
          {isOwn && (
            <>
              {message.readedBy.length > 0 ? (
                <IoCheckmarkDoneSharp size={15} />
              ) : (
                <IoCheckmarkSharp size={15} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
