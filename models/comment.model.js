const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  idpost: { type: mongoose.Schema.Types.ObjectID, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  datecmt: { type: Date, default: Date.now },
  content: String,
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Comment = mongoose.model("Comment", commentSchema, "comment");
module.exports = Comment;
