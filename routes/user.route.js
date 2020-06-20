const express = require("express");
var multer = require("multer");

const db = require("../db");
const controller = require("../controllers/user.controller");

var upload = multer({ dest: "public/upload/avatar/" });

const router = express.Router(); // POST/GET
router.get("/", controller.index); // Index /user
router.get("/search", controller.search); // Tìm kiếm User /search?q=
router.get("/create", controller.create); // Tạo User /create
router.post("/create", controller.createPOST); // Thực Thi Tạo user
router.get("/:id", controller.id); // View Profile /user/id/

module.exports = router;
