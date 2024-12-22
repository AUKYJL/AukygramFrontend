import api from "../shared/api/axiosInstance";
import { IChat } from "../shared/types/types";

class UserService {
  public getUserChats() {
    return api.get<IChat[]>("users/ownChats");
  }
}
export const userService = new UserService();
