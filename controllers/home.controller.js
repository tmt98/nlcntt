var UserM = require('../models/user.model');
var PostM = require('../models/post.model');
module.exports.index =  (req, res) => {
    PostM.find().populate('user').then( (post) => {
        res.render('home/index', {
            posts: post
        });
    })
};

// Chưa fix
module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('home/index',{
        users: matchedUsers
    });
}