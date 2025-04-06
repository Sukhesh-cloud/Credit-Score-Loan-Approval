const express = require('express');
const router = express.Router();

const users = [];

router.post('/register', (req, res) => {
  const { name, email } = req.body;
  users.push({ name, email });
  res.json({ msg: 'User registered', users });
});

router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
