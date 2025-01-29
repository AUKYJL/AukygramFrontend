import api from "../shared/api/axiosInstance";
import { IOwnChat } from "../shared/types/types";

class UserService {
  public getUserChats() {
    return api.get<IOwnChat>("users/ownChats");
  }
}
export const userService = new UserService();
