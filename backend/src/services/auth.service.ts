import AppError from "../types/error.types";
import UserDatabaseService from "./userDatabase.service";
import argon2 from "argon2";

class AuthService {
  static async login(username: string, password: string) {
    const user = await UserDatabaseService.getUserByUsername(username);

    if (!user || !(await argon2.verify(user.password, password))) {
      throw new AppError(401, "Invalid credentials");
    }

    return user;
  }

  static async signin(username: string, password: string, email: string) {
    const hashedPassword = await argon2.hash(password);
    await UserDatabaseService.createUser(username, hashedPassword, email);
  }
}

export default AuthService;
