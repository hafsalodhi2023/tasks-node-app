import userModel from "../models/user.model.js";
import debug from "debug";

const debugging = debug("development:controller:user:create");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All Fields Are Required!",
      });
    }

    const emailVerification = await userModel.findOne({ email });

    if (emailVerification) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email Already Exists!",
      });
    }

    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "User",
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "New User Created Successfully!",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: "Internal Server Error!",
    });
  }
};

export default { createUser };
