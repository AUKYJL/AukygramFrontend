import { create } from "zustand";

import { IMessage } from "../shared/types/types";

interface State {
  messages: IMessage[];
  chatId: number;
  setChatId: (chatId: number) => void;
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
}

export const useActiveChatStore = create<State>()((set) => ({
  messages: [],
  chatId: 0,
  setChatId: (chatId) => set({ chatId }),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));
