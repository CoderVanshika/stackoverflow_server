
import users from '../models/auth.mjs'
import userotp from '../models/userOtp.mjs';
import nodemailer from 'nodemailer';

//email config
const transporter = nodemailer.createTransport({
  service:"gmail",
  auth : {
     user:process.env.EMAIL,
     pass:process.env.PASSWORD
  }
})

export const userOtpSend = async (req,res) => {
   const { email } = req.body
   if(!email)
   {
     res.status(400).json({error:"Please enter your email"})
   }
     
    try {
        const preUser = await users.findOne({ email: email });
        console.log(preUser)
        if(preUser)
        {
          const OTP = Math.floor(100000+Math.random()*900000);
          console.log(OTP)
          const existEmail = await userotp.findOne({ email : email});
          if(existEmail){
            const updateData = await userotp.findByIdAndUpdate({_id:existEmail._id},{
              otp:OTP},
              {new:true})

            await updateData.save();

            const mailOptions = {
               from : process.env.EMAIL,
               to : email,
               subject :"Sending Email for OTP Validation",
               text : `OTP:-${OTP}`
            }
             transporter.sendMail(mailOptions,(error,info)=>{
               if(error){
                console.log(error)
                res.status(400).json({error:"email not sent"})
               }
               else {
                 console.log("Email sent",info.response);
                 res.status(200).json({message:"Email sent successfully"})
               }
             })
            }
          else {
            const saveOtpData = new userotp({
              email, otp:OTP
            });
            await saveOtpData.save();
            const mailOptions = {
              from : process.env.EMAIL,
              to : email,
              subject :"Sending Email for OTP Validation",
              text : ` Your OTP for registration is as follows 
                       OTP:-${OTP}`
           }
            transporter.sendMail(mailOptions,(error,info)=>{
              if(error){
               console.log(error)
               res.status(400).json({error:"email not sent"})
              }
              else {
                console.log("Email sent",info.response);
                res.status(200).json({message:"Email sent successfully"})
              }
          })
        }
      }
          else{
            res.status(400).json({error:"This user not exists/registered"})
          }
        }
       
      
      catch (error){
         res.status(400).json({error:"Invalid details",error})
      }
    }



    /*import users from '../models/auth.mjs'
import mongoose from 'mongoose';

export const checkEmail = async (req,res) => {
     
    try {
       
        const userEmail = await users.findOne({ email: req.body.email });
        console.log(userEmail)
        if(userEmail)
        {
          //console.log(userEmail)
          return res.status(200).json({status:true,data:userEmail, message:"User email found successfully"})
        }
        else
        {
           return res.status(200).json({status:false, data:[],message:"Email not found"})
        }
        
        //console.log(data)
      
    } catch (error) {
        console.log(error)
        res.status(500).json({status:false, data:[], message:"Server error. Something went wrong"})   
    }
    
}*/


/*router.post('/check_user_mobileno',function(req, res, next) {
    pool.query("select * from userdetails where mobileno=?",[req.body.mobileno], function(error,result){
      if(error)
      {
          res.status(500).json({status:false, message:'Server error'})
      }
      else
      {
          if(result.length==1)
          {
            res.status(200).json({status:true,data:result[0] })
          }
          else
          {
            res.status(200).json({status:false, data:[]})
          }
          
      }
    })
  });*/
  
  
/*export const emailSend = async (req,res) => {
    let data = await users.findOne({email:req.body.email});
    console.log(data)
    const response = {};
    if(data){
        let otpcode = Math.floor((Math.random()*10000)+1)
        let otpData = new Otp({
            email:req.body.email,
            code:otpcode,
            expireIn: new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        responseType.statusText = 'Success'
        responseType.message = 'OTP sent to your emailid. Pls check your email id.'
    }
    else {
        responseType.statusText = 'Error'
        responseType.message = 'Email Id not exist'
    }
    res.status(200).json(responseType);
}*/