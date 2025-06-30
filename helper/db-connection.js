const mongoose = require('mongoose');
let dbConnection = null;
console.log({
  MONGO_URI: process.env.MONGO_URI,
})
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then((connection) => {
    dbConnection = connection;
    console.log('✅ MongoDB Connected')
  })
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

module.exports = {
    getDBConnection: () => dbConnection,
}