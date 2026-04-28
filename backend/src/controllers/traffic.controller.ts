import type { FastifyReply, FastifyRequest } from "fastify";
import trafficService from "../services/traffic.service.js";
import type { trafficData } from "../types/traffic.interfaces.js";

const trafficController = (req: FastifyRequest, reply: FastifyReply) => {
  const data = req.body as trafficData;
  const result = trafficService(data);

  return reply.code(200).send({ result });
};

export default trafficController;
