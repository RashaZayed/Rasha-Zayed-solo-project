const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    body:{
        type: [String],
    },
    userId: {
        type: String,
        required: true,
        ref: "User", //to access all User model data

    },
    postId: {
        type: String,
        required: true,
        ref: "User", 
    }
});

const Comment = new mongoose.model('Comment', commentSchema );
module.exports = Comment ;