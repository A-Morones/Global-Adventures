const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'user',
        freezeTableName: true,
        underscored: true,
    }
);

// Associations
User.associate = (models) => {
    User.hasMany(models.Thread, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
    User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
    });
};

module.exports = User;
