import { FastifyInstance } from "fastify";
import processData from "../services/processData.service";
import trafficDataSchema from "../validation/trafficData.validation";
import trafficAuth from "../middleware/trafficAuth.middleware";

async function trafficDataRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: {
      macAddress: string;
      hostname: string;
      service: string;
      protocol: string;
      port: string;
    };
  }>(
    "/",
    {
      schema: trafficDataSchema,
      preHandler: trafficAuth,
    },
    async (req, reply) => {
      const { macAddress, hostname, service, protocol, port } = req.body;

      await processData(macAddress, hostname, service, protocol, port);

      reply.code(200).send({ message: "Success" });
    }
  );
}

export default trafficDataRoutes;
