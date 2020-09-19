const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const Transaction = require('../../models/Transaction.model');
const Profile = require('../../models/Profile.model');

//@route  POST api/transaction
//@desc   Create transaction
//@access Private
router.post(
  '/',
  [
    auth,
    [
      check(
        'targetAccountNumber',
        'Account number should be at least 8 carachters ! '
      ).isLength({ min: 8 }),
      check('amount', 'Please enter an amount with 10 DH at least').isFloat({
        min: 10,
      }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { targetAccountNumber, amount } = req.body;
    let targetAccount = await Profile.findOne({
      accountNumber: targetAccountNumber,
    });
    if (!targetAccount) {
      return res.status(404).json({ msg: 'Account not found' });
    }

    let currentAccount = await Profile.findOne({ user: req.user.id });
    const { accountNumber, Balance } = currentAccount;

    if (accountNumber === targetAccountNumber) {
      return res
        .status(404)
        .json({ msg: `you can't transfer to your account` });
    }
    if (Balance - amount < 0) {
      return res.status(404).json({ msg: 'Balance is not enought' });
    }

    //Build transaction Object
    const transactionFields = {
      user: req.user.id,
      accountNumber,
      targetAccount: targetAccountNumber,
      Amount: amount,
    };

    try {
      //Create
      transaction = new Transaction(transactionFields);
      currentAccount = await Profile.findOneAndUpdate(
        { accountNumber: accountNumber },
        { Balance: Balance - amount },
        { new: true }
      );

      targetAccount = await Profile.findOneAndUpdate(
        { accountNumber: targetAccountNumber },
        { Balance: parseFloat(targetAccount.Balance) + parseFloat(amount) },
        { new: true }
      );

      await currentAccount.save();
      await targetAccount.save();
      await transaction.save();

      res.json(transaction);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route  GET api/transaction
//@desc   GET all transactions
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('user', [
      'firstName',
      'lastName',
      'email',
    ]);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
