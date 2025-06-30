const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  walletAmount: Number,
  transactionTimestamp: Date,
});

const User = mongoose.model('User', UserSchema);
module.exports = User
