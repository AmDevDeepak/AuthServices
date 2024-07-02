const express = require("express");
const app = express();
const { PORT } = require("./config/serverConfig");
const setupAndStartServer = () => {
  app.listen(PORT, () => console.log("Server Started Successfully..."));
};

setupAndStartServer();
