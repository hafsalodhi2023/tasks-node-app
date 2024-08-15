import debug from "debug";
import fs from "fs";

const debugging = debug("development:controller:task:delete");

const deleteTask = async (req, res) => {
  try {
    const { filename } = req.body;

    fs.unlink(`./files/${filename}`, (err) => {
      if (err) {
        return res.status(500).render("error", {
          error: err.message,
        });
      } else {
        return res.redirect("/");
      }
    });
  } catch (error) {
    return res.status(500).render("error", {
      error: error.message,
    });
  }
};

export default { deleteTask };
