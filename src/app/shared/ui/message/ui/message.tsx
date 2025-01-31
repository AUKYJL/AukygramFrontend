import clsx from "clsx";
import React from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";

import { IMessage } from "../../../types/types";
import { timeToHHMM } from "../../../utils/utils";
import { MessageSender } from "../../messageSender";
import { useMessage } from "../model/useMessage";

import styles from "./message.module.scss";

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
  const { isOwn, intersectionRef } = useMessage(message);
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
