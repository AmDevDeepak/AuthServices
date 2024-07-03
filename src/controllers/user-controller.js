const UserService = require("../services/user-service");
const userService = new UserService();
const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      message: "New user created successfully",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while creating a user.",
      data: {},
      success: false,
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      message: "User signed in successfully",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred.",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async(req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "User authenticated successfully",
      data: response,
      success: true,
      err: {},
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred.",
      data: {},
      success: false,
      err: error,
    });
  }
 }

module.exports = {
  create,
  signIn,
  isAuthenticated
};
