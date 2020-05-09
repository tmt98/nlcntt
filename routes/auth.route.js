const express = require('express');
var multer = require('multer');

const db = require('../db');
const controller = require('../controllers/auth.controller')
var upload = multer({ dest: 'public/upload/avatar/' })

const router = express.Router(); // POST/GET
router.get('/login', controller.login); // Login
router.post('/loginPOST', controller.loginPOST); // Check Login
router.get('/logup', controller.logup); // Logup
router.post('/logupPOST', upload.single('avatar'), controller.logupPOST); // Logup
router.get('/logout', controller.logout);

module.exports = router;