const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            username: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                field: "password",
                type: DataTypes.STRING(30),
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
            modelName: "User",
            tableName: "users",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate(db) {
        db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" })
    }
};