import { create } from "zustand";

import { IMessage } from "../shared/types/types";

interface State {
  messages: IMessage[];
  chatId: number;
  lastReadedMessageIdInChat: number;
  setChatId: (chatId: number) => void;
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
  readMessage: (message: IMessage) => void;
  setLastReadedMessageIdInChat: (messageId: number) => void;
}

export const useActiveChatStore = create<State>()((set) => ({
  messages: [],
  chatId: 0,
  lastReadedMessageIdInChat: 0,
  setChatId: (chatId) => set({ chatId }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  readMessage: (message: IMessage) =>
    set((state) => ({
      messages: state.messages.map((m) =>
        m.id === message.id ? { ...m, readedBy: message.readedBy } : m,
      ),
    })),
  setLastReadedMessageIdInChat: (messageId) =>
    set({ lastReadedMessageIdInChat: messageId }),
}));
