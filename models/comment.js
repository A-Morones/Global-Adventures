const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class Comment extends Model {
    static associate(models) {
        User.hasMany(models.Comment, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
        Thread.hasMany(models.Comment, {
            foreignKey: 'thread_id',
            onDelete: 'CASCADE',
        });
        Comment.belongsTo(models.User, {
            foreignKey: 'user_id',
        });
        Comment.belongsTo(models.Thread, {
            foreignKey: 'thread_id',
        });
    }
    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    toJSON() {
        const { id, content, createdAt, updatedAt, user_id } = this.get();
        return { id, content, createdAt, updatedAt, userId: user_id };
    }
}

    
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        tableName: 'comments',
        paranoid: true,
        hooks: {
            beforeCreate: async (comment) => {
                if (!comment.user_id) {
                    throw new Error('User ID is required');
                }
            },
        },
    }
);

module.exports = Comment;
