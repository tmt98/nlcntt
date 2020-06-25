var md5 = require("md5");

var UserM = require("../models/user.model");
var PostM = require("../models/post.model");
const User = require("../models/user.model");

module.exports.login = (req, res) => {
  res.render("auth/signin");
};
module.exports.loginPOST = async (req, res) => {
  var user = req.body.user;
  console.log(user);
  var password = md5(req.body.password);
  console.log(password);
  if (!req.body.url) {
    var url = "/";
  } else {
    var url = req.body.url;
  }
  console.log(url);
  var user = await UserM.findOne({ user: user });
  console.log(user);
  if (!user) {
    res.render("auth/signin", {
      errors: ["Người dùng không tồn tại"],
      values: req.body,
    });
    return;
  }
  if (user.password !== password) {
    res.render("auth/signin", {
      errors: ["Tài khoản hoặc mật khẩu không chính xác"],
      values: req.body,
    });
    return;
  }
  res.cookie("id", user.id, {
    signed: true,
  });
  res.cookie("user", { user });
  res.redirect(url);
};
module.exports.signup = (req, res) => {
  res.render("auth/signup");
};
module.exports.signupPOST = async (req, res) => {
  var users = await UserM.findOne({ user: req.body.user });
  if (!users) {
    if (req.body.user == "") {
      res.render("auth/signup", {
        errors: ["Tài khoản không được trống"],
        values: req.body,
      });
      return;
    }
    if (req.body.password == "") {
      res.render("auth/signup", {
        errors: ["Mật khẩu không được trống"],
        values: req.body,
      });
      return;
    }
    if (req.body.name == "") {
      res.render("auth/signup", {
        errors: ["Họ tên không được trống"],
        values: req.body,
      });
      return;
    }
    if (req.body.address == "") {
      res.render("auth/signup", {
        errors: ["Quê quán không được trống"],
        values: req.body,
      });
      return;
    }
    if (req.body.living == "") {
      res.render("auth/signup", {
        errors: ["Nơi ở không được trống"],
        values: req.body,
      });
      return;
    }
    req.body.password = md5(req.body.password);
    req.body.avatar = "/" + req.file.destination + req.file.filename;
    UserM.create(req.body, function (err, UserM) {
      if (err) return handleError(err);
      // saved!
      console.log(UserM.user + "da duoc them vao database");
    });
    return res.redirect("/");
  }
  res.render("auth/signup", {
    errors: ["Tài khoản đã tồn tại"],
    values: req.body,
  });
  return;
};
module.exports.logout = (req, res) => {
  res.clearCookie("id");
  res.redirect("/");
};

module.exports.changepass = (req, res) => {
  if (req.signedCookies.id != req.params.id) {
    res.redirect("/");
  } else {
    res.render("auth/changepass");
  }
};
module.exports.changepassPost = async (req, res) => {
  const oldpass = md5(req.body.oldpassword);
  const newpass = md5(req.body.password);
  if (req.params.id == req.signedCookies.id) {
    const User = await UserM.findById(req.params.id);
    if (oldpass == User.password) {
      User.password = newpass;
      User.save();
      res.redirect("/");
    } else {
      res.render("auth/changepass", {
        errors: ["Mật khẩu cũ không đúng"],
      });
    }
  }
};
