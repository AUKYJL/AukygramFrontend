import api from "../shared/api/axiosInstance";
import { IChatUser, ISetLastReadedMessageDTO } from "../shared/types/types";

class ChatUserService {
  public getLastReadedMessage(chatId: number) {
    return api.get<number>(`chatUsers/lastReadedMessageId/${chatId}`);
  }
  public setLastReadedMessageId(dto: ISetLastReadedMessageDTO) {
    return api.post<IChatUser>(`chatUsers/lastReadedMessageId`, dto);
  }
}
export const chatUserService = new ChatUserService();
