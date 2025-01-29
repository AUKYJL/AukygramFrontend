import { useDebounce } from "react-use";

import { chatUserService } from "@/app/services/chatUserService";
import { useActiveChatStore } from "@/app/store/activeChatStore";
import { useUserStore } from "@/app/store/userStore";

export const useSetLastReadedMessageId = () => {
  const userStore = useUserStore();
  const activeChatStore = useActiveChatStore();

  const [, cancelDebounce] = useDebounce(
    async () => {
      const lastId = activeChatStore.lastReadedMessageIdInChat;

      if (lastId > activeChatStore.lastReadedMessageIdInChat) {
        await chatUserService.setLastReadedMessageId({
          chatId: activeChatStore.chatId,
          userId: userStore.id!,
          messageId: lastId,
        });
        activeChatStore.setLastReadedMessageIdInChat(lastId);
      }
    },
    1000,
    [activeChatStore.lastReadedMessageIdInChat],
  );

  const setLastReadedId = (messageId: number) => {
    activeChatStore.setLastReadedMessageIdInChat(messageId);
  };

  return { setLastReadedId, cancelDebounce };
};
