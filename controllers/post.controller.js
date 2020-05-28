var UserM = require("../models/user.model");
var PostM = require("../models/post.model");
var CommentM = require("../models/comment.model");

module.exports.create = async (req, res) => {
  var id = req.signedCookies.id;
  var user = await UserM.findById(id);
  console.log(user);
  res.render("post/create", {
    user: user,
  });
};
module.exports.createPOST = (req, res) => {
  // Tạo bài viết (Conntent)
  console.log(req.signedCookies.id);
  req.body.user = req.signedCookies.id;
  req.body.tags = req.body.tags.split(",");
  req.body.banner = "/" + req.file.destination + req.file.filename;
  console.log(req.body);
  PostM.create(req.body, function (err, PostM) {
    if (err) return handleError(err);
    // saved!
    console.log(PostM.title + "da duoc them vao database");
  });
  res.redirect("/");
};
// Test
module.exports.upload = (req, res) => {
  // Some operation
  res.send({
    uploaded: 1,
    fileName: "IMAGE.PNG",
    url: "/public/img/user-upload",
  });
};
//
module.exports.id = async (req, res) => {
  var id = req.params.id;
  var checkLikeAr = [];
  var trueUserCommentAr = [];
  var data = await await PostM.findById(id).populate("user");
  var comment = await CommentM.find({ idpost: id }, (err, comment) => {
    for (let i = 0; i < comment.length; i++) {
      if (!req.signedCookies.id) {
        checkLikeAr.push(false);
      } else {
        if (comment[i].like == []) {
          checkLikeAr.push(false);
        } else {
          var checkLike = comment[i].like.find((a) => {
            return a == req.signedCookies.id;
          });
          // console.log(checkLike);
          if (checkLike == req.signedCookies.id) {
            checkLikeAr.push(true);
          } else {
            checkLikeAr.push(false);
          }
          // var checkTrueUserPost = comment[i].user;
          if (comment[i].user._id == req.signedCookies.id) {
            trueUserCommentAr.push(true);
          } else {
            trueUserCommentAr.push(false);
          }
        }
      }
    }
  })
    .populate("user")
    .sort({ datecmt: -1 });
  await PostM.updateOne(
    { _id: id },
    {
      view: data.view + 1,
    }
  );
  res.render("post/post-index", {
    data: data,
    comment: comment,
    checklike: checkLikeAr,
    checkTrue: trueUserCommentAr,
  });
};
