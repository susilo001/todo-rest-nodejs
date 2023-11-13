const express = require("express");
const router = require("./router");
const migration = require("../prisma/migration");

const app = express();
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

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
