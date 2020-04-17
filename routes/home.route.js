const express = require('express')

const db = require('../db');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('home/index',{
        users: db.get('users').value()
    })
});
router.get('/search', (req, res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter((user) => {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('home/index',{
        users: matchedUsers
    });
});

module.exports = router;