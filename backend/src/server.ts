import Fastify from "fastify";
import vendorsJson from "../src/vendors.json";

export const app = Fastify({
  logger: true,
});

app.post<{ Body: { macAddress: string } }>("/", (req, reply) => {
  try {
    const macAddress: string = req.body.macAddress;
    const vendors: Record<string, string> = vendorsJson;
    const prefix: string = macAddress
      .toUpperCase()
      .replace(/[^A-F0-9]/g, "")
      .slice(0, 6);
    const vendor = vendors[prefix] !== undefined ? vendors[prefix] : "unknown";

    reply.code(200).send({ vendor: vendor });
  } catch (error) {
    reply.code(500).send(error);
  }
});

try {
  app.listen({ port: 3000 });
} catch (error) {
  console.error(error);
}
