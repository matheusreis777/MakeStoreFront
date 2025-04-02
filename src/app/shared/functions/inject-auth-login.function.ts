import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";


export const injectAuthLoginService = () => {
  const authService = inject(AuthService);
  return authService.login;
};
