import userModel from "../models/user.model.js";
import debug from "debug";

const debugging = debug("development:controller:user:create");

const createUser = async (req, res) => {
  try {
    debugging("createUser");
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required!",
        data: null,
      });
    }

    const emailVerification = await userModel.findOne({ email });
    debugging(emailVerification);

    res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully!",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error!",
      data: null,
    });
  }
};

export default { createUser };
