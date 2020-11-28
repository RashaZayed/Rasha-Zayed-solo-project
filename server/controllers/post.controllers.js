const Post = require('../models/post.model')

module.exports.createPost = (req,res)=> {
    const {title , post} = req.body;
    Post.create({title , post})
    .then(post => res.json(post))
    .catch(err => res.status(400).json(err))
}
module.exports.getAllPosts =(req,res)=>{
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.json(err))
}
module.exports.deletePost = (req,res) => {
    Post.findByIdAndRemove({_id: req.params.id})
    .then(post=> res.json(post))
    .catch(err => res.json(err))
}