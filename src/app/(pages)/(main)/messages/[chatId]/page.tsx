"use client";

import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import style from "./messagesChatId.module.scss";
import { chatService } from "@/app/services/chatService";
import { Chat } from "@/app/shared/ui/chat/chat";
import { useActiveChatStore } from "@/app/store/activeChatStore";

export const MessageChatIdPage = () => {
  const activeChatStore = useActiveChatStore();
  const { chatId } = useParams();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => chatService.getMessages(+chatId!),
    enabled: !!chatId,
    select: (data) => data.data,
  });
  useEffect(() => {
    activeChatStore.setChatId(+chatId!);
    activeChatStore.setMessages(data!);
  }, [isSuccess]);
  if (!data)
    return (
      <div className={style.spinner}>
        <Spin size="large"></Spin>
      </div>
    );
  return <div className={style.page}>{data && <Chat />}</div>;
};

export default MessageChatIdPage;
