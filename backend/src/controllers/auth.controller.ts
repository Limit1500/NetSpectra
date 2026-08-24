import { FastifyReply, FastifyRequest } from "fastify";
import JwtService from "../services/jwt.service";
import AuthService from "../services/auth.service";
import { DbUserType, LoginBody, SigninBody } from "../types/auth.types";

class AuthController {
  static async signin(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { username, password, email } = req.body as SigninBody;
      await AuthService.signin(username, password, email);
      reply.code(200).send();
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  static async login(
    req: FastifyRequest<{
      Body: LoginBody;
    }>,
    reply: FastifyReply
  ) {
    try {
      const { password } = req.body as LoginBody;
      const user = (await AuthService.login(
        req.body.username,
        req.body.password
      )) as DbUserType;

      const token = JwtService.generateToken(user.id, password);

      reply
        .setCookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        })
        .send({
          message: "Login successful",
        });
    } catch (error) {
      reply.code(500).send(error);
    }
  }

  static logout(req: FastifyRequest, reply: FastifyReply) {
    try {
      reply
        .clearCookie("token", {
          path: "/",
        })
        .code(200)
        .send();
    } catch (error) {
      reply.code(500).send(error);
    }
  }
}

export default AuthController;
