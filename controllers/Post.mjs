
import mongoose from 'mongoose'
import Post from '../models/Post.mjs';



export const addPost = async (req, res) => {
    const createNewPost = new Post({ ...req.body, userId: req.userId ,userPosted: req.body.userPosted});
    try {
      const savedPost = await createNewPost.save();
      console.log("Saved Post video:",savedPost)
      res.status(201).json({ success: true, savedPost, message:"Post saved in database successfully" });
    } catch (error) {
      console.log("Error:",error)
      res.status(500).json({error,message:"Couldn't save post in database"});
    }
  };
   
    
  export const getAllPosts = async (req, res) => {
    try {
      const postList = await Post.find();
      console.log("Post List",postList)
      res.status(200).json(postList);
    } catch (error) {
      res.status(404).json({message:"Can't fetch post in server"});
    }
  };

  export const deletePost = async (req, res) => {
    try {
      const isPost = await Post.findById(req.params.id);
      if (!isPost) res.status(500).json("Post not found!");
  
      if (req.userId === isPost.userId) {
        isPost.delete(req.params.id);
        res.status(200).json({ success: true, message: "Post deleted." });
      } else {
        res.json("You can't delete other's post.");
      }
    } catch (error) {
      res.status(500).json("something wrong...");
    }
  };
  
  
  export const likePost = async (req, res) => {
    const { id: _id } = req.params;
  
    const { userId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(200).send("Post unavalible");
    }
    try {
      const post = await Post.findById(_id);
      const index = post.likedBy.findIndex((id) => id === String(userId));
  
      if (index === -1) {
        post.likedBy.push(userId);
      } else {
        post.likedBy = post.likedBy.filter((id) => id !== String(userId));
      }
  
      await Post.findByIdAndUpdate(_id, post);
  
      res.status(200).json({ message: "Successfully liked/disliked..." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  

  

  