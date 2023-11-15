const Sequelize = require("sequelize");
const Users = require("./users");
const Posts = require("./posts");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Users = Users;
db.Posts = Posts;

Users.init(sequelize);
Posts.init(sequelize);

Users.associate(db);
Posts.associate(db);

module.exports = db;