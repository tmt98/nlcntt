// req.query
const express = require('express');
const bodyParser = require('body-parser');

const homeRoute =  require('./routes/home.route')
const userRoute =  require('./routes/user.route')
const postRoute =  require('./routes/post.route')
const db = require('./db');

const port = 3000;
const app = express();
// Set pug engine-->
app.set('view engine', 'pug');
app.set('views', './views');
// Set req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/public', express.static('public'))

app.use('/',homeRoute) // Trang Chủ
app.use('/user',userRoute) // Người dùng - User
app.use('/post',postRoute) // Bài Viết - Post
// Listen Port
app.listen(port, () => console.log("Server is running..."));