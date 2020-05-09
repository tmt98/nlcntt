var shortid = require('shortid');
var html2jade = require('html2jade');
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
    console.log(req.file);
    req.body.id = shortid.generate();
    req.body.user = res.locals.userLogin.id;
    req.body.banner = "/" + req.file.destination + req.file.filename
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.body);
    db.get('post').push(req.body).write();
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
    var idpost = "llROLlg_k";
    var user = db.get('users').find({ id: id }).value();
    var data = db.get('post').find({ id: idpost}).value();
    console.log(data.content);
    res.render('post/post-index', {
        user: user,
        data: data,
        users: db.get('users').value()
    });
}