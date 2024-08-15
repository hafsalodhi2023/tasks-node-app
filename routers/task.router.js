import express from "express";
import createTaskController from "../controllers/create-task.controller.js";
import editTaskController from "../controllers/edit-task.controller.js";
import deleteTaskController from "../controllers/delete-task.controller.js";

const Router = express.Router();

Router.post("/create", createTaskController.createTask)
  .post("/edit", editTaskController.editTask)
  .post("/delete", deleteTaskController.deleteTask);

export default Router;
