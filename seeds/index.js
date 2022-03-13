const sequelize = require('../config/connection');
const seedBlogs = require('./blogData');
const seedCreators = require('./creatorData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedCreators();

  await seedBlogs();

  process.exit(0);
};

seedAll();
