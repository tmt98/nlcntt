const express = require('express')
const controller = require('../controllers/ajax.controller');

const router = express.Router(); // POST/GET
router.post('/like/:id', controller.like); // LIKE
router.post('/unlike/:id', controller.unlike); // UNLIKE
router.post('/comment/:id', controller.comment) // COMMENT

module.exports = router;