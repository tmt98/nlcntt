const express = require('express')

const db = require('../db');
const controller = require('../controllers/auth.controller')

const router = express.Router(); // POST/GET
router.get('/login', controller.login); // Login
router.post('/loginPOST', controller.loginPOST); // Check Login
router.get('/logup', controller.logup); // Logup
router.post('/logupPOST', controller.logupPOST); // Logup
router.get('/logout', controller.logout);

module.exports = router;