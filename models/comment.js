const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
        threadId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'thread',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'comment',
        freezeTableName: true,
        underscored: true,
    }
);

// Associations
Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
        foreignKey: 'userId',
    });
    Comment.belongsTo(models.Thread, {
        foreignKey: 'threadId',
    });
};

module.exports = Comment;
