const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/connection');
const bcrypt = require('bcrypt');

class Comment extends Model {
    static associate(models) {
        User.hasMany(models.Blog, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
        });
    }
    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }
    toJSON() {
        const { id, username, email } = this;
        return { id, username, email };
    }
    static async findOrCreateWithUsernameAndEmail(username, email, password) {
        const hashedPassword = await User.hashPassword(password);
        const [user, created] = await User.findOrCreate({
            where: { username, email },
            defaults: { password: hashedPassword },
        });
        return user;
    }
    static async authenticate(username, password) {
        const user = await User.findOne({ where: { username } });
        if (!user || !user.validatePassword(password)) {
            throw new Error('Invalid username or password');
        }
        return user;
    }
    static async getTopUsers(limit = 10) {
        return User.findAll({
            order: [['blogs_count', 'DESC']],
            limit,
            attributes: ['id', 'username', 'blogs_count'],
        });
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
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blogs',
                key: 'id',
            },
            allowNull: false,
        },
    }
);

module.exports = Comment;
