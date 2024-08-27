// models/Thread.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Thread extends Model {
    static associate(models) {
        User.hasMany(models.Thread, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
        Thread.hasMany(models.Comment, {
            foreignKey: 'thread_id',
            onDelete: 'CASCADE',
        });
        Thread.belongsTo(User, {
            foreignKey: 'user_id',
        });
    }
    toJSON() {
        const attributes = this.get();
        delete attributes.user_id;
        return attributes;
    }
}

Thread.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
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
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'thread',
    paranoid: true,
    hooks: {
        beforeCreate: async (thread) => {
            if (!thread.title ||!thread.body) {
                throw new Error('Title and body are required.');
            } if (!thread.user_id) {
                throw new Error('User ID is required.');
                
            }
        },
    },

});

module.exports = Thread;
