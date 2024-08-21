const sequelize = require('../config/connection');
const { User, Thread } = require('../models');
const threadData = require('./threadData.json');
const userData = require('./userData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  
  const users = await User.bulkCreate(userData, { individualHooks: true });

  for (const thread of threadData) {
    await Thread.create({...thread, userId: users[Math.floor(Math.random() *
      users.length)].id });
      console.log(`Blog ${thread.title} created!`);
    
  }
  process.exit(0);

};

seedDatabase();