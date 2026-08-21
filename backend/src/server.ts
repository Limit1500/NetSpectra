import Fastify from "fastify";
import vendorService from "./services/vendor.service";
import ScoreService from "./services/score.service";

export const app = Fastify({
  logger: true,
});

app.post<{
  Body: {
    macAddress: string;
    hostname: string;
    service: string;
    protocol: string;
    port: string;
  };
}>("/", (req, reply) => {
  try {
    const { macAddress, hostname, service, protocol, port } = req.body;

    const vendor = vendorService.getVendorByMac(macAddress);
    const device = ScoreService.getDeviceType(
      vendor,
      hostname,
      service,
      protocol,
      port,
    );

    reply.code(200).send({ vendor: vendor, device: device });
  } catch (error) {
    reply.code(500).send(error);
  }
});

try {
  app.listen({ port: 3000 });
} catch (error) {
  console.error(error);
}
