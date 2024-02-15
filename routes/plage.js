const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.use(express.json());

router.post('/:user/updatePlage', async (req, res) => {
    const username = req.params.user;
    const newPlage = req.body.plage;
    const newRegion = req.body.region;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        // Check if the user exists
        if (!user) {
            return res.status(404).send(`User with username ${username} not found`);
        }

        // Update the plage parameter
        user.plage = newPlage;
        user.region = newRegion;

        // Save the updated user
        await user.save();

        res.status(200).send(`Plage updated successfully for user ${username}`);
    } catch (error) {
        res.status(500).send(`Error updating plage for user ${username}: ${error.message}`);
    }
});

module.exports = router;