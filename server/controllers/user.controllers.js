const User = require("../models/user.model");

module.exports.registerUser = (req, res) => {
  // taking a user
  const newuser = new User(req.body);

  if (newuser.password != newuser.password2)
    return res.status(400).json({ message: "password not match" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res.status(400).json({ auth: false, message: "email exits" });

    newuser.save((err, doc) => {
      //hashing password and save it
      if (err) {
        console.log(err);
        return res.status(400).json({
          message:
            "please,make sure you entered your name and email correctly! ",
          success: false,
        });
      }
      res.status(200).json({
        succes: true,
        user: doc,
      });
    });
  });
};

module.exports.login = (req, res) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    //if success return user

    User.findOne({ email: req.body.email }, function (err, user) {
      if (!user)
        return res.status(400).json({
          isAuth: false,
          message: "email not found",
        });

      user.comparepassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.status(400).json({
            isAuth: false,
            message: "password doesn't match",
          });

        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          res.json({
            isAuth: true,
            id: user._id,
            email: user.email,
            auth: user.token, //to return its token in response
          });
        });
      });
    });
  });
};
module.exports.profile = (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + " " + req.user.lastname,
    pic: req.user.pic,
  });
};
module.exports.logout = (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
};

module.exports.getUser = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((user) =>
      res.json({
        name: user.firstname + " " + user.lastname,
      })
    )
    .catch((err) => res.status(400).json(err));
};
