import express from "express";
import debug from "debug";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/mongodb-connection.config.js";
import fs from "fs";

dotenv.config();
connectMongoDB();

const app = express();
const debugging = debug("development:app");

import taskRouter from "./routers/task.router.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

app.use("/api/task", taskRouter);

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    res.render("index", { files: files });
    debugging(files);
  });
});

app.get("/tasks/:taskname", (req, res) => {
  fs.readFile(`./files/${req.params.taskname}`, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).render("error", {
        error: err.message,
      });
    } else {
      return res.render("task", {
        taskName: req.params.taskname,
        taskDetails: data,
      });
    }
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).render("error", {
        error: err.message,
      });
    } else {
      return res.render("edit", {
        filename: req.params.filename,
        taskDetails: data,
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  debugging(`server is running at port: ${process.env.PORT}`);
});
