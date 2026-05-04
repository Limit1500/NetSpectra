import type { FastifyInstance } from "fastify";
import trafficController from "../controllers/traffic.controller.js";
import trafficValidation from "../validations/traffic.validation.js";

async function trafficRoutes(app: FastifyInstance) {
  app.post("/", { schema: trafficValidation }, trafficController);
}

export default trafficRoutes;
