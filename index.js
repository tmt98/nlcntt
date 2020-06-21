require("dotenv").config();
// Test

// req.query
// Firebase Set Up
// const admin = require("firebase-admin");
// const serviceAccount = require("./FirebaseKey.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://nienluancntt-b1606931.firebaseio.com",
// });
// let firebaseDB = admin.firestore();
//

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

const homeRoute = require("./routes/home.route");
const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const ajaxRoute = require("./routes/ajax.route");
// > ADMIN ROUTE
const adminRoute = require("./routes/admin.route");

const apiUserRoute = require("./api/routes/user.route");

const port = 3000;
const app = express();
// Set pug engine-->
app.set("view engine", "pug");
app.set("views", "./views");
app.use("/admin", adminRoute);

// Set req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY));
//
const authMiddleware = require("./middleware/auth.middleware");

// Router
app.use("/public", express.static("public"));
app.use("/", authMiddleware.loginOrNo, homeRoute); // Trang Chủ
app.use("/user", userRoute); // Người dùng - User
app.use("/post", postRoute); // Bài Viết - Post
app.use("/auth", authRoute); // Xác thực đăng nhập
app.use("/ajax", ajaxRoute); // Gọi AJAX

// Server API
app.use("/api/user", apiUserRoute);
// Listen Port
app.listen(port, () => console.log("Server is running..."));
