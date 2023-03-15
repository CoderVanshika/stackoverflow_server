import express from 'express';
import { login, signup} from '../controllers/auth.mjs';
import { getAllUsers, updateProfile } from '../controllers/users.mjs';
import { addFriend,acceptFriend, deleteFriend} from '../controllers/users.mjs';
import auth from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)


router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

router.patch('/addfriend/:id', auth, addFriend)
router.patch('/addfriend/accept/:id', acceptFriend)
router.patch('/addfriend/delete/:id', deleteFriend)

export default router 
