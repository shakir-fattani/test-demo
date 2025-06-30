require('dotenv').config();
const mongoose = require('mongoose');
const { User, Bill } = require('./models')

const start = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('✅ MongoDB Connected')
    // await User.create({
    //     name: "Shakir",
    //     email: "shakir@gmail.com",
    //     walletAmount: 10000,
    //     transactionTimestamp: Date.now(),
    // })
    const users = await User.findOne({ email: "shakir@gmail.com" });
    console.log({
        users
    })
    const bill = await Bill.create({
        userId: users._id,
        name: 'testing bill '+Date.now(),
        type: 'cc',
        lastPaidDate: Date.now(),
        status: 'pending',
        amount: 10000,
        currency: 'AED',
    })
    console.log(bill);
    
    const bill1 = await Bill.create({
        userId: users._id,
        name: 'testing bill '+Date.now(),
        type: 'cc',
        lastPaidDate: Date.now(),
        status: 'pending',
        amount: 5000,
        currency: 'AED',
    })
    console.log(bill1);
    
    
    
    process.exit();
}

start().catch(console.error)

