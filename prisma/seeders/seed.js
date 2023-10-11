const { PrismaClient } = require("@prisma/client");
const activities = require("./activity.seed");
const todos = require("./todo.seed");

const prisma = new PrismaClient();

async function seedActivities() {
  const createdActivities = await prisma.activities.createMany({
    data: activities,
  });
  console.log(`Created ${createdActivities.count} activities`);
}

async function seedTodos() {
  const createdTodos = await prisma.todos.createMany({
    data: todos,
  });
  console.log(`Created ${createdTodos.count} todos`);
}

async function main() {
  try {
    console.log(`Start seeding ...`);
    await Promise.all([seedActivities(), seedTodos()]);
    console.log(`Seeding finished.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
