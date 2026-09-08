import userAuth from "../middleware/userAuth.middleware";
import UserController from "../controllers/user.controller";
import { signinSchema } from "../validation/auth.validation";
import { FastifyInstance } from "fastify";

async function userRoutes(fastify: FastifyInstance) {
  fastify.get("/me", { preHandler: userAuth }, UserController.getUserData);
  fastify.patch("/me", { preHandler: userAuth }, UserController.patchUserData);
  fastify.delete(
    "/me",
    { preHandler: userAuth },
    UserController.deleteUserData
  );

  fastify.patch(
    "/verify/:token",
    { preHandler: userAuth, schema: signinSchema },
    UserController.verifyPatch
  );
  fastify.delete(
    "/verify/:token",
    { preHandler: userAuth },
    UserController.verifyDelete
  );
}

export default userRoutes;
