const CommentController = require ('../controllers/comment.controllers')
const { auth } = require("../middlewares/auth")

module.exports = (app)=> {
    app.post('/api/comments' , auth ,CommentController.createcomment)
    app.get('/api/comments/:id' , auth ,CommentController.gatAllCommentsForPost) //post id
}