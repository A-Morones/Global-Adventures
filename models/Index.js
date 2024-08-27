const User = require('./User');
const Thread = require('./Thread');
const Comment = require('./Comment');

User.associate({ Thread, Comment });
Thread.associate({ User });
Comment.associate({ User, Thread });

module.exports = {
    User,
    Thread,
    Comment,
};