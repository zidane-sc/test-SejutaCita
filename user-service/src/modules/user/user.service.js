const bcrypt = require('bcrypt');
const { UserAlreadyUsedError, UserNotFoundError } = require('../../lib/error');
const User = require('./models/user.model');

const basicDetails = ({ id, username, role }) => ({ id, username, role });

module.exports = {
  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
  
    return basicDetails(user);
  },

  async getAllUser() {
    const users = await User.find();

    return users.map(basicDetails);
  },

  async createUser({ username, password, role }) {
    const user = new User({ username, role });
    user.password = await bcrypt.hash(password, 10);
  
    try {
      await user.save();
    } catch (err) {
      if (err.code == 11000) {
        throw new UserAlreadyUsedError()
      }

      throw err;
    }
  
    return basicDetails(user);
  },

  async updateUser(id, { username, password, role }) {
    const passwordHashed = await bcrypt.hash(password, 10); 
    
    try {
      const user = await User.findOneAndUpdate({ _id: id }, { username, role, password: passwordHashed }, { new: true });
      return basicDetails(user);
    } catch (err) {
      if (err.code == 11000) {
        throw new UserAlreadyUsedError()
      }

      throw err;
    }
  },

  async deleteUser(id) {    
    const user = await this.getUserById(id);
    try {
      await User.findByIdAndDelete(id);
    } catch (err) {
      if (err.code == 11000) {
        throw new UserAlreadyUsedError()
      }

      throw err;
    }

    return basicDetails(user);
  },
}
