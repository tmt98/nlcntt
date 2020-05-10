// req.query
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/NienLuanCNTT", { useNewUrlParser: true })

var homeRoute =  require('./routes/home.route')
var userRoute =  require('./routes/user.route')
var postRoute =  require('./routes/post.route')
var authRoute =  require('./routes/auth.route')

var port = 3000;
var app = express();
// Set pug engine-->
app.set('view engine', 'pug');
app.set('views', './views');
// Set req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('nlcntt2020'));
//
var authMiddleware = require('./middleware/auth.middleware')

// Router
app.use('/public', express.static('public'))
app.use('/', authMiddleware.loginOrNo, homeRoute) // Trang Chủ
app.use('/user',userRoute) // Người dùng - User
app.use('/post', postRoute) // Bài Viết - Post
app.use('/auth',authRoute) // Xác thực đăng nhập
// Listen Port
app.listen(port, () => console.log("Server is running..."));