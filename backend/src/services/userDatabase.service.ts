import prisma from "../db";
import AppError from "../types/error.types";

class UserDatabaseService {
  static async createUser(username: string, password: string, email: string) {
    try {
      await prisma.users.create({
        data: {
          username,
          password,
          email,
        },
      });
    } catch (error: unknown) {
      const prismaError = error as { code?: string };

      if (prismaError.code === "P2002") {
        throw new AppError(409, "Username or email already exists");
      }

      throw error;
    }
  }

  static async getUserByUsername(username: string) {
    return await prisma.users.findUnique({
      where: {
        username,
      },
    });
  }
}

export default UserDatabaseService;
