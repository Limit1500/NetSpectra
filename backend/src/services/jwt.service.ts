import { env } from "process";
import { app } from "../app";

export class JwtService {
  static generateToken(userId: number, username: string) {
    return app.jwt.sign(
      {
        userId,
        username,
      },
      {
        expiresIn: env.JWT_EXPIRES_IN || "1h",
      }
    );
  }
}

export default JwtService;
