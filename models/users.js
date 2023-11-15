const Sequelize = require("sequelize");

module.exports = class Users extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            username: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            password: {
                field: "password",
                type: Sequelize.STRING(255),
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps: false,
            modelName: "Users",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.Users.hasMany(db.Posts, { foreignKey: "publisher", sourceKey: "id" })
    }
};