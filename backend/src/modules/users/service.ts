import AppError from "../../errors/types";
import { env } from "../../config/env";
import DatabaseTokenService from "../../database/token/service";
import DatabaseUserService from "../../database/user/service";
import { sendUserEmail } from "./email";
import UsersCheckService from "./services/check";
import argon2 from "argon2";
import { DatabaseTokenPurpose } from "../../database/token/type";

class UsersService {
  static async getUser(id: number) {
    const user = await DatabaseUserService.getUserById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  static async createTokenAndSendEmail(
    username: string,
    id: number,
    purpose: DatabaseTokenPurpose
  ) {
    const token = DatabaseTokenService.generateToken();
    const hashedToken = await argon2.hash(token);

    await DatabaseTokenService.postToken(id, hashedToken, purpose);

    const user = await DatabaseUserService.getOtherUserByEmail(username);
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
    await UsersCheckService.checkUniqueCredentials(username, email, id);

    await UsersCheckService.checkDatabaseToken(id, token, "PATCH");

    const hashedPassword = await argon2.hash(password);

    await DatabaseUserService.patchUser(id, username, hashedPassword, email);
  }

  static async tryDelete(
    id: number,
    token: string,
    purpose: DatabaseTokenPurpose
  ) {
    await UsersCheckService.checkDatabaseToken(id, token, purpose);
    await DatabaseUserService.deleteUser(id);
  }
}

export default UsersService;
