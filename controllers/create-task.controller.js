import taskModel from "../models/task.model.js";
import debug from "debug";
import fs from "fs";

const debugging = debug("development:controller:task:create");

const createTask = async (req, res) => {
  const { title, details } = req.body;
  fs.writeFile(`./files/${title}.txt`, details, (err) => {
    if (err) {
      res.status(500).json({
        success: false,
        error: true,
        message: err.message,
      });
    } else {
      res.redirect("/");
    }
  });
};

export default { createTask };
