const mongoose = require("mongoose");
const { auth } = require("../middlewares/auth");
const User = require("../models/user.model");
const UserController = require("../controllers/user.controllers");

module.exports = (app) => {
  app.get("/", function (req, res) {
    res.status(200).send(`Welcome to login , sign-up api`);
  });
  // adding new user (sign-up route)
  app.post("/api/register", UserController.registerUser);

  // login user
  app.post("/api/login", UserController.login);
  // get the user to the profile
  app.get("/api/profile", auth, UserController.profile);

  //logout user
  app.get("/api/logout", auth, UserController.logout);
};
