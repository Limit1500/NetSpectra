import prisma from "../../src/db";
import argon2 from "argon2";

export async function createTestUser() {
  const hashedPassword = await argon2.hash("password");

  return await prisma.users.create({
    data: {
      username: "username",
      password: hashedPassword,
      email: "example@gmail.com",
    },
  });
}

export async function deleteTestUser() {
  await prisma.users.delete({
    where: {
      username: "username",
    },
  });
}
