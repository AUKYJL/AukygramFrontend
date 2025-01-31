import clsx from "clsx";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from "react-icons/io5";

import styles from "./chatBlock.module.scss";
import { IChat, IMessage } from "@/app/shared/types/types";
import { timeToHHMM } from "@/app/shared/utils/utils";
import { useActiveChatStore } from "@/app/store/activeChatStore";
import { useUserStore } from "@/app/store/userStore";

interface Props {
  className?: string;
  chat: IChat;
  lastMessage?: IMessage;
  undreadCount: number;
}

export const ChatBlock: FC<Props> = ({
  className,
  chat,
  lastMessage,
  undreadCount,
}) => {
  const router = useRouter();
  const { chatId } = useParams();
  const userStore = useUserStore();
  const current = (chatId ? +chatId : -1) === chat.id;
  const activeChatStore = useActiveChatStore();

  const handleClick = () => {
    activeChatStore.setChatId(chat.id);
    activeChatStore.setChatName(chat.name);
    router.push(`/messages/${chat.id}`);
  };

  return (
    <div
      className={clsx(className, styles.block, current && styles.current)}
      onClick={handleClick}
    >
      <Image
        src={"https://cdn-icons-png.flaticon.com/512/6858/6858504.png"}
        width={35}
        height={35}
        alt="avatar"
        className={styles.img}
      />
      <div className={styles.text}>
        <h6 className={styles.name}>
          {chat.name}
          {chat.name}
        </h6>
        {/* <h6 className={styles.name}>chat</h6> */}
        {lastMessage && <p className={styles.message}>{lastMessage.text}</p>}
      </div>
      <div className={styles.info}>
        {lastMessage && (
          <div className={styles.time}>{timeToHHMM(lastMessage.createdAt)}</div>
        )}
        <div className={styles.icon}>
          {undreadCount > 0 && (
            <span className={styles.unreadCount}>{undreadCount}</span>
          )}
          {lastMessage && (
            <>
              {lastMessage?.sendBy.id === userStore.id ? (
                lastMessage.readedBy.length > 0 ? (
                  <IoCheckmarkDoneSharp size={15} />
                ) : (
                  <IoCheckmarkSharp size={15} />
                )
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
