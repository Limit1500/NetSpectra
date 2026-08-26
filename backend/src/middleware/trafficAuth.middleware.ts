import { FastifyReply, FastifyRequest } from "fastify";

async function trafficAuth(req: FastifyRequest, reply: FastifyReply) {
  const apiKey = req.headers["api-key"];

  if (apiKey != process.env.TRAFFIC_API_KEY) {
    return reply.code(401).send({
      message: "Unauthorized",
    });
  }
}

export default trafficAuth;
