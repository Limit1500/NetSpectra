import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller";

async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/signin", AuthController.signin);

  fastify.post("/login", AuthController.login);

  fastify.post("/logout", AuthController.logout);
}

export default authRoutes;
