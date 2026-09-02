import "dotenv/config";
import { env } from "./config/env.config";
import { app } from "./app";

try {
  app.listen({
    port: Number(env.PORT),
  });
} catch (error) {
  console.error(error);
}
