import express from 'express'

import { postComment, deleteComment } from "../controllers/Comments.mjs"
import auth from '../middlewares/auth.mjs'

const router = express.Router()

router.patch('/post/:id', auth, postComment)
router.patch('/delete/:id',auth, deleteComment)


export default router


