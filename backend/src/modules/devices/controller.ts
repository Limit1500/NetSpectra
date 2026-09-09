import { FastifyReply, FastifyRequest } from "fastify";
import DeviceDatabaseService from "../../services/database/device";

class DevicesController {
  static async getDevices(_req: FastifyRequest, reply: FastifyReply) {
    const devices = await DeviceDatabaseService.getAllDevices();

    return reply.code(200).send(devices);
  }
}

export default DevicesController;
