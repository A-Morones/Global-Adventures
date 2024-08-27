// models/Thread.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thread extends Model {}

Thread.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'thread',
        freezeTableName: true,
        underscored: true,
    }
);

// Associations
Thread.associate = (models) => {
    Thread.belongsTo(models.User, {
        foreignKey: 'userId',
    });
};

module.exports = Thread;
