import express from 'express';
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  getOpportunityBySlug,
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
router.get('/slug/:slug', getOpportunityBySlug);
router.get('/:id', getOpportunityById);

// Protected routes
router.use(protect);
router.post('/:id/apply', validateApplication, applyForOpportunity);

// Admin routes
router.post('/', admin, validateOpportunity, createOpportunity);
router.put('/:id', admin, validateOpportunity, updateOpportunity);
router.delete('/:id', admin, deleteOpportunity);

export default router;
