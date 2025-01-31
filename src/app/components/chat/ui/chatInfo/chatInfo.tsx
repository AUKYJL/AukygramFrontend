import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import styles from "./chatInfo.module.scss";
import { useActiveChatStore } from "@/app/store/activeChatStore";

interface Props {
  className?: string;
}

export const ChatInfo: FC<Props> = ({ className }) => {
  const activeChatStore = useActiveChatStore();
  const router = useRouter();
  const goBack = () => {
    router.push("/messages");
  };
  return (
    <div className={clsx(className, styles.chatInfo)}>
      <div className={styles.leftBlock}>
        <button className={styles.icon} onClick={goBack}>
          <IoMdArrowRoundBack size={20} />
        </button>

        <p>{activeChatStore.chatName}</p>
      </div>

      <div className={styles.other}>other settings</div>
    </div>
  );
};
