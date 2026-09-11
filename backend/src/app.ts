import cookie from "@fastify/cookie";
import "dotenv/config";
import Fastify from "fastify";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import cors from "@fastify/cors";
import { env } from "./config/env";
import CleanupService from "./services/cleanup";
import errorHandler from "./errors/handler";
import authRoutes from "./modules/auth/routes";
import trafficDataRoutes from "./modules/traffic/routes";
import deviceRoute from "./modules/devices/routes";
import userRoutes from "./modules/users/routes";

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
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
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
app.register(userRoutes, { prefix: "/user" });

CleanupService.start();
