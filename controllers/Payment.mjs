import Payments from '../models/Payment.mjs';
import mongoose from 'mongoose'

export const UserSubscription = async(req,res) => {
   const userSubscriptionData = req.body;
   const userPlan = new Payments(userSubscriptionData);
   try{
      await userPlan.save();
      res.status(200).json("Subscribed user data saved successfully")
   }
   catch(error){
     console.log(error)
     res.status(409).json("Couldn't save data")
   }
}


export const getAllSubscribedUsers = async (req, res) => {
   console.log("Hello")
    try {
       const SubscribedUsersList = await Payments.find();
       //console.log("Susbcribed users:", SubscribedUsersList)
       res.status(200).json(SubscribedUsersList);

    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message});
    }

}
