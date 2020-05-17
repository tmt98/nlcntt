var UserM = require('../models/user.model');
var PostM = require('../models/post.model');

module.exports.like = async (req, res) =>{
    var idLike = req.signedCookies.id;
    console.log(req.body);
    let A = await PostM.findOne({_id : req.params.id })
    // console.log(A);
    return true;

}
module.exports.unlike = (req, res) =>{
    // console.log('body: ' + JSON.stringify(req.body));
    res.send("success");
    return true;

}