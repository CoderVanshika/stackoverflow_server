import express from 'express'
import auth from '../middlewares/auth.mjs'
import { UserSubscription, getAllSubscribedUsers } from '../controllers/Payment.mjs'


const router = express.Router()


router.post('/Subscriptions', auth, UserSubscription )
router.get('/getSubscribers',getAllSubscribedUsers)

export default router