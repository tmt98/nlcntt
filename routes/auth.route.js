const express = require('express');
var multer = require('multer');

const controller = require('../controllers/auth.controller')
var upload = multer({ dest: 'public/upload/avatar/' })

const router = express.Router(); // POST/GET
router.get('/login', controller.login); // Login
router.post('/login', controller.loginPOST); // Check Login
router.get('/signup', controller.signup); // Sign Up
router.post('/signup', upload.single('avatar'), controller.signupPOST); // Sign Up Post
router.get('/logout', controller.logout);

module.exports = router;