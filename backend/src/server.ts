import app from "./app.js";
import trafficRoutes from "./routes/traffic.routes.js";

app.register(trafficRoutes, { prefix: "/traffic" });

try {
  app.listen({ port: 3000 });
} catch (error) {
  process.exit(1);
}
