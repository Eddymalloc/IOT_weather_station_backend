const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.use(express.json());

router.post('/', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user  = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash
  })
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(404).json({ message: "not found" });
    console.log("400 " + err);
  };
});

module.exports = router;