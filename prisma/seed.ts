import { PrismaClient } from "../src/generated/prisma/client";

// Prisma 7 reads configuration from prisma.config.ts automatically.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({} as any);

async function main() {
  console.log("🌱 Seeding database with sample invitees...");

  const invitees = [
    "张家",
    "李明 & 王芳",
    "陈家",
    "The Smith Family",
    "赵先生 & 赵太太",
    "The Johnsons",
    "刘家",
    "The Williams",
  ];

  for (const name of invitees) {
    const existing = await prisma.invitee.findFirst({
      where: { name },
    });

    if (!existing) {
      await prisma.invitee.create({
        data: { name },
      });
      console.log(`✨ Created: ${name}`);
    } else {
      console.log(`✅ Already exists: ${name}`);
    }
  }

  console.log("\n✅ Seeding completed successfully!");
  console.log(`📊 Total invitees: ${invitees.length}`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
