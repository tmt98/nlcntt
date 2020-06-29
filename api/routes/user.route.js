const express = require("express");

const controller = require("../controllers/user.controller");

const router = express.Router(); // POST/GET
router.get("/", controller.index); // Index /api/user
router.get("/:id", controller.id); // GET Profile /api/user/id/
// router.get('/search', controller.search); // Tìm kiếm User /search?q=
// router.get('/create', controller.create); // Tạo User /create
// router.post('/create', controller.createPOST); // Thực Thi Tạo user
// router.get('/:id', controller.id); // View Profile /user/id/

module.exports = router;
