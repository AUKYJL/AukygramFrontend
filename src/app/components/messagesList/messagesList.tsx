import clsx from "clsx";
import React, { createRef, useEffect } from "react";

import styles from "./messagesList.module.scss";
import { Message } from "@/app/shared/ui/message/message";
import { useActiveChatStore } from "@/app/store/activeChatStore";

interface Props {
  className?: string;
}

export const MessagesList: React.FC<Props> = ({ className }) => {
  const { messages } = useActiveChatStore();
  const messagesListRef = createRef<HTMLUListElement>();
  useEffect(() => {
    if (messagesListRef.current) {
      messagesListRef.current?.scrollTo(
        0,
        messagesListRef.current.scrollHeight,
      );
    }
  }, [messagesListRef]);
  return (
    <ul ref={messagesListRef} className={clsx(className, styles.list)}>
      {messages &&
        messages.map((message, index) => (
          <li className={styles.listItem} key={message.id}>
            <Message
              message={message}
              showSender={
                index === 0
                  ? true
                  : messages[index - 1]?.sendBy.id !== message.sendBy.id
                    ? true
                    : false
              }
            />
          </li>
        ))}
    </ul>
  );
};
