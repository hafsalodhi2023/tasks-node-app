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
      });
    }

    const emailVerification = await userModel.findOne({ email });

    if (emailVerification) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email already exists!",
      });
    }

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "user",
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "New user created successfully!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal server error!",
      data: null,
    });
  }
};

export default { createUser };
