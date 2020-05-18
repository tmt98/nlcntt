var UserM = require('../models/user.model');
var PostM = require('../models/post.model');

module.exports.like = async (req, res) =>{
    // Biến ID
    var ID_CMT = req.params.id;
    var ID_POST =  req.body.idpost;
    var ID_USER_LIKE = req.signedCookies.id;
    console.log(ID_CMT);
    // console.log(req.body)
    // console.log(req.signedCookies.id);
    // -->
    // var LIKE = await PostM.updateOne({'_id': ID_POST,'comment._idcmt':ID_CMT}, { $push: {'comment.$.like':ID_USER_LIKE} })
    var LIKE = await PostM.findOne({'_id': ID_POST,'comment._idcmt':ID_CMT})
    console.log(LIKE);
    res.send({
        success: true,
    });

}
module.exports.unlike = async (req, res) =>{
    // Biến ID
    var ID_CMT = req.params.id;
    var ID_POST =  req.body.idpost;
    var ID_USER_LIKE = req.signedCookies.id;
    console.log(ID_CMT);
    // console.log(req.body)
    // console.log(req.signedCookies.id);
    // -->
    var UNLIKE = await PostM.updateOne({'_id': ID_POST,'comment._idcmt':ID_CMT},
        { $pullAll: {'comment.$.like': ID_USER_LIKE } }
        )
    console.log(UNLIKE);
    res.send({
        success: true,
    });

}