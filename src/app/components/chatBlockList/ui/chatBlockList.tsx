import { Skeleton } from "antd";
import clsx from "clsx";
import { FC } from "react";

import { ChatBlock } from "../../chatBlock";
import { useChatBlockList } from "../model/useChatBlockList";

import style from "./chatBlockList.module.scss";

interface Props {
  className?: string;
}

export const ChatBlockList: FC<Props> = ({ className }) => {
  const { ownChatsStore, isLoading } = useChatBlockList();
  if (isLoading)
    return (
      <div className={style.skeletons}>
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton.Button key={index} block size="large" />
        ))}
      </div>
    );

  return (
    <ul className={clsx(style.list, className)}>
      {ownChatsStore.chats && ownChatsStore.lastMessagesInChat ? (
        ownChatsStore.chats.map((chat, i) => {
          const lastMessage = ownChatsStore.lastMessagesInChat.find(
            (message) => message.chatId === chat.id,
          )?.message;

          return (
            <li key={chat.id}>
              <ChatBlock
                chat={chat}
                lastMessage={lastMessage}
                undreadCount={ownChatsStore.unreadCount[i].count}
              />
            </li>
          );
        })
      ) : (
        <div>no chats</div>
      )}
    </ul>
  );
};
