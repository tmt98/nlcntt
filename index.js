require('dotenv').config();
// Test

// req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });;

var homeRoute =  require('./routes/home.route');
var userRoute =  require('./routes/user.route');
var postRoute =  require('./routes/post.route');
var authRoute =  require('./routes/auth.route');
var ajaxRoute = require('./routes/ajax.route');
var adminRoute = require('./routes//admin.route');

var apiUserRoute = require('./api/routes/user.route');

var port = 3000;
var app = express();
// Set pug engine-->
app.set('view engine', 'pug');
app.set('views', './views');
// Set req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
//
var authMiddleware = require('./middleware/auth.middleware')

// Router
app.use('/public', express.static('public'))
app.use('/', authMiddleware.loginOrNo, homeRoute); // Trang Chủ
app.use('/user', userRoute); // Người dùng - User
app.use('/post', postRoute); // Bài Viết - Post
app.use('/auth', authRoute); // Xác thực đăng nhập
app.use('/ajax', ajaxRoute); // Gọi AJAX
app.use('/admin', adminRoute); // Admin Controller

// Server API
app.use('/api/user', apiUserRoute); 
// Listen Port
app.listen(port, () => console.log("Server is running..."));