import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";
import { useIntersection } from "react-use";

import { EVENTS } from "../../consts/consts";
import { IMessage, IReadMessage } from "../../types/types";
import { timeToHHMM } from "../../utils/utils";
import { getSocket } from "../../ws/socket";
import { MessageSender } from "../messageSender/messageSender";

import styles from "./message.module.scss";
import { chatUserService } from "@/app/services/chatUserService";
import { useActiveChatStore } from "@/app/store/activeChatStore";
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
  const activeChatStore = useActiveChatStore();
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  });
  const markAsReadInChat = async (chatId: number) => {
    if (chatId !== activeChatStore.chatId) return;
    const readedMessage: IReadMessage = {
      chatId: activeChatStore.chatId,
      messageId: message.id,
      readerId: userStore.id!,
    };
    socket.emit(EVENTS.READ_MESSAGE, readedMessage);
    if (
      message.id > activeChatStore.lastReadedMessageIdInChat &&
      message.sendBy.id !== userStore.id
    ) {
      await chatUserService.setLastReadedMessageId({
        chatId: activeChatStore.chatId,
        userId: userStore.id!,
        messageId: message.id,
      });
      activeChatStore.setLastReadedMessageIdInChat(message.id);
    }
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      message.readedBy.every((user) => user.id !== userStore.id) &&
      message.sendBy.id !== userStore.id &&
      intersection?.isIntersecting
    ) {
      timer = setTimeout(
        () => markAsReadInChat(activeChatStore.chatId),

        2000,
      );
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
