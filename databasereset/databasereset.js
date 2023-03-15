import * as cron from "node-cron";
import Payments from "../models/Payment.mjs";

export const databaseReset = async () => {
  const allUsers = await Payments.find();
  try {
    cron.schedule("0 0 * * *", () => {
      allUsers.forEach(async (users) => {
        const noOfQuestions = users.planName === "Silver" ? 5 : 1;
        if (users.planName !== "Gold") {
          const updatedProfile = await Payments.findByIdAndUpdate(
            users._id,
            {
              $set: {
                noOfQuestions: noOfQuestions,
              },
            },
            { new: true }
          );
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
