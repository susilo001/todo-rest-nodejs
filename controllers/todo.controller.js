const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sendResponse = (res, code, status, message, data = {}) => {
  res.status(code).send({ status, message, data });
};

const handleNotFoundError = (res, resourceName, resourceId) => {
  sendResponse(
    res,
    404,
    `Not Found`,
    `${resourceName} with ID ${resourceId} Not Found`
  );
};

exports.index = async (req, res) => {
  try {
    if (req.query.activity_group_id) {
      const todos = await prisma.todos.findMany({
        where: { activity_group_id: req.query.activity_group_id },
      });
      sendResponse(res, 200, "Success", "Success", todos);
    } else {
      const todos = await prisma.todos.findMany();
      sendResponse(res, 200, "Success", "Success", todos);
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.show = async (req, res) => {
  try {
    const todo = await prisma.todos.findUnique({
      where: { id: req.params.id },
    });
    if (!todo) {
      handleNotFoundError(res, "Todo", req.params.id);
    } else {
      sendResponse(res, 200, "Success", "Success", todo);
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.create = async (req, res) => {
  try {
    const requiredFields = ["title", "activity_group_id"];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      const message = `${missingFields.join(", ")} cannot be null`;
      sendResponse(res, 400, "Bad Request", message);
    } else {
      const todo = await prisma.todos.create({ data: req.body });
      sendResponse(res, 201, "Success", "Success", todo);
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.update = async (req, res) => {
  try {
    const todo = await prisma.todos.findUnique({
      where: { id: req.params.id },
    });
    if (!todo) {
      handleNotFoundError(res, "Todo", req.params.id);
    } else if (!req.body) {
      sendResponse(res, 400, "Bad Request", "title cannot be null");
    } else {
      await prisma.todos.update({
        where: { id: req.params.id },
        data: req.body,
      });
      sendResponse(
        res,
        200,
        "Success",
        "Success",
        await prisma.todos.findUnique({ where: { id: req.params.id } })
      );
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};

exports.delete = async (req, res) => {
  try {
    const todo = await prisma.todos.findUnique({
      where: { id: req.params.id },
    });
    if (!todo) {
      handleNotFoundError(res, "Todo", req.params.id);
    } else {
      await prisma.todos.delete({ where: { id: req.params.id } });
      sendResponse(res, 200, "Success", "Success", {});
    }
  } catch (error) {
    sendResponse(res, 500, "Internal Server Error", error.message);
  }
};
