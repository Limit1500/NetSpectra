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

  static async getUserByUsername(username: string, id?: number) {
    return await prisma.users.findFirst({
      where: {
        username,
        ...(id !== undefined && {
          NOT: {
            id,
          },
        }),
      },
    });
  }

  static async getUserByEmail(email: string, id?: number) {
    return await prisma.users.findFirst({
      where: {
        email,
        ...(id !== undefined && {
          NOT: {
            id,
          },
        }),
      },
    });
  }

  static async getUserById(id: number) {
    return await prisma.users.findUnique({
      where: {
        id,
      },
    });
  }

  static async deleteUser(id: number) {
    return await prisma.users.delete({
      where: {
        id,
      },
    });
  }

  static async patchUser(
    id: number,
    username: string,
    hashedPassword: string,
    email: string
  ) {
    return await prisma.users.update({
      where: {
        id,
      },
      data: {
        username,
        password: hashedPassword,
        email,
        updatedAt: new Date(),
      },
    });
  }
}

export default UserDatabaseService;
