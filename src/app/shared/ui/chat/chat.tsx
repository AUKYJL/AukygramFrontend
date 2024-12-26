"use client";

import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useEffect } from "react";

import { EVENTS } from "../../consts/consts";
import { IMessage, ISendMessage } from "../../types/types";
import { getSocket } from "../../ws/socket";

import styles from "./chat.module.scss";
import { MessageInput } from "@/app/components/messageInput/messageInput";
import { MessagesList } from "@/app/components/messagesList/messagesList";
import { chatUserService } from "@/app/services/chatUserService";
import { useActiveChatStore } from "@/app/store/activeChatStore";

interface Props {
  className?: string;
}

export const Chat: React.FC<Props> = ({ className }) => {
  const socket = getSocket();
  const activeChatStore = useActiveChatStore();

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
    socket.emit("message", message);
  };
  const handleMessage = (message: IMessage) => {
    activeChatStore.addMessage(message);
  };
  const handleReadMessage = (message: IMessage) => {
    console.log("readed ", message);
    activeChatStore.readMessage(message);
  };

  useEffect(() => {
    console.log(lastReadMessageId);
    //TODO:вынести выше тк энивей 1 раз только коннектится к сокету и тут нелогично держать
    socket.on(EVENTS.CONNECT, () => {
      console.log("connected");
    });

    socket.on(EVENTS.MESSAGE, handleMessage);
    socket.on(EVENTS.READ_MESSAGE, handleReadMessage);

    return () => {
      socket.off(EVENTS.MESSAGE, handleMessage);
    };
  }, []);

  return (
    <div className={clsx(className, styles.chat)}>
      <MessagesList className={styles.messagesList} />
      <div className={styles.messageInput}>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};
