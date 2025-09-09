import express from 'express';
import {
  getUserApplications,
  getApplicationById,
  updateApplication,
  withdrawApplication,
  getAllApplications,
  reviewApplication,
  getApplicationStats
} from '../controllers/applicationController';
import { protect, admin } from '../middleware/auth';
import { validateApplication } from '../middleware/validation';

const router = express.Router();

// All routes require authentication
router.use(protect);

// User routes
router.get('/', getUserApplications);
router.get('/:id', getApplicationById);
router.put('/:id', validateApplication, updateApplication);
router.post('/:id/withdraw', withdrawApplication);

// Admin routes
router.get('/admin/all', admin, getAllApplications);
router.put('/admin/:id/review', admin, reviewApplication);
router.get('/admin/stats', admin, getApplicationStats);

export default router;
