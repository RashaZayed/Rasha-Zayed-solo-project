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
  //liker = userId
  var likers = new Set(this.like);
  likers.add(liker);
  this.like = Array.from(likers);
  this.markModified("like");
  this.save(cb);
};
PostSchema.methods.doDislike = function (cb, disLiker) {
  var disLikeSet = new Set(this.disLike);
  disLikeSet.add(disLiker);
  this.disLike = Array.from(disLikeSet);
  this.markModified("disLike");
  this.save(cb);
};

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
