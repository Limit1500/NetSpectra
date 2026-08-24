import { app } from "../server";

export class JwtService {
  static generateToken(userId: number, username: string) {
    return app.jwt.sign({
      userId,
      username,
    });
  }
}

export default JwtService;
