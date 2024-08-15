import debug from "debug";
import fs from "fs";

const debugging = debug("development:controller:task:create");

const createTask = async (req, res) => {
  try {
    const { title, details } = req.body;
    if (!title || !details) {
      return res.status(400).render("error", {
        error: "Title and details are required.",
      });
    }

    fs.writeFile(`./files/${title}.txt`, details, (err) => {
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

export default { createTask };
