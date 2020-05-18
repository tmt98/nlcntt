var UserM = require('../models/user.model');
var PostM = require('../models/post.model');
module.exports.index = async (req, res) => {
    var data = await PostM.find().populate('user').sort({datepost: -1})

    // res.json(data);
    res.render('home/index', {
         posts: data
    });
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