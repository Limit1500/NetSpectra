import { env } from "process";
import { app } from "./app";

try {
  app.listen({ port: Number(env.PORT) });
} catch (error) {
  console.error(error);
}
