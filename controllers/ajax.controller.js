var UserM = require("../models/user.model");
var PostM = require("../models/post.model");
var CommentM = require("../models/comment.model");

module.exports.like = async (req, res) => {
  // Biến ID
  var ID_CMT = req.params.id;
  var ID_POST = req.body.idpost;
  var ID_USER_LIKE = req.signedCookies.id;
  console.log(ID_CMT + ":" + ID_POST + ":" + ID_USER_LIKE);
  // -->
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  } else {
    var LIKE = await CommentM.updateOne(
      { _id: ID_CMT },
      { $push: { like: ID_USER_LIKE } }
    );
    console.log(LIKE);
    res.send({
      success: true,
    });
  }
};
module.exports.unlike = async (req, res) => {
  // Biến ID
  var ID_CMT = req.params.id;
  var ID_POST = req.body.idpost;
  var ID_USER_LIKE = req.signedCookies.id;
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

module.exports.comment = async (req, res) => {
  // Biến ID
  var ID_POST = req.body.idpost;
  var ID_USER_CMT = req.signedCookies.id;
  var CONTENT = req.body.value;
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

module.exports.editcomment = async (req, res) => {
  // Sửa comment
  let id = req.params.id;
  let link = req.body.link;
  let comment = await CommentM.findById(id);
  comment.content = req.body.noidung;
  await comment.save();
  res.redirect(link);
};
