import { FastifyReply, FastifyRequest } from "fastify";
import UsersService from "./service";
import { SigninBody } from "../auth/types";
import { DatabaseTokenPurpose } from "../../database/token/type";

class UserController {
  static async getUserData(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.user as { id: number };

    const user = await UsersService.getUser(id);

    return reply.status(200).send(user);
  }

  static async requestUserDataUpdate(req: FastifyRequest, reply: FastifyReply) {
    const { username, id } = req.user as { username: string; id: number };
    const purpose = req.method as DatabaseTokenPurpose;

    await UsersService.createTokenAndSendEmail(username, id, purpose);

    return reply
      .status(200)
      .send({ message: "Verification email sent successfully" });
  }

  static async processDelete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.user as { id: number };
    const { token } = req.params as { token: string };

    await UsersService.tryDelete(id, token, "DELETE");

    return reply.status(200).send({ message: "User deleted successfully" });
  }

  static async processPatch(
    req: FastifyRequest<{ Body: SigninBody }>,
    reply: FastifyReply
  ) {
    const { id } = req.user as { id: number };
    const { token } = req.params as { token: string };
    const { username, password, email } = req.body;

    UsersService.tryPatch(username, password, email, id, token);

    return reply.status(200).send({ message: "User patched successfully" });
  }
}

export default UserController;
