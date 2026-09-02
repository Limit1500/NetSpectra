import { FastifyReply, FastifyRequest } from "fastify";
import JwtService from "../services/jwt.service";
import AuthService from "../services/auth.service";
import { DbUserType, LoginBody, SigninBody } from "../types/auth.types";

class AuthController {
  static async signin(req: FastifyRequest, reply: FastifyReply) {
    const { username, password, email } = req.body as SigninBody;
    await AuthService.signin(username, password, email);
    reply.code(200).send({ message: "Signin successful" });
  }

  static async login(
    req: FastifyRequest<{
      Body: LoginBody;
    }>,
    reply: FastifyReply
  ) {
    const { password } = req.body as LoginBody;
    const user = (await AuthService.login(
      req.body.username,
      req.body.password
    )) as DbUserType;

    const token = JwtService.generateToken(user.id, password);
    reply
      .setCookie("token", token, {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60,
      })
      .send({
        message: "Login successful",
      });
  }

  static logout(req: FastifyRequest, reply: FastifyReply) {
    reply
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
