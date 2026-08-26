import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import DeviceDatabaseService from "../services/deviceDatabase.service";
import userAuth from "../middleware/userAuth.middleware";

async function deviceRoute(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: userAuth,
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const devices = await DeviceDatabaseService.getAllDevices();

      return reply.code(200).send(devices);
    }
  );
}

export default deviceRoute;
