const UserM = require("../models/user.model");
const PostM = require("../models/post.model");
const bodyParser = require("body-parser");
const md5 = require("md5");

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
// Cập nhật thông tin user:
module.exports.edit = async (req, res) => {
  if (req.signedCookies.id != req.params.id) {
    res.redirect("/");
  }
  const user = await UserM.findById(req.params.id);
  res.render("users/edit", {
    user: user,
  });
};
// POST Cập nhật:
module.exports.editPost = async (req, res) => {
  var password = md5(req.body.password);
  if (req.signedCookies.id != req.params.id) {
    res.redirect("/");
  } else {
    const User = await UserM.findById(req.params.id);
    if (User.password == password) {
      if (req.file) {
        req.body.avatar = "/" + req.file.destination + req.file.filename;
        User.avatar = req.body.avatar;
      }
      User.name = req.body.name;
      User.address = req.body.address;
      User.living = req.body.living;
      await User.save();
      res.redirect("/user/" + req.params.id);
    } else res.redirect("/");
  }
};
//
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
