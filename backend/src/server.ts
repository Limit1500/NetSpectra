import Fastify from "fastify";
import processData from "./services/processData.service";

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
    processData(macAddress, hostname, service, protocol, port);

    reply.code(200);
  } catch (error) {
    reply.code(500).send(error);
  }
});

try {
  app.listen({ port: 3000 });
} catch (error) {
  console.error(error);
}
