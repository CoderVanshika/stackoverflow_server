import mongoose from "mongoose"
import users from '../models/auth.mjs'
import userotp from "../models/userOtp.mjs";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find();
        //const allUsers = await users.find();
        //console.log(allUsers)

        const allUsersDetails = []
        allUsers.forEach(user => {
           allUsersDetails.push({ _id: user._id, name: user.name, about: user.about, tags: user.tags, joinedOn: user.joinedOn,friendRequests: user.friendRequests,
                friends: user.friends,
                sentRequests: user.sentRequests, })
        })
        //console.log("User friends:",user.friends)
        //console.log("User details:",allUserDetails)
        res.status(200).json(allUsersDetails);
    } catch (error) {
        res.status(404).json({ message : error.message})
    }
}


export const updateProfile = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('profile not updated..');
    }
    try {
       const updatedProfile = await users.findByIdAndUpdate( _id, { $set : { 'name': name, 'about': about, 'tags': tags}}, { new : true } )
       res.status(200).json(updatedProfile)
    } catch (error) {
       res.status(405).json({ message : error.message })
    }
}

export const addFriend = async (req, res) => {
    const { id: _id } = req.params;
    const { friendId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(200).send("User unavalible");
    }
  
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(200).send("User unavalible");
    }
  
    try {
      const user = await users.findById(_id);
      user.sentRequests.push(friendId);
  
      const friend = await users.findById(friendId);
      friend.friendRequests.push({ friendId: _id, friendName: user.name });
  
      await users.findByIdAndUpdate(_id, user);
      await users.findByIdAndUpdate(friendId, friend);
      res.status(200).json({ message: "Successfully added new friend..." });
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };
  
  export const acceptFriend = async (req, res) => {
    const { id: _id } = req.params;
    const { friendId, acceptance } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(200).send("User unavalible");
    }
  
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(200).send("User unavalible");
    }
  
    try {
      var user = await users.findById(_id);
      var userBy = await users.findById(friendId);
  
      const userFriends = user.friendRequests.filter((friend) => {
        friend.friendId !== friendId;
      });
  
      user = await users.findByIdAndUpdate(
        _id,
        {
          $set: { friendRequests: userFriends },
        },
        { new: true }
      );
  
      const sentBy = userBy.sentRequests.filter((friend) => {
        friend !== _id;
      });
  
      userBy = await users.findByIdAndUpdate(
        friendId,
        {
          $set: { sentRequests: sentBy },
        },
        { new: true }
      );
  
      if (acceptance) {
        user.friends.push({ friendId, friendName: userBy.name });
  
        userBy.friends.push({ friendId: _id, friendName: user.name });
  
        await users.findByIdAndUpdate(_id, user);
        await users.findByIdAndUpdate(friendId, userBy);
      }
  
      res.status(200).json({ message: "Successfully added new friend..." });
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };
  
  export const deleteFriend = async (req, res) => {
    const { id: _id } = req.params;
    const { friendId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(200).send("User unavalible");
    }
  
    if (!mongoose.Types.ObjectId.isValid(friendId)) {
      return res.status(200).send("User unavalible");
    }
    try {
      const user = await users.findById(_id);
      const userBy = await users.findById(friendId);
  
      const userFriends = user.friends.filter((friend) => {
        friend.friendId !== friendId;
      });
  
      const userByFriends = userBy.friends.filter((friend) => {
        friend.friendId != _id;
      });
  
      await users.findByIdAndUpdate(
        _id,
        {
          $set: { friends: userFriends },
        },
        { new: true }
      );
  
      await users.findByIdAndUpdate(
        friendId,
        {
          $set: { friends: userByFriends },
        },
        { new: true }
      );
  
      res.status(200).json({ message: "Successfully deleted friend..." });
    } catch (error) {
      res.status(405).json({ message: error.message });
    }
  };
  