const Activity = require("../models/activity.model");

const sendResponse = (res, code, status, message, data = {}) => {
  res.status(code).send({ status, message, data });
};

exports.index = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    sendResponse(res, 200, "Success", "Success", activities);
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.title) {
      sendResponse(res, 400, "Bad Request", "title cannot be null");
    } else {
      const newActivity = new Activity(req.body);
      const activity = await newActivity.save();
      sendResponse(res, 201, "Success", "Success", activity);
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.show = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      sendResponse(
        res,
        404,
        "Not Found",
        `Activity with ID ${req.params.id} Not Found`
      );
    } else {
      sendResponse(res, 200, "Success", "Success", activity);
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      sendResponse(
        res,
        404,
        "Not Found",
        `Activity with ID ${req.params.id} Not Found`
      );
    } else if (!req.body) {
      sendResponse(res, 400, "Bad Request", "title cannot be null");
    } else {
      await Activity.update(req.body, {
        where: { id: req.params.id },
      });
      sendResponse(
        res,
        200,
        "Success",
        "Success",
        await Activity.findByPk(req.params.id)
      );
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    if (!activity) {
      sendResponse(
        res,
        404,
        "Not Found",
        `Activity with ID ${req.params.id} Not Found`
      );
    } else {
      await Activity.destroy({ where: { id: req.params.id } });
      sendResponse(res, 200, "Success", "Success", {});
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};
