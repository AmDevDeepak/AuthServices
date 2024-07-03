const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Something went wrong",
      data: {},
      err: "Email or password missing",
      success: false,
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
};
