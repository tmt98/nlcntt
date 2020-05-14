var UserM = require('../../models/user.model');
var PostM = require('../../models/post.model');
var bodyParser = require('body-parser');

module.exports.index = async (req, res) => {
    var user = await UserM.find()
    res.json(user);
}
// module.exports.create = (req,res) => {
//     res.render('users/create');
// };
// module.exports.createPOST = (req, res) => {
//     db.get('users').push(req.body).write();
//     res.redirect('/user');
// }
// module.exports.id = async (req, res) => {
//     var id = req.params.id;
//     let user = await UserM.findById(id);
//     let post = await PostM.find({user: id});
//     console.log(user);
//     console.log(post);
//     res.render('users/info', {
//         user: user,
//         posts: post
//     });
// }