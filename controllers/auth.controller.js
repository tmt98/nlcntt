const db = require('../db');
const md5 = require('md5');
const shortid = require('shortid');

module.exports.login = (req, res) => {
    res.render('auth/singin')
};
module.exports.loginPOST = (req, res) => {
    var user = req.body.user;
    console.log(user);
    var password = md5(req.body.password);
    console.log(password)
    var users = db.get('users').find({user: user}).value();
    if (!users) {
        res.render('auth/singin',{
            errors: [
                'Người dùng không tồn tại'
            ],
            values: req.body
        });
        return;
    }
    if (users.password !== password){
        res.render('auth/singin',{
            errors: [
                'Tài khoản hoặc mật khẩu không chính xác'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('id',users.id, {
        signed: true
    });
    res.redirect('/');
};
module.exports.logup = (req, res) => {
    res.render('auth/singup')
};
module.exports.logupPOST = (req, res) => {
    req.body.id = shortid.generate();
    req.body.following = 0;
    var users = db.get('users').find({user: req.body.user}).value();
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
        db.get('users').push(req.body).write();
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