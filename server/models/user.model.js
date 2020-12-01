const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;
const config = require("../config/mongoose.config");

const secret = "mysecretkey";
const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true],
      maxlength: [100, "too long Name"]
    },
    lastname: {
      type: String,
      required: [true,"make sure you entered your lastName"],
      maxlength:  [100, "too long Name"],
    },
    email: {
      type: String,
      required: [true],//, "make sure you entered your email"
      trim: true,
      unique: [1],
    },
    password: {
      type: String,
      required: [true],
      minlength: [8]
    },
    password2: {
      type: String,
      required: [true],
      minlength: [8],
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
UserSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        user.password2 = hash;
        next();
      });
    });
  } else {
    next();
  }
});
//for checking password
UserSchema.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};
//to generate token in login route
UserSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), secret);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
//findone by  token to check it's logged in or not
UserSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, secret, function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};
//delete token when user logout
UserSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.update({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
