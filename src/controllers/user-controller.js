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

module.exports = {
  create,
};
