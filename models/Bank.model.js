const mongoose = require('mongoose');

const BankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
        default: "Banque populaire",
        unique: true
    },
    totalUser: {
        type: Number,
        default: 0,
        min: 0
    },
    totalDeposit: {
        type: Number,
        required: true,
        default: 10000,
        min: 0
    }
});

module.exports = Bank = mongoose.model('bank', BankSchema);