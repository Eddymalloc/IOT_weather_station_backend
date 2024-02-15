const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
          validator: function (v) {
            return emailRegex.test(v);
          },
          message: props => `${props.value} is not a valid email address!`,
        },
    },
    password: {
      type: String,
      required: true,
    },
    plage: {
      type: Array,
      required: false,
    },
    region: {
      type: String,
      required: false,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    loginDate: {
      type: Date,
      required: false,
    },
  });

userSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = mongoose.model('User', userSchema);