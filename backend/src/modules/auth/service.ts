import argon2 from "argon2";
import AppError from "../../errors/types";
import DatabaseUserService from "../../database/user/service";
import { DatabaseUserType } from "../../database/user/type";

class AuthService {
  static async login(
    username: string,
    password: string
  ): Promise<DatabaseUserType> {
    const user = await DatabaseUserService.getOtherUserByUsername(username);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    const { password: hashedPassword } = user;

    const passwordMatches = await argon2.verify(hashedPassword, password);

    if (passwordMatches === false) {
      throw new AppError(401, "Wrong password");
    }

    return user;
  }

  static async signin(username: string, password: string, email: string) {
    const hashedPassword = await argon2.hash(password);

    const usernameExists = (await DatabaseUserService.getOtherUserByUsername(
      username
    ))
      ? true
      : false;

    const emailExists = (await DatabaseUserService.getOtherUserByEmail(email))
      ? true
      : false;

    if (usernameExists) {
      throw new AppError(409, "Username already exists");
    } else if (emailExists) {
      throw new AppError(409, "Email already exists");
    }

    await DatabaseUserService.createUser(username, hashedPassword, email);
  }
}

export default AuthService;
