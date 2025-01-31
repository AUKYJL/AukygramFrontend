import api from "../shared/api/axiosInstance";
import { IChat, IMessage } from "../shared/types/types";

class ChatService {
  public getChat(chatId: number) {
    return api.get<IChat>(`chats/${chatId}`);
  }
  public getLastMessage(chatId: number) {
    return api.get<IMessage>(`chats/${chatId}/lastMessage`);
  }
  public getMessages(chatId: number) {
    return api.get<IMessage[]>(`chats/${chatId}/messages`);
  }
}
export const chatService = new ChatService();
