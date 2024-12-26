import api from "../shared/api/axiosInstance";
import { IChatInfo } from "../shared/types/types";

class UserService {
  public getUserChats() {
    return api.get<IChatInfo>("users/ownChats");
  }
}
export const userService = new UserService();
