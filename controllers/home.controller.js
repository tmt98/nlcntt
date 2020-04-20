const db = require('../db');

module.exports.index = (req, res) => {
    res.render('home/index',{
        users: db.get('users').value()
    })
};

module.exports.search = (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('home/index',{
        users: matchedUsers
    });
}