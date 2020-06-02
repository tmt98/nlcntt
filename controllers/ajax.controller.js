const UserM = require("../models/user.model");
const PostM = require("../models/post.model");
const CommentM = require("../models/comment.model");

/// --> LIKE
module.exports.like = async (req, res) => {
  // Biến ID
  const ID_CMT = req.params.id;
  const ID_POST = req.body.idpost;
  const ID_USER_LIKE = req.signedCookies.id;
  console.log(ID_CMT + ":" + ID_POST + ":" + ID_USER_LIKE);
  // -->
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    const LIKE = await CommentM.updateOne(
      { _id: ID_CMT },
      { $push: { like: ID_USER_LIKE } }
    );
    console.log(LIKE);
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
  const ID_USER_LIKE = req.signedCookies.id;
  console.log(ID_CMT + ":" + ID_POST + ":" + ID_USER_LIKE);
  // -->
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    var UNLIKE = await CommentM.updateOne(
      { _id: ID_CMT },
      { $pull: { like: ID_USER_LIKE } }
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
  const ID_USER_CMT = req.signedCookies.id;
  const CONTENT = req.body.value;
  console.log(ID_POST + ":" + ID_USER_CMT);
  CommentM.create(
    { idpost: ID_POST, user: ID_USER_CMT, content: CONTENT },
    function (err, CommentM) {
      if (err) return handleError(err);
      console.log(CommentM._id + "success");
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
// --> DEconstE COMMENT
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
