const mongoose = require('mongoose');
const postSchema =  new mongoose.Schema({
    title: String,
    description: String,
    iduser: String,
    content: String,
    tag: [String],
    banner: String,
    datepost: { type: Date, default: Date.now },
    view: Number,
    comment: [{
        _idcmt: new mongoose.Types.ObjectId(),
        idusercmt: String,
        datecmt: { type: Date, default: Date.now },
        contentcmt: String;
    }]
});
const Post = mongoose.model('Post', postSchema, 'post');
module.exports = Post;