const express = require('express');
const router = express.Router();

const weather = require('../middlewares/weather');

router.use(express.json());

router.get('/:location', async (req, res) => {
    const location = req.params.location;
    try {
        const temperature = await weather(location); // Await the weather function call
        res.send(temperature); // The temperature is already a string (from your weather function)
    } catch (error) {
        res.status(500).send(`Error getting weather data: ${error.message}`);
    }
});

module.exports = router;