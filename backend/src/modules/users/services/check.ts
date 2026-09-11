import DatabaseTokenService from "../../../database/token/service";
import argon2 from "argon2";
import AppError from "../../../errors/types";
import DatabaseUserService from "../../../database/user/service";
import { DatabaseTokenPurpose } from "../../../database/token/type";

class UsersCheckService {
  static async checkUniqueCredentials(
    username: string,
    email: string,
    id: number
  ) {
    const usernameExists = (await DatabaseUserService.getOtherUserByUsername(
      username,
      id
    ))
      ? true
      : false;

    const emailExists = (await DatabaseUserService.getOtherUserByEmail(
      email,
      id
    ))
      ? true
      : false;

    if (usernameExists) {
      throw new AppError(409, "Username already exists");
    } else if (emailExists) {
      throw new AppError(409, "Email already exists");
    }
  }

  static async checkDatabaseToken(
    userId: number,
    token: string,
    purpose: DatabaseTokenPurpose
  ) {
    const userSavedTokens = await DatabaseTokenService.getUserTokens(userId);

    for (const tokenInstance of userSavedTokens) {
      if (
        tokenInstance.purpose === purpose &&
        (await argon2.verify(tokenInstance.tokenHash, token))
      ) {
        await DatabaseTokenService.deleteToken(tokenInstance.id);
        return;
      }
    }
    throw new AppError(401, "The verification link is invalid or has expired.");
  }
}

export default UsersCheckService;
