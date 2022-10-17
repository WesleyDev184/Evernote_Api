const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

/* This is the route for registering a new user. It takes the name, email, and password from the
request body and creates a new user with that information. It then saves the user to the database
and returns a status of 200 and the user. If there is an error, it returns a status of 500 and an
error message. */
router.post('/register', async(req, res) =>{
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: 'Error registering new user'});
  }
})

/* This is the route for logging in a user. It takes the email and password from the request body
and searches the database for a user with that email. If it finds a user, it checks to see if the
password is correct. If it is, it creates a token and returns the user and the token. If it is not,
it returns a status of 401 and an error message. If it does not find a user, it returns a status of
401 and an error message. If there is an error, it returns a status of 500 and an error message. */
router.post('/login', async(req, res) =>{
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Incorrect email or password'});
    } else {
      user.isCorrectPassword(password, function(err, same){
        if (!same) {
          res.status(401).json({ error: 'Incorrect email or password'});
        } else {
          const token = jwt.sign({email}, secret, {expiresIn: '10d'});
          res.json({user: user, token: token})
        }
      })
    }
  } catch (error) {
    res.status(500).json({error: 'Internal error, try again'})
  }
})

module.exports = router;
