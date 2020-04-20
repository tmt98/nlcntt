const express = require('express')

const db = require('../db');
const controller = require('../controllers/auth.controller')

const router = express.Router(); // POST/GET
router.get('/login', controller.login); // Create Post

module.exports = router;