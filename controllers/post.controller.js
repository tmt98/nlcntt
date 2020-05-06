const bodyParser = require('body-parser');
const shortid = require('shortid');

const db = require('../db');

module.exports.create = (req,res) => {
    var id = parseInt(req.params.id);
    var user = db.get('users').find({ id: id }).value();
    res.render('post/create',{
        user: user,
        users: db.get('users').value()
    });
}
module.exports.createPOST = (req,res) => { // Tạo bài viết (Conntent)
    req.body.id = shortid.generate();
    req.body.user = res.locals.userLogin.id;
    console.log(req.body);
    req.body.tags = req.body.tags.split(',');
    console.log(req.body);
    res.redirect('/');
}

module.exports.upload = (req, res) => {
	// Some operation
	res.send({
		"uploaded": 1,
    	"fileName": "IMAGE.PNG",
    	"url": "/public/img/user-upload"
	})
}

module.exports.id = (req, res) => {
    var id = req.params.id;
    var user = db.get('users').find({ id: id }).value();
    res.render('post/post-index', {
        user: user,
        users: db.get('users').value()
    });
}