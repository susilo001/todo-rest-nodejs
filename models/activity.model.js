const Model = require("./model");

class Activity extends Model {
  constructor(data = {}) {
    super(data, "activities", ["title", "email", "created_at", "updated_at"]);
  }
}

module.exports = Activity;
