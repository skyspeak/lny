import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: InstanceType<typeof PrismaClient> | undefined;
};

function createPrismaClient() {
  // DATABASE_URL: explicit (e.g. Vercel Postgres or file path)
  // Vercel: use /tmp (only writable dir; DB is ephemeral unless you add a real DB)
  // Local: use prisma/dev.db
  let url = process.env.DATABASE_URL;
  if (!url) {
    const isVercel = process.env.VERCEL === "1";
    url = isVercel
      ? "file:/tmp/lny-rsvp.db"
      : `file:${process.cwd()}/prisma/dev.db`;
  }
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** Ensure SQLite table exists (for ephemeral DBs like /tmp on Vercel). Call once before first use. */
let schemaEnsured: Promise<void> | null = null;
export async function ensureSchema() {
  if (schemaEnsured) return schemaEnsured;
  schemaEnsured = (async () => {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Invitee" (
        "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        "name" TEXT NOT NULL,
        "adultsCount" INTEGER NOT NULL DEFAULT 0,
        "kidsCount" INTEGER NOT NULL DEFAULT 0,
        "isAttending" INTEGER,
        "message" TEXT,
        "respondedAt" DATETIME,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  })();
  return schemaEnsured;
}
