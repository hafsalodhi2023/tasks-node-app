import express from "express";
import debug from "debug";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./config/mongodb-connection.config.js";

dotenv.config();
connectMongoDB();

const app = express();
const debugging = debug("development:app");

import userRouter from "./routers/user.router.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(cors());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  debugging(`Server is running on port ${process.env.PORT}`);
});
