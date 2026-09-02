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
import { env } from "./config/env.config";

export const app = Fastify({
  logger: true,
});

app.register(jwt, {
  secret: env.JWT_SECRET!,
  cookie: {
    cookieName: "token",
    signed: false,
  },
});
app.register(cors, {
  origin: env.FRONTEND_URL,
  credentials: true,
});

app.register(rateLimit, {
  max: Number(env.RATE_LIMIT),
  timeWindow: "1 minute",
});

app.register(cookie);
app.setErrorHandler(errorHandler);

app.post("/", async () => {
  return { message: "POST works" };
});

app.register(authRoutes, { prefix: "/auth" });
app.register(trafficDataRoutes, { prefix: "/traffic" });
app.register(deviceRoute, { prefix: "/devices" });
