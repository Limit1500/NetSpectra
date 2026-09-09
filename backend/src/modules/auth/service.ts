import argon2 from "argon2";
import { DbUserType } from "../../common/types/auth.types";
import AppError from "../../common/types/error.types";
import UserDatabaseService from "../../services/database/user";

class AuthService {
  static async login(username: string, password: string): Promise<DbUserType> {
    const user = await UserDatabaseService.getOtherUserByUsername(username);

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

    const usernameExists = (await UserDatabaseService.getOtherUserByUsername(
      username
    ))
      ? true
      : false;

    const emailExists = (await UserDatabaseService.getOtherUserByEmail(email))
      ? true
      : false;

    if (usernameExists) {
      throw new AppError(409, "Username already exists");
    } else if (emailExists) {
      throw new AppError(409, "Email already exists");
    }

    await UserDatabaseService.createUser(username, hashedPassword, email);
  }
}

export default AuthService;
