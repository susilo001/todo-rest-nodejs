const { PrismaClient } = require("@prisma/client");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const prisma = new PrismaClient();

exports.index = asyncErrorHandler(async (req, res) => {
  const activityId = parseInt(req.query.activity_group_id);

  if (activityId) {
    const todos = await prisma.todos.findMany({
      where: { activity_group_id: activityId },
    });
    res
      .status(200)
      .send({ status: "Success", message: "Success", data: todos });
  } else {
    const todos = await prisma.todos.findMany();

    res
      .status(200)
      .send({ status: "Success", message: "Success", data: todos });
  }
});

exports.show = asyncErrorHandler(async (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = await prisma.todos.findUnique({
    where: { id: todoId },
  });

  if (!todo) {
    throw new CustomError(`Todo with ID ${todoId} Not Found`, 404);
  }

  res.status(200).send({ status: "Success", message: "Success", data: todo });
});

exports.create = asyncErrorHandler(async (req, res) => {
  if (!req.body.title) {
    throw new CustomError("Title cannot be null", 400);
  }
  const todo = await prisma.todos.create({ data: req.body });
  res.status(201).send({ status: "Success", message: "Success", data: todo });
});

exports.update = asyncErrorHandler(async (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = await prisma.todos.findUnique({
    where: { id: todoId },
  });

  if (!todo) {
    throw new CustomError(`Todo with ID ${todoId} Not Found`, 404);
  }

  if (!req.body) {
    throw new CustomError("Title cannot be null", 400);
  }

  const updatedTodo = await prisma.todos.update({
    where: { id: todoId },
    data: req.body,
  });

  res
    .status(200)
    .send({ status: "Success", message: "Success", data: updatedTodo });
});

exports.delete = asyncErrorHandler(async (req, res) => {
  const todoId = parseInt(req.params.id);
  const todo = await prisma.todos.findUnique({
    where: { id: todoId },
  });

  if (!todo) {
    throw new CustomError(`Todo with ID ${todoId} Not Found`, 404);
  }

  await prisma.todos.delete({ where: { id: todoId } });

  res.status(200).send({ status: "Success", message: "Success", data: {} });
});
