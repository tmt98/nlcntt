const express = require("express");
const controller = require("../controllers/home.controller");

const router = express.Router(); // POST/GET
router.get("/", controller.index); // INDEX
router.get("/search", controller.search); // Search
router.get("/searchWithTag", controller.searchWithTag);

module.exports = router;
