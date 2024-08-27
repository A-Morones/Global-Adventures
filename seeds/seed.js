const sequelize = require('../config/connection');
const { User, Thread, Comment } = require('../models/Index');

const userSeedData = require('./userData.json');
const seedThreads = require('./threadsData.json');
const seedComments = require('./commentsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  const users = await User.bulkCreate(userSeedData, { individualHooks: true, returning: true });

  // Seed threads with proper associations
  for (const thread of seedThreads) {
    const user = users.find(user => user.id === thread.userId);
    await Thread.create({
      title: thread.title,
      content: thread.body, // Change 'body' to 'content' if your model expects 'content'
      userId: user.id,
    });
  }

  // Seed comments with proper associations
  for (const comment of seedComments) {
    const thread = seedThreads.find(thread => thread.id === comment.threadId);
    const user = users.find(user => user.id === comment.userId);
    await Comment.create({
      body: comment.body,
      threadId: thread.id,
      userId: user.id,
    });
  }

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();
