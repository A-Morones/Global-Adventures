const User = require('./User');
const Thread = require('./thread');
const Comment = require('./comment');

User.associate({ Thread, Comment });
Thread.associate({ User });
Comment.associate({ User, Thread });

module.exports = {
    User,
    Thread,
    Comment,
};