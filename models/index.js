const Sequelize = require("sequelize");
const Users = require("./users");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

db.Users = Users;
db.Comment = Comment;

Users.init(sequelize);
Comment.init(sequelize);

Users.associate(db);
Comment.associate(db);

module.exports = db;