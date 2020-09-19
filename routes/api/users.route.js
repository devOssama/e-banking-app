const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User.model');
const Bank = require('../../models/Bank.model');
const Profile = require('../../models/Profile.model');

//@route  POST api/users
//@desc   Register User
//@access Public
router.post(
  '/',
  [
    check('firstName', 'firstname is required').not().isEmpty(),
    check('lastName', 'lastname is required').not().isEmpty(),
    check('email', 'Please include valid email address').isEmail(),
    check(
      'password',
      'Please enter a password with 8 or more characters'
    ).isLength({ min: 8 }),
    check('dateOfBirth', 'dateOfBirth is required').not().isEmpty(),
    check('phone', 'phone is required').not().isEmpty(),
    check('city', 'city is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      lastName,
      dateOfBirth,
      phone,
      city,
      email,
      password,
      role,
    } = req.body;

    try {
      //see if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists.' }] });
      }

      //new User
      user = new User({
        firstName,
        lastName,
        dateOfBirth,
        phone,
        city,
        email,
        password,
        role,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      if (role === 'user') {
        let bank = await Bank.findOne({ bankName: 'banque populaire' });
        let { totalUser } = bank;
        totalUser++;

        await Bank.findOneAndUpdate(
          { bankName: 'banque populaire' },
          { $set: { totalUser: totalUser } },
          { new: true }
        );
      }

      //return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        async (err, token) => {
          if (err) throw err;

          try {
            if (role === 'user') {
              //create a profile(account)
              const api = axios.create({
                baseURL: 'http://localhost:5000/api',
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': token,
                },
              });
              const accountData = {
                accountNumber: Math.floor(
                  10000000 + Math.random() * 90000000
                ).toString(),
                Balance: '100',
              };

              await api.post('/profile', accountData);
            }
          } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
          }

          res.json({ token });
        }
      );
      /* */
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
