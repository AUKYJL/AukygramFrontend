"use client";

import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import styles from "./messagesChatId.module.scss";
import { Chat } from "@/app/components/chat";
import { chatService } from "@/app/services/chatService";
import { useActiveChatStore } from "@/app/store/activeChatStore";

export const MessageChatIdPage = () => {
  const activeChatStore = useActiveChatStore();
  const { chatId } = useParams();
  const router = useRouter();
  const { data: chat, isSuccess } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => chatService.getChat(+chatId!),
    enabled: !!chatId,
    select: (data) => data.data,
  });
  useEffect(() => {
    if (isSuccess) {
      if (!chat) router.push("/messages");
      else {
        activeChatStore.setChatId(chat.id);
        activeChatStore.setChatName(chat.name);
        activeChatStore.setMessages(chat.chatInfo.messages);
      }
    }
  }, [isSuccess]);
  if (!chat)
    return (
      <div className={styles.spinner}>
        <Spin size="large"></Spin>
      </div>
    );
  return <div className={styles.page}>{chat && <Chat />}</div>;
};

export default MessageChatIdPage;
