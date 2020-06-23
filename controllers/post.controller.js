// // Firebase Set Up
const firebase = require("firebase");
firebase.initializeApp({
  apiKey: "AIzaSyCWH_f74iDZvJE7cMG8mIdRqtffLZmWmbo",
  authDomain: "nienluancntt-b1606931.firebaseapp.com",
  projectId: "nienluancntt-b1606931",
});

var firebaseDB = firebase.firestore();
// //
const UserM = require("../models/user.model");
const PostM = require("../models/post.model");
const CommentM = require("../models/comment.model");

// --> CREATE POST FORM
module.exports.create = async (req, res) => {
  var id = req.signedCookies.id;
  var user = await UserM.findById(id);
  console.log(user);
  res.render("post/create", {
    user: user,
  });
};
// --> CREATE POST
module.exports.createPOST = async (req, res) => {
  // Tạo bài viết (Conntent)
  console.log(req.signedCookies.id);
  req.body.user = req.signedCookies.id;
  req.body.tags = req.body.tags.split(",");
  req.body.banner = "/" + req.file.destination + req.file.filename;
  console.log(req.body);
  const Post = await PostM.create(req.body, async (err, PostM) => {
    if (err) return handleError(err);
    // saved!
    console.log(PostM.title + "da duoc them vao database");
    const USER = await UserM.findById(req.body.user);
    for (var i = 0; i < USER.following.length; i++) {
      // Add lên firebase
      console.log(USER);
      let docRef = firebaseDB.collection(USER.following[i].toString()).doc();
      let setData = docRef.set({
        content: "Đã đăng 1 bài viết mới",
        senderid: req.signedCookies.id.toString(),
        link: "/post/" + PostM._id.toString(),
        status: "Chưa xem",
        avatar: USER.avatar,
        time: new Date(),
      });
    }
  });

  res.redirect("/");
};
// --> VIEW POST BY ID
module.exports.id = async (req, res) => {
  let id = req.params.id; // --> Biến id bài viết
  let checkLikeAr = []; // --> Mảng kiểm tra like -> true/false
  let trueUserCommentAr = []; // --> Mảng xác thực để cấp quyền sửa xóa comment -> true/false
  let checkFollowTF;
  let trueUserPostTF = false;
  // --> Get data bài viết
  let data = await PostM.findById(id).populate("user");
  let user = await UserM.findById(data.user);
  // Kiểm tra user post
  console.log(data.user._id + ":" + req.signedCookies.id);
  if (data.user._id == req.signedCookies.id) {
    trueUserPostTF = true;
  }
  // Kiểm tra follow
  if (!req.signedCookies.id) {
    checkFollowTF = false;
  } else {
    var checkFollow = user.following.find((u) => {
      return u == req.signedCookies.id;
    });
    if (checkFollow == req.signedCookies.id) {
      checkFollowTF = true;
    } else checkFollowTF = false;
  }
  // --> Get comment bài viết
  let comment = await CommentM.find({ idpost: id }, (err, comment) => {
    for (let i = 0; i < comment.length; i++) {
      if (!req.signedCookies.id) {
        checkLikeAr.push(false);
      } else {
        if (comment[i].like == []) {
          // --> Chưa ai like
          checkLikeAr.push(false);
        } else {
          var checkLike = comment[i].like.find((a) => {
            return a == req.signedCookies.id;
          });
          if (checkLike == req.signedCookies.id) {
            checkLikeAr.push(true);
          } else {
            checkLikeAr.push(false);
          }
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
    // --> Update view
    { _id: id },
    {
      view: data.view + 1,
    }
  );
  res.render("post/post-index", {
    data: data,
    comment: comment,
    checkfollow: checkFollowTF,
    checkTrueUser: trueUserPostTF,
    checklike: checkLikeAr,
    checkTrue: trueUserCommentAr,
  });
};

// --> EDIT POST FORM
module.exports.edit = async (req, res) => {
  console.log(req.signedCookies.id);
  console.log(req.params.id);
  let data = await PostM.findById(req.params.id);
  console.log(data);
  res.render("post/post-edit", {
    data: data,
  });
};
// --> EDIT POST
module.exports.editPOST = async (req, res) => {
  // Sửa bài viết (Conntent)
  console.log(req.signedCookies.id);
  console.log(req.params.id);
  let POST = await PostM.findById(req.params.id);
  if (req.signedCookies.id == POST.user) {
    req.body.tags = req.body.tags.split(",");
    if (req.file) {
      req.body.banner = "/" + req.file.destination + req.file.filename;
      POST.banner = req.body.banner;
    }
    POST.title = req.body.title;
    POST.description = req.body.description;
    POST.content = req.body.content;
    POST.tags = req.body.tags;
    console.log(req.body);
    await POST.save();
    res.redirect("/post/" + req.params.id);
  } else {
    res.redirect("/");
  }
};
