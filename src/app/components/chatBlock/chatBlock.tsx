import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import styles from "./chatBlock.module.scss";
import { IChat, IMessage } from "@/app/shared/types/types";
import { timeToHHMM } from "@/app/shared/utils/utils";

interface Props {
  className?: string;
  chat: IChat;
  lastMessage: IMessage;
}

export const ChatBlock: React.FC<Props> = ({
  className,
  chat,
  lastMessage,
}) => {
  const router = useRouter();
  return (
    <div
      className={clsx(className, styles.block, styles.current)}
      onClick={() => {
        router.push(`/messages/${chat.id}`);
      }}
    >
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
        width={35}
        height={35}
        alt="avatar"
        className={styles.img}
      />
      <div className={styles.text}>
        <h6 className={styles.name}>{chat.name}</h6>
        <p className={styles.message}>{lastMessage.text?.slice(0, 20)}...</p>
      </div>
      <div className={styles.info}>
        <div className={styles.time}>{timeToHHMM(lastMessage.createdAt)}</div>
        <div className={styles.icon}>
          <span className={styles.unreadCount}>100</span>
          {/* <IoCheckmarkDoneSharp size={15} /> */}

          {/* <IoCheckmarkSharp size={15} /> */}
        </div>
      </div>
    </div>
  );
};
