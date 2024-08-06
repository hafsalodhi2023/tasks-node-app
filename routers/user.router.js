import express from "express";
import createUserController from "../controllers/create-user.controller.js";

const Router = express.Router();

Router.post("/create", createUserController.createUser);

export default Router;
