"use client";

import clsx from "clsx";
import React from "react";

import { useChat } from "../../model/useChat";
import { ChatInfo } from "../chatInfo/chatInfo";
import { MessageInput } from "../messageInput/messageInput";
import { MessagesList } from "../messagesList/messagesList";

import styles from "./chat.module.scss";

interface Props {
  className?: string;
}

export const Chat: React.FC<Props> = ({ className }) => {
  const { sendMessage } = useChat();
  return (
    <div className={clsx(className, styles.chat)}>
      <ChatInfo />
      <MessagesList className={styles.messagesList} />
      <div className={styles.messageInput}>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};
