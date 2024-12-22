"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import api from "@/app/shared/api/axiosInstance";
import { IMessage } from "@/app/shared/types/types";
import { Chat } from "@/app/shared/ui/chat/chat";

export const MessageChatIdPage = () => {
  const { chatId } = useParams();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["messages", chatId],
    queryFn: () => api.get(`chats/${chatId}/messages`),
    enabled: !!chatId,
    select: (data) => data.data,
  });

  useEffect(() => {
    console.log(data);
  }, [isSuccess, data]);

  return (
    <div style={{ width: "100%" }}>
      {data && <Chat messages={data as IMessage[]} />}
    </div>
  );
};

export default MessageChatIdPage;
