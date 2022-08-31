var express = require('express');
var router = express.Router();
const User = require('../models/user')

router.post('/resgister', async(req, res) =>{
  const { name, email, password } = req.bady;
  const user = new User({ name, email, password});

  try {
    await user.save();
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: 'Error registering new user'});
  }
})

module.exports = router;
