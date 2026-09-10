import { EmailTokenPurpose } from "../../../../generated/prisma/enums";
import EmailTokenDatabaseService from "../../../database/token/service";
import argon2 from "argon2";
import AppError from "../../../common/errors/types";
import UserDatabaseService from "../../../database/user/service";

class AuthUserDataUpdatesService {
  static async checkUniqueCredentials(
    username: string,
    email: string,
    id: number
  ) {
    const usernameExists = (await UserDatabaseService.getOtherUserByUsername(
      username,
      id
    ))
      ? true
      : false;

    const emailExists = (await UserDatabaseService.getOtherUserByEmail(
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
    purpose: EmailTokenPurpose
  ) {
    const userSavedTokens = await EmailTokenDatabaseService.getUserTokens(
      userId
    );

    for (const tokenInstance of userSavedTokens) {
      if (
        tokenInstance.purpose === purpose &&
        (await argon2.verify(tokenInstance.tokenHash, token))
      ) {
        await EmailTokenDatabaseService.deleteToken(tokenInstance.id);
        return;
      }
    }
    throw new AppError(401, "The verification link is invalid or has expired.");
  }
}

export default AuthUserDataUpdatesService;
