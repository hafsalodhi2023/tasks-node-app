import debug from "debug";
import fs from "fs";

const debugging = debug("development:controller:task:edit");

const editTask = async (req, res) => {
  try {
    const { new_title, new_details, previous_title, previous_details } =
      req.body;
    if (!new_title || !new_details) {
      return res.status(400).render("error", {
        error: "Please provide all the required fields",
      });
    }
    if (new_title === previous_title && new_details === previous_details) {
      return res.status(400).render("error", {
        error: "Please provide a new title or details",
      });
    }
    fs.rename(
      `./files/${previous_title}.txt`,
      `./files/${new_title}.txt`,
      (err) => {
        if (err) {
          return res.status(500).render("error", {
            error: err.message,
          });
        } else {
          fs.writeFile(`./files/${new_title}.txt`, new_details, (err) => {
            if (err) {
              return res.status(500).render("error", {
                error: err.message,
              });
            } else {
              return res.status(200).redirect("/");
            }
          });
        }
      }
    );
  } catch (error) {
    return res.status(500).render("error", {
      error: error.message,
    });
  }
};

export default { editTask };
