import { EmailTokenPurpose } from "../../../generated/prisma/enums";
import AppError from "../../common/errors/types";
import { env } from "../../config/env";
import EmailTokenService from "../../database/token/service";
import UserDatabaseService from "../../database/user/service";
import { sendUserEmail } from "./email";
import AuthUserDataUpdatesService from "./services/check";
import argon2 from "argon2";

class UsersService {
  static async getUser(id: number) {
    const user = await UserDatabaseService.getUserById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  static async createTokenAndSendEmail(
    username: string,
    id: number,
    purpose: EmailTokenPurpose
  ) {
    const token = EmailTokenService.generateToken();
    const hashedToken = await argon2.hash(token);

    await EmailTokenService.postToken(id, hashedToken, purpose);

    const user = await UserDatabaseService.getOtherUserByEmail(username);
    const email = user!.email;

    const confirmationUrl = `${
      env.FRONTEND_URL
    }/confirm/?purpose=${purpose.toLowerCase()}&token=${token}`;

    await sendUserEmail(email, confirmationUrl, purpose);
  }

  static async tryPatch(
    username: string,
    password: string,
    email: string,
    id: number,
    token: string
  ) {
    await AuthUserDataUpdatesService.checkUniqueCredentials(
      username,
      email,
      id
    );

    await AuthUserDataUpdatesService.checkDatabaseToken(id, token, "PATCH");

    const hashedPassword = await argon2.hash(password);

    await UserDatabaseService.patchUser(id, username, hashedPassword, email);
  }

  static async tryDelete(
    id: number,
    token: string,
    purpose: EmailTokenPurpose
  ) {
    await AuthUserDataUpdatesService.checkDatabaseToken(id, token, purpose);
    await UserDatabaseService.deleteUser(id);
  }
}

export default UsersService;
