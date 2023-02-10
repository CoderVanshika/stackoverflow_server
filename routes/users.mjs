import express from 'express';
import { login, signup } from '../controllers/auth.mjs';
import { getAllUsers, updateProfile } from '../controllers/Users.mjs';
import auth from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

export default router 
