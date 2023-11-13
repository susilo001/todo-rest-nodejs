const { PrismaClient } = require("@prisma/client");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");

const prisma = new PrismaClient();

exports.index = asyncErrorHandler(async (req, res) => {
  const activities = await prisma.activities.findMany();

  res
    .status(200)
    .send({ status: "Success", message: "Success", data: activities });
});

exports.show = asyncErrorHandler(async (req, res) => {
  const activityId = parseInt(req.params.id);
  const activity = await prisma.activities.findUnique({
    where: { id: activityId },
  });

  if (!activity) {
    throw new CustomError(`Activity with ID ${activityId} Not Found`, 404);
  }
  res
    .status(200)
    .send({ status: "Success", message: "Success", data: activity });
});

exports.create = asyncErrorHandler(async (req, res) => {
  if (!req.body.title) {
    throw new CustomError("Title cannot be null", 400);
  }
  const activity = await prisma.activities.create({ data: req.body });
  res
    .status(201)
    .send({ status: "Success", message: "Success", data: activity });
});

exports.update = asyncErrorHandler(async (req, res) => {
  const activityId = parseInt(req.params.id);
  const activity = await prisma.activities.findUnique({
    where: { id: activityId },
  });

  if (!activity) {
    throw new CustomError(`Activity with ID ${activityId} Not Found`, 404);
  }

  if (!req.body) {
    throw new CustomError("Title cannot be null", 400);
  }

  const updatedActivity = await prisma.activities.update({
    where: { id: activityId },
    data: req.body,
  });

  res
    .status(200)
    .send({ status: "Success", message: "Success", data: updatedActivity });
});

exports.delete = asyncErrorHandler(async (req, res) => {
  const activityId = parseInt(req.params.id);
  const activity = await prisma.activities.findUnique({
    where: { id: activityId },
  });
  if (!activity) {
    throw new CustomError(`Activity with ID ${activityId} Not Found`, 404);
  }
  await prisma.activities.delete({ where: { id: activityId } });

  res.status(200).send({ status: "Success", message: "Success", data: {} });
});
