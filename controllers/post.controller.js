var UserM = require('../models/user.model');
var PostM = require('../models/post.model');

module.exports.create = async (req,res) => {
    var id = req.signedCookies.id;
    var user = await UserM.findById(id);
    console.log(user);
    res.render('post/create',{
        user: user
    });
}
module.exports.createPOST = (req,res) => { // Tạo bài viết (Conntent)
    console.log(req.file);
    req.body.user = res.signedCookies.id;
    req.body.banner = "/" + req.file.destination + req.file.filename
    req.body = JSON.parse(JSON.stringify(req.body));
    console.log(req.body);
    postInsert = new PostM(req.body);
    postInsert.save(function (err, postInsert) {
        if (err) return console.error(err);
        console.log(postInsert.id + " saved to post collection.");
    });
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
    console.log(id);
    var data = db.get('post').find({ id: id}).value();
    // console.log(data.content);
    console.log(data.user);
    res.render('post/post-index', {
        data: data,
        user: db.get('users').find({id: data.user}).value(),
        users: db.get('users').value()
    });
}