import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../types/error.types";

async function userAuth(req: FastifyRequest, reply: FastifyReply) {
  try {
    await req.jwtVerify();
  } catch {
    throw new AppError(401, "Unauthorized");
  }
}

export default userAuth;
