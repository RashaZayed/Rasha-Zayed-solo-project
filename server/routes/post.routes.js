const PostController = require('../controllers/post.controllers')


module.exports = (app)=> {
    app.post("/api/post" ,  PostController.createPost);
    app.get("/api/posts", PostController.getAllPosts)
    app.delete('/api/post/:id' , PostController.deletePost)
}