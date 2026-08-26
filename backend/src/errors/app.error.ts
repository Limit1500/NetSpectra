import { FastifyReply, FastifyRequest } from "fastify";
import AppError from "../types/error.types";

function errorHandler(
  error: Error | AppError,
  req: FastifyRequest,
  reply: FastifyReply
) {
  req.log.error(error);

  if (error instanceof AppError) {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  if ("statusCode" in error && typeof error.statusCode === "number") {
    return reply.code(error.statusCode).send({ error: error.message });
  }

  return reply.code(500).send({ error: "Internal server error" });
}

export default errorHandler;
