const User = require("../models/user.model");

let auth = (req, res, next) => {  //to check if there is token or not
  let token = req.headers['auth']   //to get the token from the headers request
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: "error",
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
