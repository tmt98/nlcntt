const bodyParser = require('body-parser');
const db = require('../db');

module.exports.login = (req, res) => {
    res.render('auth/singin',{
        users: db.get('users').value()
    })
};