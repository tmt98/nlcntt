var md5 = require('md5');

var UserM = require('../models/user.model');
var PostM = require('../models/post.model');

module.exports.login = (req, res) => {
    res.render('auth/singin')
};
module.exports.loginPOST = async (req, res) => {
    var user = req.body.user;
    console.log(user);
    var password = md5(req.body.password);
    console.log(password)
    var user = await UserM.findOne({user: user})
    console.log(user);
    if (!user) {
        res.render('auth/singin',{
            errors: [
                'Người dùng không tồn tại'
            ],
            values: req.body
        });
        return;
    }
    if (user.password !== password){
        res.render('auth/singin',{
            errors: [
                'Tài khoản hoặc mật khẩu không chính xác'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('id',user.id, {
        signed: true
    });
    res.redirect('/');
};
module.exports.logup = (req, res) => {
    res.render('auth/singup')
};
module.exports.logupPOST = async (req, res) => {
    var users = await UserM.findOne({user: req.body.user});
    if (!users) {
        if (req.body.user==""){
            res.render('auth/singup',{
                errors: [
                    'Tài khoản không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.password==""){
            res.render('auth/singup',{
                errors: [
                    'Mật khẩu không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.name==""){
            res.render('auth/singup',{
                errors: [
                    'Họ tên không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.address==""){
            res.render('auth/singup',{
                errors: [
                    'Quê quán không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.living==""){
            res.render('auth/singup',{
                errors: [
                    'Nơi ở không được trống'
                ],
                values: req.body
            });
            return;
        }
        req.body.password = md5(req.body.password);
        var userInsert = new UserM(req.body);
        userInsert.save(function (err, userInsert) {
            if (err) return console.error(err);
            console.log(userInsert.user + " saved to user collection.");
        });
        res.redirect('/');
    }
    res.render('auth/singup',{
        errors: [
            'Tài khoản đã tồn tại'
        ],
        values: req.body
    });
    return;
};
module.exports.logout = (req, res) => {
    res.clearCookie('id');
    res.redirect('/');
}