const express = require('express')
const bodyParser = require('body-parser');

const db = require('../db');

const router = express.Router();
router.get('/', (req, res) => {
    res.render('users/view',{
        users: db.get('users').value()
    })
    });
router.get('/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/view',{
        users: matchedUsers
    });
});
// View Profile
router.get('/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var user = db.get('users').find({ id: id }).value();
    res.render('users/info', {
        user: user,
        users: db.get('users').value()
    });
});
// Tạo User
router.get('/create', (req,res) => {
    res.render('users/create');
});
router.post('/create', (req, res) => {
    db.get('users').push(req.body).write();
    res.redirect('/user');
});

module.exports = router;