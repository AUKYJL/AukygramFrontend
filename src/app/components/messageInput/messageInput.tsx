"use client";

import Input from "antd/es/input/Input";
import clsx from "clsx";
import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";

import styles from "./messageInput.module.scss";
import { USER } from "@/app/shared/consts/consts";
import { ISendMessage } from "@/app/shared/types/types";
import { useActiveChatStore } from "@/app/store/activeChatStore";

interface Props {
  className?: string;
  sendMessage: (message: ISendMessage) => void;
}

export const MessageInput: React.FC<Props> = ({ className, sendMessage }) => {
  const [message, setMessage] = useState("");
  const activeChatStore = useActiveChatStore();

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage({
        message: message.trim(),
        chatId: activeChatStore.chatId,
        senderId: +JSON.parse(localStorage.getItem(USER) || "{}").id,
      });
      setMessage("");
    }
  };

  return (
    <div className={clsx(className, styles.wrapper)}>
      <MdOutlineAttachFile size={25} />
      <Input
        placeholder="Type message..."
        variant="borderless"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <IoSend
        size={25}
        className={clsx(styles.send, message && styles.active)}
        onClick={handleSendMessage}
      />
      <FaMicrophone size={25} />
    </div>
  );
};
