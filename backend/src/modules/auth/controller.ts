import { FastifyReply, FastifyRequest } from "fastify";
import { LoginBody, SigninBody } from "../../common/types/auth.types";
import JwtService from "../../services/jwt";
import AuthService from "./service";

class AuthController {
  static async signin(
    req: FastifyRequest<{
      Body: SigninBody;
    }>,
    reply: FastifyReply
  ) {
    const { username, password, email } = req.body;

    await AuthService.signin(username, password, email);

    return reply.code(200).send({ message: "Signin successful" });
  }

  static async login(
    req: FastifyRequest<{
      Body: LoginBody;
    }>,
    reply: FastifyReply
  ) {
    const { password, username } = req.body;

    const user = await AuthService.login(username, password);

    const token = JwtService.generateToken(user.id, username);
    return reply
      .setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        ...(req.body.rememberUser && {
          maxAge: 60 * 60 * 24 * 30,
        }),
      })
      .send({
        message: "Login successful",
      });
  }

  static logout(_req: FastifyRequest, reply: FastifyReply) {
    return reply
      .clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      })
      .code(200)
      .send({ message: "Logout successful" });
  }
}

export default AuthController;
