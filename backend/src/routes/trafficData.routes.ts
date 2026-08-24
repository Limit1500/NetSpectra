import { FastifyInstance } from "fastify";
import processData from "../services/processData.service";

async function trafficDataRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: {
      macAddress: string;
      hostname: string;
      service: string;
      protocol: string;
      port: string;
    };
  }>("/", async (req, reply) => {
    try {
      const { macAddress, hostname, service, protocol, port } = req.body;

      await processData(macAddress, hostname, service, protocol, port);

      reply.code(200);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
}

export default trafficDataRoutes;
