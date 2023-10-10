const db = require("../config/database");
require("dotenv").config();

const migration = async () => {
  try {
    const [rows, fields] = await db.query(
      "SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?",
      [process.env.MYSQL_DBNAME, "activities"]
    );
    if (rows[0].count === 0) {
      await db.query(
        `CREATE TABLE activities (
            id INT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL,
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
      );

      await db.query(
        `CREATE TABLE todos (
            id INT(11) NOT NULL AUTO_INCREMENT,
            title VARCHAR(255) NOT NULL,
            is_active BOOLEAN DEFAULT true,
            priority VARCHAR(255) DEFAULT 'very-high',
            created_at DATE NOT NULL,
            updated_at DATE NOT NULL,
            activity_group_id INT(11) NOT NULL,
            FOREIGN KEY (activity_group_id) REFERENCES activities(id),
            PRIMARY KEY (id)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = migration;
