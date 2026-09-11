import { FastifyReply, FastifyRequest } from "fastify";
import DatabaseDeviceService from "../../database/device/service";

class DevicesController {
  static async getDevices(_req: FastifyRequest, reply: FastifyReply) {
    const devices = await DatabaseDeviceService.getAllDevices();

    return reply.code(200).send(devices);
  }
}

export default DevicesController;
