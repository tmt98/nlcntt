const express = require('express')

const db = require('../db');
const controller = require('../controllers/home.controller');

const router = express.Router(); // POST/GET
router.get('/', controller.index); // INDEX
router.get('/search', controller.search); // Search

module.exports = router;