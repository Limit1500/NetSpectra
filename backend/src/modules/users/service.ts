import AppError from "../../common/types/error.types";
import UserDatabaseService from "../../services/database/user";
import AuthUserDataUpdatesService from "./services/authUserDataUpdates";
import argon2 from "argon2";

class UsersService {
  static async getUser(id: number) {
    const user = await UserDatabaseService.getUserById(id);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  }

  static async verifyPatch(
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
}

export default UsersService;
