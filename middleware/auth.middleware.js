const db = require('../db');
module.exports.requireAuth = (req, res ,next) => {
    if(!req.signedCookies.id){
         res.redirect('/auth/login');
         return;
    }
    const user = db.get("users").find({ id: req.signedCookies.id}).value();
    if(!user){
        res.redirect('/auth/login');
         return;
    }
    res.locals.userLogin = user;
    next();
};
module.exports.loginOrNo = (req, res ,next) => {
    if(req.signedCookies.id){
        const user = db.get("users").find({ id: req.signedCookies.id}).value();
        if(user){
            res.locals.userLogin = user;
            next();
        }
    }
    next();
};