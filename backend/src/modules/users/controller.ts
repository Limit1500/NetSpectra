import { FastifyReply, FastifyRequest } from "fastify";
import UsersService from "./service";
import AuthUserDataUpdatesService from "./services/authUserDataUpdates";
import { EmailTokenPurpose } from "../../../generated/prisma/enums";
import UserDatabaseService from "../../services/database/user";
import { SigninBody } from "../../common/types/auth.types";

class UserController {
  static async getUserData(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.user as { id: number };

    const user = await UsersService.getUser(id);

    return reply.status(200).send(user);
  }

  static async requestUserDataUpdate(req: FastifyRequest, reply: FastifyReply) {
    const { username, id } = req.user as { username: string; id: number };
    const purpose = req.method as EmailTokenPurpose;

    await AuthUserDataUpdatesService.processAndSendEmail(username, id, purpose);

    return reply
      .status(200)
      .send({ message: "Verification email sent successfully" });
  }

  static async processDelete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.user as { id: number };
    const { token } = req.params as { token: string };

    await AuthUserDataUpdatesService.checkDatabaseToken(id, token, "DELETE");
    await UserDatabaseService.deleteUser(id);

    return reply.status(200).send({ message: "User deleted successfully" });
  }

  static async processPatch(
    req: FastifyRequest<{ Body: SigninBody }>,
    reply: FastifyReply
  ) {
    const { id } = req.user as { id: number };
    const { token } = req.params as { token: string };

    const { username, password, email } = req.body;

    UsersService.verifyPatch(username, password, email, id, token);

    return reply.status(200).send({ message: "User patched successfully" });
  }
}

export default UserController;
