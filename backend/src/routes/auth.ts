import express from 'express';
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout,
  verifyEmail
} from '../controllers/authController';
import { protect } from '../middleware/auth';
import { validateRegistration, validateLogin, validateProfileUpdate } from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

// Protected routes
router.use(protect);
router.get('/me', getMe);
router.put('/profile', validateProfileUpdate, updateProfile);
router.put('/change-password', changePassword);
router.post('/logout', logout);

export default router;
