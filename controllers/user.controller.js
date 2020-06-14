var UserM = require("../models/user.model");
var PostM = require("../models/post.model");
var bodyParser = require("body-parser");

module.exports.index = (req, res) => {
  res.render("users/view", {
    users: db.get("users").value(),
  });
};
module.exports.search = (req, res) => {
  var q = req.query.q;
  var matchedUsers = db
    .get("users")
    .value()
    .filter((user) => {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/view", {
    users: matchedUsers,
  });
};
module.exports.create = (req, res) => {
  res.render("users/create");
};
module.exports.createPOST = (req, res) => {
  // Test
};
module.exports.id = async (req, res) => {
  var id = req.params.id;
  let checkFollowTF;
  let trueUserProfileTF = false;
  let user = await UserM.findById(id).populate("following");
  // Kiểm tra user post
  if (user._id == req.signedCookies.id) {
    trueUserProfileTF = true;
  }
  // Kiểm tra follow
  if (!req.signedCookies.id) {
    checkFollowTF = false;
  } else {
    var checkFollow = user.following.find((u) => {
      return u._id == req.signedCookies.id;
    });
    if (checkFollow != undefined) {
      checkFollowTF = true;
    } else checkFollowTF = false;
  }
  let post = await PostM.find({ user: id }).sort({ datepost: -1 });
  res.render("users/info", {
    user: user,
    checkfollow: checkFollowTF,
    checkTrueUser: trueUserProfileTF,
    posts: post,
  });
};
