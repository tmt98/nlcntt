var md5 = require('md5');

var UserM = require('../models/user.model');
var PostM = require('../models/post.model');

module.exports.login = (req, res) => {
    res.render('auth/signin')
};
module.exports.loginPOST = async (req, res) => {
    var user = req.body.user;
    console.log(user);
    var password = md5(req.body.password);
    console.log(password)
    var user = await UserM.findOne({user: user})
    console.log(user);
    if (!user) {
        res.render('auth/signin',{
            errors: [
                'Người dùng không tồn tại'
            ],
            values: req.body
        });
        return;
    }
    if (user.password !== password){
        res.render('auth/signin',{
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
module.exports.signup = (req, res) => {
    res.render('auth/signup')
};
module.exports.signupPOST = async (req, res) => {
    var users = await UserM.findOne({user: req.body.user});
    if (!users) {
        if (req.body.user==""){
            res.render('auth/signup',{
                errors: [
                    'Tài khoản không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.password==""){
            res.render('auth/signup',{
                errors: [
                    'Mật khẩu không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.name==""){
            res.render('auth/signup',{
                errors: [
                    'Họ tên không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.address==""){
            res.render('auth/signup',{
                errors: [
                    'Quê quán không được trống'
                ],
                values: req.body
            });
            return;
        }
        if (req.body.living==""){
            res.render('auth/signup',{
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
    res.render('auth/signup',{
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