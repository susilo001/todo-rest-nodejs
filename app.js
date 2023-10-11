const express = require("express");
const router = require("./router");
const migration = require("./prisma/migration");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(router);

(async () => {
  try {
    await migration();
    app.listen(process.env.PORT);
    console.log(`Server running on port ${process.env.PORT}`);
  } catch (error) {
    throw error;
  }
})();

module.exports = app;
