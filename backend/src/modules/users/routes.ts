import { FastifyInstance } from "fastify";
import userAuth from "../../middleware/auth/user";
import { signinSchema } from "../auth/validation";
import UserController from "./controller";

async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/me", {
    preHandler: userAuth,
    handler: UserController.getUserData,
  });

  fastify.patch("/me", {
    preHandler: userAuth,
    handler: UserController.requestUserDataUpdate,
  });
  fastify.delete("/me", {
    preHandler: userAuth,
    handler: UserController.requestUserDataUpdate,
  });

  fastify.patch("/verify/:token", {
    preHandler: userAuth,
    schema: signinSchema,
    handler: UserController.processPatch,
  });
  fastify.delete("/verify/:token", {
    preHandler: userAuth,
    handler: UserController.processDelete,
  });
}

export default userRoutes;
