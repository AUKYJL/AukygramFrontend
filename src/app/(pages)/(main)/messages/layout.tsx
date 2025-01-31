"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import styles from "./messagesLayout.module.scss";
import { MessagesSideBar } from "@/app/components/messagesSideBar";
import { useActiveChatStore } from "@/app/store/activeChatStore";

export const MessagesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { chatId } = useParams();
  const [active, setActive] = useState(!!chatId);
  const activeChatStore = useActiveChatStore();
  useEffect(() => {
    setActive(!!chatId);
  }, [activeChatStore.chatId, chatId]);
  return (
    <section className={styles.section}>
      <div className={clsx(styles.chat, active && styles._active)}>
        {children}
      </div>

      <MessagesSideBar />
    </section>
  );
};
export default MessagesLayout;
