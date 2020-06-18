var UserM = require("../models/user.model");
var PostM = require("../models/post.model");
var CommentM = require("../models/comment.model");
module.exports.index = async (req, res) => {
  var countCMT = [];
  var data = await PostM.find().populate("user").sort({ datepost: -1 });
  // res.json(data);
  for (let i = 0; i < data.length; i++) {
    data[i].comment = await CommentM.countDocuments({ idpost: data[i]._id });
    countCMT.push(data[i].comment);
  }
  res.render("home/index", {
    posts: data,
    countcmt: countCMT,
  });
};

// Search Cơ bản
module.exports.search = async (req, res) => {
  var q = req.query.q;
  var countCMT = [];
  var data = await PostM.find({ title: { $regex: q, $options: "i" } })
    .populate("user")
    .sort({ datepost: -1 });
  for (let i = 0; i < data.length; i++) {
    data[i].comment = await CommentM.countDocuments({ idpost: data[i]._id });
    countCMT.push(data[i].comment);
  }
  res.render("home/index", {
    posts: data,
    countcmt: countCMT,
  });
};

// Search With Tag
module.exports.searchWithTag = async (req, res) => {
  var q = req.query.q;
  var countCMT = [];
  var data = await PostM.find({ tags: { $all: q } })
    .populate("user")
    .sort({ datepost: -1 });
  for (let i = 0; i < data.length; i++) {
    data[i].comment = await CommentM.countDocuments({ idpost: data[i]._id });
    countCMT.push(data[i].comment);
  }
  res.render("home/index", {
    posts: data,
    countcmt: countCMT,
  });
};
