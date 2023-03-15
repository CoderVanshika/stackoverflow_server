import express from 'express'
import { addPost , getAllPosts  } from '../controllers/Post.mjs'
import { likePost, deletePost } from '../controllers/Post.mjs'
import auth from '../middlewares/auth.mjs'



const router = express.Router()


router.post("/createPost", auth, addPost)
router.delete('/delete/:id',auth, deletePost)
router.get("/fetchAllPosts", getAllPosts);
router.patch('/like/:id',auth, likePost)


export default router