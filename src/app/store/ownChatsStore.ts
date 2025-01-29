import { create } from "zustand";

import {
  IChat,
  ILastMessagesInChat,
  IMessage,
  IUnreadCount,
} from "../shared/types/types";

interface State {
  chats: IChat[];
  lastMessagesInChat: ILastMessagesInChat[];
  unreadCount: IUnreadCount[];
  setChats: (chats: IChat[]) => void;
  addMessage: (chatId: number, message: IMessage) => void;
  addLastMessage: (messageInChat: ILastMessagesInChat) => void;
  markAsReadOwnLastMessage: (messageInChat: ILastMessagesInChat) => void;
  changeLastMessage: (messageInChat: ILastMessagesInChat) => void;
  setUnreadCount: (unreadCount: IUnreadCount[]) => void;
  changeUnreadCount: (unreadCount: IUnreadCount) => void;
}

export const useOwnChatsStore = create<State>()((set) => ({
  chats: [],
  lastMessagesInChat: [],
  unreadCount: [],
  setChats: (chats) => set({ chats }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id === chatId) {
          chat.chatInfo.messages = [...chat.chatInfo.messages, message];
          return chat;
        } else {
          return chat;
        }
      }),
    })),

  addLastMessage: (messageInChat) =>
    set((state) => ({
      lastMessagesInChat: [...state.lastMessagesInChat, messageInChat],
    })),

  markAsReadOwnLastMessage: (messageInChat) =>
    set((state) => ({
      lastMessagesInChat: state.lastMessagesInChat.map((message) => {
        if (message.chatId === messageInChat.chatId) {
          message.message.readedBy = messageInChat.message.readedBy;
          return message;
        } else {
          return message;
        }
      }),
    })),
  changeLastMessage: (messageInChat) =>
    set((state) => ({
      lastMessagesInChat: state.lastMessagesInChat.map((message) => {
        if (message.chatId === messageInChat.chatId) {
          message.message = messageInChat.message;
          return message;
        } else {
          return message;
        }
      }),
    })),

  setUnreadCount: (unreadCount) => set({ unreadCount }),
  changeUnreadCount: (unreadCount) =>
    set((state) => ({
      unreadCount: state.unreadCount.map((count) => {
        if (count.chatId === unreadCount.chatId) {
          count.count = unreadCount.count;
          return count;
        } else {
          return count;
        }
      }),
    })),
}));
