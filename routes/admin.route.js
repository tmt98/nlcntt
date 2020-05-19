const express = require('express')
const controller = require('../controllers/admin.controller');

const router = express.Router(); // POST/GET
router.get('/admin', controller.admin); // ADMIN


module.exports = router;