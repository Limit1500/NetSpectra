import { FastifyInstance } from "fastify";
import trafficAuth from "../../middleware/auth/traffic";
import TrafficController from "./controller";
import trafficDataSchema from "./validation";

async function trafficDataRoutes(fastify: FastifyInstance) {
  fastify.post("/", {
    schema: trafficDataSchema,
    preHandler: trafficAuth,
    handler: TrafficController.postTrafficData,
  });
}

export default trafficDataRoutes;
