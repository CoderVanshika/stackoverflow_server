import mongoose from 'mongoose'

const PaymentSchema = new mongoose.Schema({
    userId : {type: String},
    payId:{type:String},
    planName : { type : String},
    planAmount : { type : Number},
    paidOn : { type : Date, default: Date.now},
    planStatus:{type:String},
    noOfQuestions:{type: Number}
})
 
const Payments = new mongoose.model("Payments", PaymentSchema)
export default Payments
//expo

