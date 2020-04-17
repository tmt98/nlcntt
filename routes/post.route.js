const express = require('express')
const bodyParser = require('body-parser');

const db = require('../db');
const router = express.Router();
// View Post
router.get('/:id', (req, res) => {
    var id = parseInt(req.params.id);
    var user = db.get('users').find({ id: id }).value();
    res.render('post/post-index', {
        user: user,
        users: db.get('users').value()
    });
});

module.exports = router;