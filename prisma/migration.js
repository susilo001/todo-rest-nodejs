const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

const migration = async () => {
  try {
    await prisma.$queryRawUnsafe(`CREATE TABLE IF NOT EXISTS activities (
      id INT(11) NOT NULL AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL,
      updated_at DATE NOT NULL,
      PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);

    await prisma.$queryRawUnsafe(`CREATE TABLE IF NOT EXISTS todos (
        id INT(11) NOT NULL AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        priority VARCHAR(255) DEFAULT 'very-high',
        created_at DATE NOT NULL,
        updated_at DATE NOT NULL,
        activity_group_id INT(11) NOT NULL,
        FOREIGN KEY (activity_group_id) REFERENCES activities(id),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`);

    console.log("Migration success");
  } catch (error) {
    console.error("Migration error:", error.message);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

module.exports = migration;
