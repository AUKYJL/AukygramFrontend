import clsx from "clsx";
import React from "react";

import { IMessage } from "../../types/types";
import { Message } from "../message/message";

import styles from "./chat.module.scss";

interface Props {
  className?: string;
  messages: IMessage[];
}

export const Chat: React.FC<Props> = ({ className, messages }) => {
  return (
    <div className={clsx(className, styles.chat)}>
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          showSender={
            messages[index - 1]?.sendBy.id !== message.sendBy.id ? true : false
          }
        />
      ))}
    </div>
  );
};
