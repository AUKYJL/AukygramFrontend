import clsx from "clsx";
import React from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";

import { IMessage } from "../../types/types";
import { timeToHHMM } from "../../utils/utils";
import { MessageSender } from "../messageSender/messageSender";

import styles from "./message.module.scss";
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
  const userStore = useUserStore();
  const isOwn = message.sendBy.id === userStore.id;
  return (
    <div
      className={clsx(className, styles.messageWrapper, isOwn && styles.own)}
    >
      {showSender && <MessageSender sender={message.sendBy} isOwn={isOwn} />}

      <div className={clsx(styles.message)}>
        <p>{message.text}</p>
        <div className={styles.bottom}>
          <span className={styles.time}>{timeToHHMM(message.createdAt)}</span>
          {message.readedBy.length > 0 ? (
            <IoCheckmarkDoneSharp size={15} />
          ) : (
            <IoCheckmarkSharp size={15} />
          )}
        </div>
      </div>
    </div>
  );
};
