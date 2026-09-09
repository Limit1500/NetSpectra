import { FastifyReply, FastifyRequest } from "fastify";
import { trafficDataType } from "./types";
import TrafficService from "./service";

class TrafficController {
  static async postTrafficData(
    req: FastifyRequest<{
      Body: trafficDataType;
    }>,
    reply: FastifyReply
  ) {
    const { macAddress, hostname, service, protocol, port } = req.body;

    await TrafficService.processData(
      macAddress,
      hostname,
      service,
      protocol,
      port
    );

    reply.code(200).send({ message: "Success" });
  }
}

export default TrafficController;
