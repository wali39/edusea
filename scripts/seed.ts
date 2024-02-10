const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function SeedCategory() {
  try {
    await db.category.createMany({
      data: [
        { name: "computer science" },
        { name: "Electrical engineering" },
        { name: "Rocket science" },
        { name: "Fashion" },
        { name: "Accounting" },
        { name: "Machine learning" },
      ],
    });
    console.log("category seeding success!");
  } catch (error) {
    console.log("error in seeding", error);
  } finally {
    await db.$disconnect();
  }
}
SeedCategory();
