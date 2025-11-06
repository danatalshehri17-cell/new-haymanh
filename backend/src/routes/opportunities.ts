import express from 'express';
import {
  getOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getFeaturedOpportunities,
  getUrgentOpportunities,
  applyForOpportunity
} from '../controllers/opportunityController';
import { protect, admin } from '../middleware/auth';
import { validateOpportunity, validateApplication } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getOpportunities);
router.get('/featured', getFeaturedOpportunities);
router.get('/urgent', getUrgentOpportunities);
router.get('/:id', getOpportunity);

// Protected routes
router.use(protect);
router.post('/:id/apply', validateApplication, applyForOpportunity);

// Admin routes
router.post('/', admin, validateOpportunity, createOpportunity);
router.put('/:id', admin, validateOpportunity, updateOpportunity);
router.delete('/:id', admin, deleteOpportunity);

export default router;
