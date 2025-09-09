import express from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  uploadAvatar,
  searchUsers
} from '../controllers/userController';
import { protect, admin } from '../middleware/auth';
import { validateProfileUpdate } from '../middleware/validation';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Admin only routes
router.get('/', admin, getUsers);
router.get('/stats', admin, getUserStats);
router.put('/:id', admin, validateProfileUpdate, updateUser);
router.delete('/:id', admin, deleteUser);

// User routes
router.get('/search', searchUsers);
router.get('/:id', getUserById);
router.post('/avatar', uploadAvatar);

export default router;
