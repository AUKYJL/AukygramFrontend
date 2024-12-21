import api from "../shared/api/axiosInstance";
import { ILoginDTO, IRegisterDTO } from "../shared/types/types";

class AuthService {
  public login(loginDTO: ILoginDTO) {
    return api.post("auth/login", loginDTO);
  }
  public register(registerDTO: IRegisterDTO) {
    return api.post("auth/register", registerDTO);
  }
  public logout() {}
  public profile() {}
}

export const authService = new AuthService();
