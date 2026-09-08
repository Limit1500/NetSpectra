import { FastifyReply, FastifyRequest } from "fastify";
import UserDatabaseService from "../services/userDatabase.service";
import { EmailTokenPurpose } from "../../generated/prisma/enums";
import { SigninBody } from "../types/auth.types";
import AuthUserDataUpdatesService from "../services/authUserDataUpdates.service";
import argon2 from "argon2";

class UserController {
  static async getUserData(req: FastifyRequest, reply: FastifyReply) {
    const { username } = req.user as { username: string };
    const data = await UserDatabaseService.getUserByUsername(username);

    return reply.status(200).send(data);
  }

  private static async requestUserDataUpdate(
    req: FastifyRequest,
    reply: FastifyReply,
    purpose: EmailTokenPurpose
  ) {
    const { username, id } = req.user as { username: string; id: number };

    await AuthUserDataUpdatesService.processAndSendEmail(username, id, purpose);

    return reply
      .status(200)
      .send({ message: "Verification email sent successfully" });
  }

  static async patchUserData(req: FastifyRequest, reply: FastifyReply) {
    return UserController.requestUserDataUpdate(req, reply, "PATCH");
  }

  static async deleteUserData(req: FastifyRequest, reply: FastifyReply) {
    return UserController.requestUserDataUpdate(req, reply, "DELETE");
  }

  static async verifyDelete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.user as { id: number };
    const { token } = req.params as { token: string };

    await AuthUserDataUpdatesService.checkDatabaseToken(id, token, "DELETE");
    await UserDatabaseService.deleteUser(id);

    return reply.status(200).send({ message: "User deleted successfully" });
  }

  static async verifyPatch(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.user as { id: number };
    const { token } = req.params as { token: string };

    await AuthUserDataUpdatesService.checkDatabaseToken(id, token, "PATCH");

    const { username, password, email } = req.body as SigninBody;
    const hashedPassword = await argon2.hash(password);
    await UserDatabaseService.patchUser(id, username, hashedPassword, email);

    return reply.status(200).send({ message: "User patched successfully" });
  }
}

export default UserController;
