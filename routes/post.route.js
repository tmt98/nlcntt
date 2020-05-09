const express = require('express');
var multer = require('multer');

const db = require('../db');
const controller = require('../controllers/post.controller')
//
var authMiddleware = require('../middleware/auth.middleware')

var upload = multer({ dest: 'public/upload/avatar/' })

const router = express.Router(); // POST/GET
router.get('/create', authMiddleware.requireAuth, controller.create); // Create
router.post('/createPOST', upload.single('customFile'), controller.createPOST); // Execute Create Post
// router.post('/upload', upload.any(), controller.upload); // Upload
router.get('/:id', controller.id); // View Post
module.exports = router;