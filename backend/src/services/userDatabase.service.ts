import prisma from "../db";

class UserDatabaseService {
  static async createUser(username: string, password: string, email: string) {
    await prisma.users.create({
      data: {
        username,
        password,
        email,
      },
    });
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
