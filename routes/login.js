const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use(express.json());

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const loginDate = Date.now();

  try {
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
        return res.status(404).send(`User with username ${username} not found`);
    }

    // Check if the password is correct
    const isPasswordValid = await user.isValidPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful' });

    // Update the loginDate parameter
    user.loginDate = loginDate;

    // Save the updated user
    await user.save();
    // Password is correct, you can proceed with authentication

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;