// Firebase Set Up
const admin = require("firebase-admin");
const serviceAccount = require("./../FirebaseKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nienluancntt-b1606931.firebaseio.com",
});
let firebaseDB = admin.firestore();
//
const UserM = require("../models/user.model");
const PostM = require("../models/post.model");
const CommentM = require("../models/comment.model");
const User = require("../models/user.model");

/// --> LIKE
module.exports.like = async (req, res) => {
  // Biến ID
  const ID_CMT = req.params.id;
  const ID_POST = req.body.idpost;
  const ID_LOGIN = req.signedCookies.id; // USER LOGIN
  const USER_SEND = await UserM.findById(ID_LOGIN);

  console.log(ID_CMT + ":" + ID_POST + ":" + ID_LOGIN);
  const Comment = await CommentM.findById(ID_CMT);
  const ID_USER_CMT = Comment.user; // Người nhận thông báo
  console.log(ID_USER_CMT);
  // -->
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    const LIKE = await CommentM.updateOne(
      { _id: ID_CMT },
      { $push: { like: ID_LOGIN } }
    );
    console.log(LIKE);
    // Add lên firebase
    let docRef = firebaseDB.collection(ID_USER_CMT.toString()).doc();
    let setData = docRef.set({
      content: "Đã thích bình luận của bạn",
      senderid: ID_LOGIN.toString(),
      link: "/post/" + ID_POST.toString(),
      status: "Chưa xem",
      avatar: USER_SEND.avatar,
      time: new Date(),
    });
    //
    res.send({
      success: true,
    });
  }
};
// --> UNLIKE
module.exports.unlike = async (req, res) => {
  // Biến ID
  const ID_CMT = req.params.id;
  const ID_POST = req.body.idpost;
  const ID_LOGIN = req.signedCookies.id; // USER LOGIN
  console.log(ID_CMT + ":" + ID_POST + ":" + ID_LOGIN);
  // -->
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    var UNLIKE = await CommentM.updateOne(
      { _id: ID_CMT },
      { $pull: { like: ID_LOGIN } }
    );
    console.log(UNLIKE);
    res.send({
      success: true,
    });
  }
};
// --> COMMENT
module.exports.comment = async (req, res) => {
  // Biến ID
  const ID_POST = req.body.idpost;
  const ID_LOGIN = req.signedCookies.id; // USER LOGIN
  const ID_USER_POST = req.body.userpost;
  const CONTENT = req.body.value;
  const USER_SEND = await UserM.findById(ID_LOGIN);
  console.log(ID_POST + ":" + ID_LOGIN);
  CommentM.create(
    { idpost: ID_POST, user: ID_LOGIN, content: CONTENT },
    function (err, CommentM) {
      if (err) return handleError(err);
      console.log(CommentM._id + "success");
      // Add lên firebase
      let docRef = firebaseDB.collection(ID_USER_POST.toString()).doc();
      let setData = docRef.set({
        content: "Đã bình luận về bài viết của bạn",
        senderid: ID_LOGIN.toString(),
        link: "/post/" + ID_POST.toString(),
        status: "Chưa xem",
        avatar: USER_SEND.avatar,
        time: new Date(),
      });
      //
    }
  );
  res.send({
    success: true,
  });
};
// --> EDIT COMMENT
module.exports.editcomment = async (req, res) => {
  // Sửa comment
  const id = req.params.id;
  const link = req.body.link;
  const comment = await CommentM.findById(id);
  comment.content = req.body.noidung;
  await comment.save();
  res.redirect(link);
};
// --> DELETE COMMENT
module.exports.deletecomment = async (req, res) => {
  // Xóa comment
  const id = req.params.id;
  const link = req.body.link;
  await CommentM.findByIdAndRemove(id, function (err) {
    if (err) console.log("Delete thất bại: " + err);
    else console.log("Delete thành công");
  });
  res.redirect(link);
};
// --> FOLLOW
module.exports.follow = async (req, res) => {
  // Follow
  const ID_USER_FOLLOW = req.signedCookies.id;
  const ID_PROFILE_FOLLOW = req.body.idUserPost;
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    var FOLLOW = await UserM.updateOne(
      { _id: ID_PROFILE_FOLLOW },
      { $push: { following: ID_USER_FOLLOW } }
    );
    USER_SEND = await UserM.findById(ID_USER_FOLLOW);
    // Add lên firebase
    let docRef = firebaseDB.collection(ID_PROFILE_FOLLOW.toString()).doc();
    let setData = docRef.set({
      content: "Đã bắt đầu theo dõi bạn",
      senderid: ID_USER_FOLLOW.toString(),
      link: "/user/" + ID_USER_FOLLOW.toString(),
      status: "Chưa xem",
      avatar: USER_SEND.avatar,
      time: new Date(),
    });
    //
    console.log(FOLLOW);
    res.send({
      success: true,
    });
  }
};
// --> UNFOLLOW
module.exports.unfollow = async (req, res) => {
  // Unfollow
  const ID_USER_FOLLOW = req.signedCookies.id;
  const ID_PROFILE_FOLLOW = req.body.idUserPost;
  console.log(ID_PROFILE_FOLLOW + ":" + ID_USER_FOLLOW);
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    const FOLLOW = await UserM.updateOne(
      { _id: ID_PROFILE_FOLLOW },
      { $pull: { following: ID_USER_FOLLOW } }
    );
    console.log(FOLLOW);
    res.send({
      success: true,
    });
  }
};
