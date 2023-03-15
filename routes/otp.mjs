
import express from 'express';

import { userOtpSend } from '../controllers/otp.mjs';


const router = express.Router()

router.post('/userOtp',userOtpSend)

export default router