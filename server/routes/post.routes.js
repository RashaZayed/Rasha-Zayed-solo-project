const PostController = require('../controllers/post.controllers')
const { auth } = require("../middlewares/auth")

module.exports = (app)=> {
    app.post("/api/post" ,auth ,   PostController.createPost);
    app.get("/api/posts", auth ,PostController.getAllPosts)
    app.get('/api/myposts' , auth , PostController.gatAllPostsForUser)
    app.put('/api/post/:id' , auth ,PostController.updatePost )
    app.delete('/api/post/:id' ,auth ,  PostController.deletePost)
}