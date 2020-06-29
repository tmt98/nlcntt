const UserM = require("../../models/user.model");
const PostM = require("../../models/post.model");
var bodyParser = require("body-parser");

module.exports.index = async (req, res) => {
  var user = await UserM.find({}, "-password");
  res.json(user);
};
module.exports.id = async (req, res) => {
  var user = await UserM.findById(req.params.id, "-password");
  res.json(user);
};
