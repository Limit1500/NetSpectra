import { EmailTokenPurpose } from "../../../../generated/prisma/enums";
import EmailTokenDatabaseService from "../../../services/database/tokens";
import argon2 from "argon2";
import { env } from "../../../config/env.config";
import AppError from "../../../common/types/error.types";
import UserDatabaseService from "../../../services/database/user";
import { sendUserEmail } from "../../../services/email/user";

class AuthUserDataUpdatesService {
  static async processAndSendEmail(
    username: string,
    id: number,
    purpose: EmailTokenPurpose
  ) {
    const token = EmailTokenDatabaseService.generateToken();
    const hashedToken = await argon2.hash(token);

    await EmailTokenDatabaseService.postToken(id, hashedToken, purpose);

    const user = await UserDatabaseService.getOtherUserByEmail(username);
    const email = user!.email;

    const confirmationUrl = `${
      env.FRONTEND_URL
    }/confirm/?purpose=${purpose.toLowerCase()}&token=${token}`;

    await sendUserEmail(email, confirmationUrl, purpose);
  }

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
