import { FastifyInstance } from "fastify";
import userAuth from "../../middleware/auth/user";
import DevicesController from "./controller";

async function deviceRoute(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: userAuth,
    },
    DevicesController.getDevices
  );
}

export default deviceRoute;
