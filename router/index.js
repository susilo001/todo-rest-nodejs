const router = require("express").Router();

const todoController = require("../controllers/todo.controller");
const activityController = require("../controllers/activity.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Todo Routes
router
  .route("/todo-items")
  .get(todoController.index)
  .post(todoController.create);

router
  .route("/todo-items/:id")
  .get(todoController.show)
  .patch(todoController.update)
  .delete(todoController.delete);

// Activity Routes
router
  .route("/activity-groups")
  .get(activityController.index)
  .post(activityController.create);

router
  .route("/activity-groups/:id")
  .get(activityController.show)
  .patch(activityController.update)
  .delete(activityController.delete);

module.exports = router;
