import { FastifyInstance } from "fastify";
import trafficAuth from "../../middleware/auth/traffic";
import TrafficController from "./controller";
import trafficSchema from "./validation";

async function trafficDataRoutes(fastify: FastifyInstance) {
  fastify.post("/", {
    schema: trafficSchema,
    preHandler: trafficAuth,
    handler: TrafficController.postTrafficData,
  });
}

export default trafficDataRoutes;
