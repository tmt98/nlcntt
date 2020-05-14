const mongoose = require('mongoose');
const postSchema =  new mongoose.Schema({
    title: String,
    description: String,
    user: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    content: String,
    tags: [String],
    banner: String,
    datepost: { type: Date, default: Date.now },
    view: { type: Number, default: 0},
    like: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    comment: [{
        _idcmt: {type: mongoose.Schema.Types.ObjectId , default: new mongoose.Types.ObjectId()}, 
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        datecmt: { type: Date, default: Date.now },
        contentcmt: String,
        like: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    }]
});
const Post = mongoose.model('Post', postSchema, 'post');
module.exports = Post;