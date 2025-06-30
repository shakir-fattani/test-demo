const mongoose = require('mongoose');
const { Bill, User } = require('./../models')
const { getDBConnection } = require('./../helper/db-connection')

const pastJobs = []; // { billIds: [], userId, transaction, status }
const activeJobs = []; // { billIds: [], userId, transaction, status }

const sleep = (seconds) => new Promise((res, rej) => setTimeout(res, seconds * 1000));

class BillProcessor {
    
    addJob(billIds, userId) {
        const transactionId = Date.now(); // uuid
        activeJobs.push({
            billIds,
            userId,
            transactionId,
            status: "pending"
        })
        return transactionId;
    }

    async startProcessing() {
        while (true) {
            try {
                if (activeJobs.length < 1) {
                    await sleep(2)
                    continue;
                }

                const [ job ] = activeJobs.splice(0, 1);
                await this.processJob(job)
                pastJobs.push(job);
            } catch(e) {
                console.error(e)
            }
        }
    }
    
    async processJob(job) {
        const conn = getDBConnection();
        const session = await conn.startSession();
        try {
            const { userId } = job;
            console.log({
                msg: "processing job", job
            })
            session.startTransaction();

            const billIds = job.billIds;
            // update bills status
            const user = await User.findOne({_id: userId}, null, { session });
            console.log("----found user is Done")
            await Bill.updateMany({
                _id: { $in: billIds }, status: 'pending',
            }, { $set: { status:'processing' } }, { session })
            console.log("----Bill status change is Done")
            const bills = await Bill.find({
                _id: { $in: billIds }, status: 'processing'
            }, null, { session })

            const billAmount = bills.reduce((preValu, currValu) => preValu + currValu.amount, 0);
            if (user.walletAmount < billAmount) {
                throw "user wallet amount is less";
            }
            console.log("----Bill Amount check is Done")
            user.walletAmount -= billAmount;
            user.transactionTimestamp = Date.now();
            user.save({ session })
            console.log("----updated user is Saved")
            await Bill.updateMany({
                _id: { $in: billIds }, status: 'processing'
            }, { $set: { status: 'paid', isPaid: true, lastPaidDate: Date.now() } }, { session })
            console.log("----Bill are Marked as Paid")

            await session.commitTransaction()
        } catch (e) {
            console.error(e)
            await session.abortTransaction();
        }
    }
}

const billProcessor = new BillProcessor();
billProcessor.startProcessing().catch(console.error)
module.exports = billProcessor;