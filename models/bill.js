const mongoose = require('mongoose');
// Bill(_id, userId, name, type, lastPaidDate, status(pending, processing, paid), amount, currency, createdAt, updatedAt)
const BillSchema = new mongoose.Schema({
  userId: String,
  name: String,
  type: String,
  lastPaidDate: Date,
  status: String,
  amount: Number,
  currency: String,
});

const Bill = mongoose.model('Bill', BillSchema);
module.exports = Bill
