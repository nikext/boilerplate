import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  // Create sample users
  const user1 = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "jane@example.com",
      name: "Jane Smith",
    },
  });

  // Create sample posts
  await prisma.post.createMany({
    data: [
      {
        title: "Getting Started with Next.js",
        content: "This is a comprehensive guide to Next.js...",
        published: true,
        authorId: user1.id,
      },
      {
        title: "TypeScript Best Practices",
        content: "Learn about TypeScript best practices...",
        published: true,
        authorId: user2.id,
      },
      {
        title: "Draft Post",
        content: "This is a draft post...",
        published: false,
        authorId: user1.id,
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 