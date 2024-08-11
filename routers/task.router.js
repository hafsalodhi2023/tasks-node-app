import express from "express";
import createTaskController from "../controllers/create-task.controller.js";

const Router = express.Router();

Router.post("/create", createTaskController.createTask);

export default Router;
