require('dotenv').config();
const express = require('express');


const app = express();
app.use(express.json());

require('./helper/db-connection')

// // Routes
// app.post('/users', async (req, res) => {
//   const user = await User.create(req.body);
//   res.json(user);
// });

// app.get('/users', async (req, res) => {
//   const users = await User.find();
//   res.json(users);
// });
app.use(require('./controller/index'))

// Start server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
