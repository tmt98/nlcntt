const db = require('../db');
const bodyParser = require('body-parser');

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
    db.get('users').push(req.body).write();
    res.redirect('/user');
}
module.exports.id = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('users/info', {
        user: user,
        users: db.get('users').value()
    });
}