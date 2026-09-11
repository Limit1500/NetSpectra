import { env } from "process";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
