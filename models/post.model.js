const mongoose = require('mongoose');
const postSchema =  new mongoose.Schema({
    title: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    content: String,
    tags: [String],
    banner: String,
    datepost: { type: Date, default: Date.now },
    view: Number,
    comment: [{
        // _idcmt: new mongoose.Types.ObjectId(),
        idusercmt: String,
        datecmt: { type: Date, default: Date.now },
        contentcmt: String
    }]
});
const Post = mongoose.model('Post', postSchema, 'post');
module.exports = Post;