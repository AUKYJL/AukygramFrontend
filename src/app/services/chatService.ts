import api from "../shared/api/axiosInstance";
import { IMessage } from "../shared/types/types";

class ChatService {
  public getLastMessage(chatId: number) {
    return api.get<IMessage>(`chats/${chatId}/lastMessage`);
  }
}
export const chatService = new ChatService();
