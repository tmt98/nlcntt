var UserM = require('../models/user.model');
var PostM = require('../models/post.model');
var bodyParser = require('body-parser');

module.exports.index = (req, res) => {
    res.render('users/view',{
        users: db.get('users').value()
    });
}
module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/view',{
        users: matchedUsers
    });
}
module.exports.create = (req,res) => {
    res.render('users/create');
};
module.exports.createPOST = (req, res) => {
    // Test
}
module.exports.id = async (req, res) => {
    var id = req.params.id;
    let user = await UserM.findById(id).populate('following');
    let post = await PostM.find({user: id});
    res.render('users/info', {
        user: user,
        posts: post
    });
}