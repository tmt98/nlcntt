const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

AdminBro.registerAdapter(AdminBroMongoose);

const AdminControl = {
  name: "Admin",
  icon: "InventoryManagement",
};
const adminBro = new AdminBro({
  rootPath: "/admin",
  branding: {
    companyName: "GoGoShare",
  },
  databases: [mongoose],
  resources: [
    {
      resource: Post,
      options: {
        parent: AdminControl,
      },
      properties: {
        content: { type: "richtext" },
      },
    },
    {
      resource: User,
      options: {
        parent: AdminControl,
      },
      properties: {},
    },
    {
      resource: Comment,
      options: {
        parent: AdminControl,
      },
      properties: {},
    },
  ],
});
const ADMIN = {
  email: process.env.ADMIN_EMAIL || "admin@gmail.com",
  password: process.env.ADMIN_PASSWORD || "admin",
};
const router = AdminBroExpress.buildRouter(adminBro);
// const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
//   cookieName: process.env.ADMIN_COOKIE_NAME || "admin-bro",
//   cookiePassword: process.env.ADMIN_COOKIE_PASS || "123456",
//   authenticate: async (email, password) => {
//     if (email === ADMIN.email && password === ADMIN.password) {
//       return ADMIN;
//     }
//     return null;
//   },
// });
module.exports = router;
