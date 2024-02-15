const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        // Find all users
        const users = await User.find();

        // Check if there are no users
        if (!users || users.length === 0) {
            return res.status(404).send('No users found');
        }

        res.send(users);
    } catch (error) {
        res.status(500).send(`Error fetching users: ${error.message}`);
    }
});

router.get('/:user', async (req, res) => {
    const username = req.params.user;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(404).send(`User with username ${username} not found`);
        }
        res.send(user);

        // res.status(200).send(`user get: ${username}`);
    } catch (error) {
        res.status(500).send(`Error updating plage for user ${username}: ${error.message}`);
    }
});

module.exports = router;