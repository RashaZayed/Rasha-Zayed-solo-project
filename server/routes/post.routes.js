const PostController = require('../controllers/post.controllers')
const { auth } = require("../middlewares/auth")

module.exports = (app)=> {
    app.post("/api/post" ,auth ,   PostController.createPost);
    app.get("/api/posts", auth ,PostController.getAllPosts)
    app.get('/api/post/:id' , auth , PostController.getOnePost)
    app.get('/api/myposts' , auth , PostController.gatAllPostsForUser)
    app.delete('/api/post/:id' ,auth ,  PostController.deletePost)
    app.put('/api/postlike/:id' , auth , PostController.updatePostLikes);
    app.put('/api/postdislike/:id' , auth , PostController.updatePostDislike)
}