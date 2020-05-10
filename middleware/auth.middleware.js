var UserM = require('../models/user.model');
module.exports.requireAuth = (req, res ,next) => {
    if(!req.signedCookies.id){
        res.redirect('/auth/login');
    }
    const user = UserM.findOne({ _id: req.signedCookies.id});
    if(!user){
        res.redirect('/auth/login');
    }
    res.locals.userLogin = user;
    next();
};
module.exports.loginOrNo = (req, res ,next) => {
    if(req.signedCookies.id){
        const user = UserM.findOne({ _id: req.signedCookies.id});
        if(user){
            res.locals.userLogin = user;
        }
        }
    next();
};