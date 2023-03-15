
import express from 'express'
import { AskQuestion, getAllQuestions, deleteQuestion, voteQuestion } from '../controllers/Questions.mjs'
import auth from '../middlewares/auth.mjs'
import { UserSubscription } from '../controllers/Payment.mjs'


const router = express.Router()

router.post('/Ask', auth, AskQuestion)
router.get('/get',getAllQuestions)
router.delete('/delete/:id', auth, deleteQuestion)
router.patch('/vote/:id', auth, voteQuestion)

//router.post('/Subcriptions', auth, UserSubscription )

export default router