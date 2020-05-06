const mongoose = require('mongoose');
const postSchema =  new mongoose.Schema({
    title: String,
    description: String,
    user: String,
    content: String,
    tag: [String],
    banner: String,
    datepost: { type: Date, default: Date.now },
    view: Number
});
const Post = mongoose.model('Post', postSchema, 'post');
module.exports = Post;