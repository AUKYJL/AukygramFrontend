import api from "../shared/api/axiosInstance";
import { IMessage } from "../shared/types/types";

class ChatService {
  public getLastMessage(chatId: number) {
    return api.get<IMessage>(`chats/${chatId}/lastMessage`);
  }
  public getMessages(chatId: number) {
    return api.get<IMessage[]>(`chats/${chatId}/messages`);
  }
}
export const chatService = new ChatService();
