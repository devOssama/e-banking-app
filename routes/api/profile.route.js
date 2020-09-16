const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.middleware');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile.model');
const checkObjectId = require('../../middleware/checkObjectId');
//@route  GET api/profile/me
//@desc   Get current users profile
//@access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['firstName', 'lastName']);

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route  POST api/profile
//@desc   Create/Update user profile
//@access Private
router.post('/', [auth,
    [
        check("accountNumber", "Account number should be at least 8 carachters ! ")
            .isLength({ min: 6 }),
        check('Balance', "Please enter an amount with 10 DH at least").isLength({ min: 2 })
    ]], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { accountNumber, Balance } = req.body;
        //Build profile Object

        const profileFields = {
            user: req.user.id,
            accountNumber,
            Balance
        };

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }


            //Create
            profile = new Profile(profileFields);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }


    });

//@route  GET api/profile
//@desc   GET all profiles
//@access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['firstName', 'lastName']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route  GET api/profile/user/:user_id
//@desc   GET profile by user ID
//@access Public
router.get('/user/:user_id', checkObjectId('user_id'), async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['firstName', 'lastName']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found.' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/credit
//@desc Credit profile by account Number
//@access Private
router.put('/credit', [auth,
    [
        check("accountNumber", "Account number should be at least 8 carachters ! ")
            .isLength({ min: 8 }),
        check('amount', "Please enter an amount with 10 DH at least").isFloat({ min: 10 })
    ]], async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { accountNumber, amount } = req.body;

        let profile = await Profile.findOne({ accountNumber: accountNumber });
        if (!profile) { return res.status(400).json({ msg: 'Profile not found.' }); }
        let bank = await Bank.findOne({ bankName: 'banque populaire' });

        const userBalance = parseInt(profile.Balance);
        const totalBankBalance = parseInt(bank.totalDeposit);

        if (totalBankBalance < amount) { return res.status(500).json({ msg: 'Not enought balance !' }); }

        try {
            profile = await Profile.findOneAndUpdate(
                { accountNumber: accountNumber },
                { Balance: userBalance + parseInt(amount) },
                { new: true }
            );

            bank = await Bank.findOneAndUpdate(
                { bankName: 'banque populaire' },
                { totalDeposit: totalBankBalance - parseInt(amount) },
                { new: true }
            );

            await profile.save();
            await bank.save();

            return res.json(profile);


        } catch (e) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


//@route PUT api/profile/debit
//@desc Debit profile by account Number
//@access Private
router.put('/debit', [auth,
    [
        check("accountNumber", "Account number should be at least 8 carachters ! ")
            .isLength({ min: 8 }),
        check('amount', "Please enter an amount with 10 DH at least").isFloat({ min: 10 })
    ]], async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { accountNumber, amount } = req.body;

        let profile = await Profile.findOne({ accountNumber: accountNumber });
        if (!profile) { return res.status(400).json({ msg: 'Profile not found.' }); }
        let bank = await Bank.findOne({ bankName: 'banque populaire' });

        const userBalance = parseInt(profile.Balance);
        const totalBankBalance = parseInt(bank.totalDeposit);

        if (userBalance < amount) { return res.status(500).json({ msg: 'Not enought balance !' }); }

        try {
            profile = await Profile.findOneAndUpdate(
                { accountNumber: accountNumber },
                { Balance: userBalance - parseInt(amount) },
                { new: true }
            );

            bank = await Bank.findOneAndUpdate(
                { bankName: 'banque populaire' },
                { totalDeposit: totalBankBalance + parseInt(amount) },
                { new: true }
            );

            await profile.save();
            await bank.save();

            return res.json(profile);


        } catch (e) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });



module.exports = router;