const express = require("express");
const controller = require("../controllers/ajax.controller");
const { response } = require("express");

const router = express.Router(); // POST/GET
router.post("/like/:id", controller.like); // LIKE
router.post("/unlike/:id", controller.unlike); // UNLIKE
router.post("/comment/:id", controller.comment); // COMMENT
router.post("/edit-comment/:id", controller.editcomment); // EDIT COMMENT
router.post("/delete-comment/:id", controller.deletecomment); // DELETE COMMENT
router.post("/follow/:id", controller.follow); // FOLLOW
router.post("/unfollow/:id", controller.unfollow); /// UNFOLLOW
router.post("/readall/:id", controller.readall); // READ NOTIFICATION

module.exports = router;
