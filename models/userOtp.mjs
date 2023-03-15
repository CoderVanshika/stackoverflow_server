import mongoose from "mongoose";

const userOtpSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    otp : {type:String,required:true},
    createdAt:{type:Date},
    expiresAt:{type:Date}

})

const userotp = new mongoose.model("userotps",userOtpSchema)

export default userotp

