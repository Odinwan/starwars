import { AuthServiceInterface } from "./interfaces";
import { AuthService } from "./AccountInfoService";

/**
 * Фабрика сервиса загрузки информации об аккаунтах пользователей
 *
 * @param token
 */
export const authService: { (token?: string): AuthServiceInterface } = (token) => {
  return new AuthService(token);
};
