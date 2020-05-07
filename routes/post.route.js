var express = require('express')
var http = require('http');
var path = require('path');
var multer = require('multer');

var db = require('../db');
var controller = require('../controllers/post.controller')
var upload = multer({ dest: 'public/upload/banner/' })

var router = express.Router(); // POST/GET
router.get('/create', controller.create); // Create
router.post('/createPOST',
    upload.single('banner_upload'), 
    controller.createPOST
    ); // Execute Create Post
// router.post('/upload', upload.any(), controller.upload); // Upload
router.get('/:id', controller.id); // View Post

module.exports = router;