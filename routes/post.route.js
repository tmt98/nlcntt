const express = require('express')
const http = require('http');
const path = require('path');
const multer  = require('multer');

const db = require('../db');
const upload = multer({ dest: "/public/img/user-upload" });
const controller = require('../controllers/post.controller')

const router = express.Router(); // POST/GET
router.get('/create', controller.create); // Create Post
router.post('/upload', upload.any(), controller.upload); // Upload
router.get('/:id', controller.id); // View Post

module.exports = router;