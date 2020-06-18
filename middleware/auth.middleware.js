var UserM = require("../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.signedCookies.id) {
    res.redirect("/auth/login");
  }
  const user = await UserM.findOne({ _id: req.signedCookies.id });
  if (!user) {
    res.redirect("/auth/login");
  } else {
    res.locals.userLogin = user;
    next();
  }
};
module.exports.loginOrNo = async (req, res, next) => {
  if (req.signedCookies.id) {
    const user = await UserM.findOne({ _id: req.signedCookies.id });
    if (user) {
      res.locals.userLogin = user;
    }
  }
  next();
};
