import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  PORT: z.coerce.number().int().min(1).max(65535),

  DECAY_MULTIPLIER: z.coerce.number().gt(0).lt(1),
  DECAY_INTERVAL: z.coerce.number().positive(),

  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().min(1),

  TRAFFIC_API_KEY: z.string().min(32),

  FRONTEND_URL: z.string().min(1),

  RATE_LIMIT: z.coerce.number().int().positive(),

  EMAILER_API_KEY: z.string().min(1),
  EMAILER_ADDRESS: z.string().email(),
});

export const env = envSchema.parse(process.env);
