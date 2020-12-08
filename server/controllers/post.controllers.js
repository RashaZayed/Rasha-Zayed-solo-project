const Post = require("../models/post.model");

module.exports.createPost = (req, res) => {
  const { title, post } = req.body;
  const userId = req.user._id;
  Post.create({ title, post, userId })
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json(err));
};
module.exports.getAllPosts = (req, res) => {
  // Post.find()
  Post.find({})
    .sort({ createdAt: "descending" })
    .populate("userId", "firstname lastname pic")
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
};
module.exports.gatAllPostsForUser = (req, res) => {
  const userId = req.user._id;
  Post.find({ userId: userId })
    .sort({ createdAt: "descending" })
    .then((posts) => res.json(posts))
    .catch((err) => res.json(err));
};
module.exports.updatePost = (req, res) => {
  Post.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  }).then((post) => res.json(post));
};
module.exports.deletePost = (req, res) => {
  Post.findByIdAndRemove({ _id: req.params.id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
};
module.exports.updatePostLikes = (req, res) => {
  const userId = req.user._id;
  Post.findById(req.params.id).then((post) =>
    post.doLike(() => res.json(post), userId)
  );
};

module.exports.updatePostDislike = (req, res) => {
  const userId = req.user._id;
  console.log("userId" + userId);
  Post.findById(req.params.id)
    .then((post) => post.doDislike(() => res.json(post), userId))
    .catch((err) => res.status(400).json(err));
};
