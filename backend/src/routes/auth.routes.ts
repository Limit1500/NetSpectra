import { FastifyInstance } from "fastify";
import AuthController from "../controllers/auth.controller";
import { loginSchema, signinSchema } from "../validation/auth.validation";

async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/signin", {
    schema: signinSchema,
    handler: AuthController.signin,
  });

  fastify.post("/login", {
    schema: loginSchema,

    config: {
      rateLimit: {
        max: 5,
        timeWindow: "1 minute",
      },
    },

    handler: AuthController.login,
  });

  fastify.post("/logout", AuthController.logout);
}

export default authRoutes;
