import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../../errors/types";

async function userAuth(req: FastifyRequest, _reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch (error) {
    throw new AppError(401, "Unauthorized");
  }
}

export default userAuth;
