import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    friends: [
        {
          friendId: { type: String },
          friendName: { type: String },
        },
      ],
      friendRequests: [
        {
          friendId: { type: String },
          friendName: { type: String },
        },
      ],
      sentRequests: { type: [String] },
    about: {type: String },
    tags: {type: [String] },
    joinedOn: {type: Date, default: Date.now }
})

export default mongoose.model("User", userSchema)

