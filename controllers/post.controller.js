var bodyParser = require('body-parser');
var shortid = require('shortid');

var db = require('../db');

module.exports.create = (req,res) => {
    var id = parseInt(req.params.id);
    var user = db.get('users').find({ id: id }).value();
    res.render('post/create',{
        user: user,
        users: db.get('users').value()
    });
}
module.exports.createPOST = (req,res) => { // Tạo bài viết (Conntent)
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
    // console.log(req.file, req.body);
    // req.body.id = shortid.generate();
    // req.body.user = res.locals.userLogin.id;
    // console.log(req.body);
    // req.body.tags = req.body.tags.split(',');
    // console.log(req.body);
    // res.send({
        
    // });
    // res.redirect('/');
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