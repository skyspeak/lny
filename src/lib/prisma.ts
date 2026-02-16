import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    if (process.env.VERCEL === "1") {
      throw new Error(
        "DATABASE_URL is not set. Add a persistent database (e.g. Vercel Postgres) in Project Settings → Environment Variables so RSVPs survive deployments. See DEPLOYMENT.md."
      );
    }
    throw new Error(
      "DATABASE_URL is not set. For local dev, add DATABASE_URL to .env (e.g. a Vercel Postgres connection string or local Postgres)."
    );
  }
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** Ensure table exists (e.g. first deploy without migrations). Safe to call on every request. */
let schemaEnsured: Promise<void> | null = null;
export async function ensureSchema() {
  if (schemaEnsured) return schemaEnsured;
  schemaEnsured = (async () => {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Invitee" (
        "id" SERIAL PRIMARY KEY,
        "name" TEXT NOT NULL,
        "adultsCount" INTEGER NOT NULL DEFAULT 0,
        "kidsCount" INTEGER NOT NULL DEFAULT 0,
        "isAttending" BOOLEAN,
        "message" TEXT,
        "respondedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  })();
  return schemaEnsured;
}
