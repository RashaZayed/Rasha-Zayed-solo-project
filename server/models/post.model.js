const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  post: {
    type: String,
    required: [true, "make sure you write your post"],
    minlength: [1, "make sure you write your post"],
  },

  userId: {
    type: String,
    required: true,
    ref: "User", //to access all User model data
  },
  like: {
    type: [String], //array of users ids clicked like
  },
  disLike: [String],
});

PostSchema.methods.doLike = function (cb, liker) {
  if (this.like.includes(liker)) return;

  this.like.push(liker);
  this.markModified("like");
  this.save(cb);
};
PostSchema.methods.doDislike = function (cb, disLiker) {
 if(this.disLike.includes(disLiker)) return;
  this.disLike.push(disLiker);
  this.markModified("like");
  this.save(cb);
};

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
