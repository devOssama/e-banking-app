const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const Bank = require('../../models/Bank.model');

//@route  GET api/bank/info
//@desc   show bank status
//@access Private
router.get('/info', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(500).send('Unauthorized');
    }
    const bank = await Bank.findOne({ bankName: 'banque populaire' });

    if (!bank) {
      return res.status(400).json({ msg: 'There is no such bank' });
    }

    res.json(bank);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  Post api/bank
//@desc   Create/Update bank info
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check(
        'bankName',
        'Le nom de la banque doit comporter au moins 2 caractères! '
      ).isLength({ min: 2 }),
      check(
        'totalDeposit',
        `Le sold total doit être d'au moins 100 DH!`
      ).isLength({ min: 3 }),
    ],
  ],
  async (req, res) => {
    if (req.user.role !== 'admin') {
      return res.status(500).send('Unauthorized');
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bankName, totalDeposit } = req.body;
    //Build profile Object
    const bankFields = {
      bankName,
      totalDeposit,
    };

    try {
      let bank = await Bank.findOne({ bankName });

      if (bank) {
        bank = await Bank.findOneAndUpdate(
          { bankName: bankName },
          { $set: bankFields },
          { new: true }
        );

        return res.json(bank);
      }

      //Create
      bank = new Bank(bankFields);

      await bank.save();

      res.json(bank);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/bank
//@desc   GET all banks
//@access Public
router.get('/', async (req, res) => {
  try {
    const banks = await Bank.find().populate('user', 'name');
    res.json(banks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/profile/user/:bankName
//@desc   GET profile by bankName
//@access Public
router.get('/user/:bankName', async (req, res) => {
  try {
    const bank = await Bank.findOne({ bankName: 'banque populaire' });

    if (!bank) {
      return res.status(400).json({ msg: 'Bank not found.' });
    }

    res.json(bank);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
