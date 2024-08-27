// models/Thread.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); // Adjust the path to your connection file

const Thread = sequelize.define('Thread', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // 'Users' refers to the table name
            key: 'id'
        }
    }
}, {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
    tableName: 'threads' // You can specify the table name explicitly if needed
});

module.exports = Thread;
