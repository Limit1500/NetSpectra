import crypto from "crypto";
import { EmailTokenPurpose } from "../../generated/prisma/enums";
import prisma from "../db";

class EmailTokenService {
  static generateToken() {
    return crypto.randomBytes(32).toString("hex");
  }

  static async getUserTokens(userId: number) {
    return await prisma.email_tokens.findMany({
      where: {
        userId,
      },
    });
  }

  static async deleteToken(id: number) {
    return await prisma.email_tokens.delete({
      where: {
        id,
      },
    });
  }

  static async postToken(
    userId: number,
    tokenHash: string,
    purpose: EmailTokenPurpose
  ) {
    return await prisma.email_tokens.create({
      data: {
        tokenHash,
        userId,
        purpose,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    });
  }

  static async deleteExpiredTokens() {
    return await prisma.email_tokens.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export default EmailTokenService;
