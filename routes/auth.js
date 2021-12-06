const express = require('express');
const router = express.Router();
const { param, body, validationResult } = require('express-validator');
const { checkLogin, signJwt, signup } = require('../middlewares/auth');
require('dotenv').config();

router.post(
  '/login',
  body('username').isAlpha().isLength({ min: 4, max: 20 }),
  body('password').isLength({ min: 8, max: 40 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: 'Auth failed. Invalid Input.', data: errors });
    }
    checkLogin(req.body.username, req.body.password).then(function (success) {
      if (success === true) {
        const userObj = { username: req.body.username };
        const token = signJwt(userObj);
        res.status(200).json({
          token: token,
        });
      }
      res.status(400).json({ error: 'Auth failed' });
    });
  }
);

router.post(
  '/signup',
  body('username').isAlpha().isLength({ min: 4, max: 20 }),
  body('password').isLength({ min: 8, max: 40 }),
  body('firstname').isAlpha().isLength({ min: 2, max: 100 }),
  body('lastname').isAlpha().isLength({ min: 2, max: 100 }),
  body('email').isEmail().isLength({ max: 100 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: 'Signup failed. Invalid Input.', data: errors });
    }
    signup(
      req.body.username,
      req.body.password,
      req.body.firstname,
      req.body.lastname,
      req.body.email
    )
      .then(function (result) {
        console.log(result);
        res.status(200).json({ id: result });
      })
      .catch(function (error) {
        res.status(400).json({ error: error.message });
      });
  }
);

module.exports = router;
