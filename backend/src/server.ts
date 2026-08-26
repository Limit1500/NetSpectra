import { app } from "./app";

try {
  app.listen({ port: Number(process.env.PORT) });
} catch (error) {
  console.error(error);
}
