// Import required modules.
import userModel from "../models/user.model.js";
import debug from "debug";

// Initialize debugging for user creation.
const debugging = debug("development:controller:user:create");

// Controller function to create a new user.
const createUser = async (req, res) => {
  try {
    // Log debug message for creating a new user.
    debugging("Creating a New User....");

    // Extract user data from request body.
    const { firstName, lastName, email, password } = req.body;

    // Check if all required fields are provided.
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All Fields are Required!",
      });
    }

    // Check if the email already exists in the database.
    const emailVerification = await userModel.findOne({ email });

    // If email exists, return an error response.
    if (emailVerification) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Email Already Exists!",
      });
    }

    // Create a new user in the database.
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password,
      role: "User",
    });

    // Log debug message for successful user creation.
    debugging("New User Created Successfully!!!!");

    // Return success response with the new user data.
    return res.status(201).json({
      success: true,
      error: false,
      message: "New User Created Successfully!",
      data: newUser,
    });
  } catch (error) {
    // Log any errors that occur during user creation.
    debugging(error.message);
    // Return error response.
    return res.status(500).json({
      success: false,
      error: true,
      message: error._message + ".",
    });
  }
};

// Export the createUser controller function.
export default { createUser };
