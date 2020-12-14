const Comment = require("../models/comment.model");

module.exports.gatAllCommentsForPost = (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  Comment.find({ postId: postId })
    .populate("userId", "firstname lastname pic")

    .then((comments) => res.json(comments))
    .catch((err) => res.json(err));
};

module.exports.createcomment = (req, res) => {
  const { body, postId } = req.body;
  const userId = req.user._id;
  Comment.create({ body, userId, postId })
    .then((comment) => {
      res.json({
        postId: postId,
        userId: {
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          pic: req.user.pic,
        },
        body: body,
      });
    })
    .catch((err) => res.status(400).json(err));
};
