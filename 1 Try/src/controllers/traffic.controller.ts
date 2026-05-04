import type { FastifyReply, FastifyRequest } from "fastify";
import type { trafficData } from "../types/traffic.interfaces.js";
import { processTrafficService } from "../utils/instances.js";

const TrafficController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = req.body as trafficData;

    const result = await processTrafficService.processData(data);

    return reply.code(200).send(result);
  } catch (err) {
    console.error(err);
    return reply.code(500).send({ message: "Internal server error" });
  }
};

export default TrafficController;
