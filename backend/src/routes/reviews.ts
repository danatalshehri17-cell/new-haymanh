import express from 'express';
import {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleHelpful,
  getReviewStats
} from '../controllers/reviewController';
import { protect } from '../middleware/auth';
import { validateReview } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/:programId/stats', getReviewStats);

// Protected routes
router.use(protect);
router.get('/:programId', getReviews);
router.post('/:programId', validateReview, createReview);
router.put('/:id', validateReview, updateReview);
router.delete('/:id', deleteReview);
router.post('/:id/helpful', toggleHelpful);

export default router;
