const User = require('./user');
const Thread = require('./thread');
const Comment = require('./comment');

// Associations
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

Thread.hasMany(Comment, { foreignKey: 'threadId' });
Comment.belongsTo(Thread, { foreignKey: 'threadId' });

module.exports = { User, Thread, Comment };
