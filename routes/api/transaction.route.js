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
        'Le numéro de compte doit comporter au moins 8 caractères!'
      ).isLength({ min: 8 }),
      check('amount', `Veuillez saisir un montant d'au moins 10 DH`).isFloat({
        min: 10,
      }),
    ],
  ],
  async (req, res) => {
    if (req.user.role !== 'user') {
      return res.status(500).send('Unauthorized');
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { targetAccountNumber, amount } = req.body;
    let targetAccount = await Profile.findOne({
      accountNumber: targetAccountNumber,
    });
    if (!targetAccount) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'le compte est introuvable.' }] });
    }

    let currentAccount = await Profile.findOne({ user: req.user.id });
    const { accountNumber, Balance } = currentAccount;

    if (accountNumber === targetAccountNumber) {
      return res
        .status(404)
        .json({
          errors: [{ msg: `vous ne pouvez pas transférer vers votre compte` }],
        });
    }
    if (Balance - amount < 0) {
      return res.status(404).json({ errors: [{ msg: 'Pas assez de solde!' }] });
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
  if (req.user.role !== 'admin') {
    return res.status(500).send('Unauthorized');
  }
  try {
    const transactions = await Transaction.find()
      .sort({ _id: -1 })
      .populate('user', ['firstName', 'lastName'])
      .limit(10);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route  GET api/transaction/personal
//@desc   GET own transactions
//@access Private
router.get('/personal', auth, async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(500).send('Unauthorized');
    }
    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ _id: -1 })
      .populate('user', ['firstName', 'lastName'])
      .limit(10);
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
