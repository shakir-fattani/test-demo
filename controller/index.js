const { Router } = require('express')
const billProcessor = require('./../service/index')

const router = new Router();

router.post('/bills/pay', (req, res) => {
    const { userId, billIds = [] } = req.body; 
    
    const transactionId = billProcessor.addJob(billIds, userId);
    res.json({
        message: "Job Added",
        transactionId,
    })
})

module.exports = router;