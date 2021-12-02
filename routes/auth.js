const express = require('express');
const router = express.Router();
require('../middlewares/auth');
const { param, body, validationResult } = require('express-validator');
require('dotenv').config();

router.post(
  '/auth',
  body('username').isAlpha().isLength({ min: 4, max: 20 }),
  body('password').isLength({ min: 8, max: 40 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Auth failed' });
    }

    res.status(200).json({
      token: token,
    });
  }
);
