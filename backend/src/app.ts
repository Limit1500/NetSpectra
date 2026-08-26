import cookie from "@fastify/cookie";
import "dotenv/config";
import Fastify from "fastify";
import authRoutes from "./routes/auth.routes";
import trafficDataRoutes from "./routes/trafficData.route";
import jwt from "@fastify/jwt";
import errorHandler from "./errors/app.error";
import deviceRoute from "./routes/devices.route";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";

export const app = Fastify({
  logger: true,
});

app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});
app.register(cors, {
  origin: process.env.FRONTEND_URL,
  credentials: true,
});
app.register(rateLimit, {
  max: Number(process.env.RATE_LIMIT),
  timeWindow: "1 minute",
});

app.register(cookie);
app.setErrorHandler(errorHandler);

app.register(authRoutes, { prefix: "/auth" });
app.register(trafficDataRoutes, { prefix: "/traffic" });
app.register(deviceRoute, { prefix: "/devices" });
