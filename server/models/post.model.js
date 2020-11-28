const mongoose = require('mongoose');

const PostScehma = new mongoose.Schema({
    title:{
        type: String,
    },
    post:{
        type: String,
        required: [true , "make sure you write your post"],
        minlength: [1 , 'make sure you write your post'],

    }
    
})

const Post = mongoose.model('Post' , PostScehma);
module.exports = Post;