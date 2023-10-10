const express = require("express");
const migration = require("./migrations/index");
require("dotenv").config();

const todoController = require("./controllers/todo.controller");
const activityController = require("./controllers/activity.controller");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Todo Routes
app.route("/todo-items").get(todoController.index).post(todoController.create);

app
  .route("/todo-items/:id")
  .get(todoController.show)
  .patch(todoController.update)
  .delete(todoController.delete);

// Activity Routes
app
  .route("/activity-groups")
  .get(activityController.index)
  .post(activityController.create);

app
  .route("/activity-groups/:id")
  .get(activityController.show)
  .patch(activityController.update)
  .delete(activityController.delete);

const run = async () => {
  const { PORT } = process.env;
  try {
    await migration();
    app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
};

run();
module.exports = app;
