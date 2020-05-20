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

// Chưa fix
module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedUsers = db
    .get("users")
    .value()
    .filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("home/index", {
    users: matchedUsers,
  });
};
