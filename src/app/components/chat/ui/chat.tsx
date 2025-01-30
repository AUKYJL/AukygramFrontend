"use client";

import clsx from "clsx";
import React from "react";

import { useChat } from "../model/useChat";

import styles from "./chat.module.scss";
import { MessageInput } from "@/app/components/messageInput";
import { MessagesList } from "@/app/components/messagesList";

interface Props {
  className?: string;
}

export const Chat: React.FC<Props> = ({ className }) => {
  const { sendMessage } = useChat();
  return (
    <div className={clsx(className, styles.chat)}>
      <MessagesList className={styles.messagesList} />
      <div className={styles.messageInput}>
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};
