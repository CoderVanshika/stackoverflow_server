import express from 'express'

import { postAnswer, deleteAnswer } from "../controllers/Answers.mjs"
import auth from '../middlewares/auth.mjs'

const router = express.Router()

router.patch('/post/:id', auth, postAnswer)
router.patch('/delete/:id', auth, deleteAnswer)

export default router