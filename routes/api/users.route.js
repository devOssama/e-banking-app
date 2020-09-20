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
    check('firstName', 'Le prénom est requis').not().isEmpty(),
    check('lastName', 'Le nom est requis').not().isEmpty(),
    check('email', 'Veuillez inclure une adresse e-mail valide').isEmail(),
    check(
      'password',
      'Veuillez saisir un mot de passe de 8 caractères ou plus'
    ).isLength({ min: 8 }),
    check('dateOfBirth', 'la date de naissance est requise').not().isEmpty(),
    check('phone', 'le numéro de téléphone est requis').not().isEmpty(),
    check('city', 'La ville est requise').not().isEmpty(),
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
          .json({ errors: [{ msg: `L'utilisateur existe déjà.` }] });
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
