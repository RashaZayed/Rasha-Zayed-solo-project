const PostController = require('../controllers/post.controllers')
const { auth } = require("../middlewares/auth")

module.exports = (app)=> {
    app.post("/api/post" ,auth ,   PostController.createPost);
    app.get("/api/posts", PostController.getAllPosts)
    app.delete('/api/post/:id' , PostController.deletePost)
}