import cookie from "@fastify/cookie";
import "dotenv/config";
import Fastify from "fastify";
import authRoutes from "./routes/auth.routes";
import trafficDataRoutes from "./routes/trafficData.routes";
import jwt from "@fastify/jwt";

export const app = Fastify({
  logger: true,
});

app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});
app.register(cookie);

app.register(authRoutes, { prefix: "/auth" });
app.register(trafficDataRoutes, { prefix: "/traffic" });

try {
  app.listen({ port: 3000 });
} catch (error) {
  console.error(error);
}
