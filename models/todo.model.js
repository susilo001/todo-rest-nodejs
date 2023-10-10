const Model = require("./model");

class Todo extends Model {
  constructor(data = {}) {
    super(data, "todo_items", [
      "title",
      "activity_group_id",
      "priority",
      "is_active",
      "created_at",
      "updated_at",
    ]);
  }
}

module.exports = Todo;
