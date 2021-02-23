import express from 'express';
import { protect, isAdmin } from '../middlewares/authMiddleware.js';
import {
    authUser, registerUser,
    getUserProfile, updateUserProfile,
    getUsers, deleteUser,
    getUserById, updateUser
} from '../controllers/userController.js';

const router = express.Router();

//router.post('/', registerUser);
router.route('/')
    .post(registerUser)
    .get(protect, isAdmin, getUsers)

router.post('/login', authUser);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

router.route('/:id')
    .get(protect, isAdmin, getUserById)
    .put(protect, isAdmin, updateUser)
    .delete(protect, isAdmin, deleteUser);

export default router;