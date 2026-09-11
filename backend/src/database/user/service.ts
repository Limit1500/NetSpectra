import prisma from "../database";

class DatabaseUserService {
  static async createUser(username: string, password: string, email: string) {
    return await prisma.users.create({
      data: {
        username,
        password,
        email,
      },
    });
  }

  static async getOtherUserByUsername(username: string, id?: number) {
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

  static async getOtherUserByEmail(email: string, id?: number) {
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

export default DatabaseUserService;
