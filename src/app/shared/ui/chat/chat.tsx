"use client";

import clsx from "clsx";
import React, { useEffect } from "react";

import { IMessage, ISendMessage } from "../../types/types";
import { getSocket } from "../../ws/socket";

import styles from "./chat.module.scss";
import { MessageInput } from "@/app/components/messageInput/messageInput";
import { MessagesList } from "@/app/components/messagesList/messagesList";
import { useActiveChatStore } from "@/app/store/activeChatStore";

interface Props {
  className?: string;
}

export const Chat: React.FC<Props> = ({ className }) => {
  const socket = getSocket();
  const activeChatStore = useActiveChatStore();
  const sendMessage = (message: ISendMessage) => {
    socket.emit("message", message);
  };
  useEffect(() => {
    const handleMessage = (message: IMessage) => {
      activeChatStore.addMessage(message);
    };

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
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
