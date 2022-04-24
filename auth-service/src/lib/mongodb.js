const mongoose = require('mongoose');
const logger = require('./logger');
const bcrypt = require('bcrypt');

const User = require('../modules/auth/models/user.model');

module.exports = {
  connectDB: async () => {
    try {
      await mongoose.connect(
        process.env.MONGODB_URL, {
        useNewUrlParser: true,
      },
      );
      logger.info('MongoDb Connection open')
    } catch (err) {
      logger.error(err);
      process.exit(1);
    }
  },

  disconnectDB: async () => {
    mongoose.connection.close(false, () => {
      logger.info('MongoDb Connection closed')
      process.exit(0)
    })
  },

  seedDB: async () => {
    const userSeeder = [
      {
        username: 'admin',
        password: bcrypt.hashSync('admin', 10),
        role: 'admin',
      },
      {
        username: 'user',
        password: bcrypt.hashSync('user', 10),
        role: 'user',
      }
    ]

    await User.bulkWrite(userSeeder.map(user => ({
      updateOne: {
        filter: { username: user.username },
        update: user,
        upsert: true,
      },
    }))).then(logger.info('Seeding user data success!')).catch(err => logger.error(err));
  }
}