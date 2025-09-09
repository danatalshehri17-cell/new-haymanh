import express from 'express';
import { protect } from '../middleware/auth';
import {
  getDashboard,
  updateProgress,
  enrollInProgram,
  selectOpportunity,
  removeSelectedOpportunity,
  updatePreferences
} from '../controllers/dashboardController';

const router = express.Router();

// All routes are protected
router.use(protect);

// @route   GET /api/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/', getDashboard);

// @route   PUT /api/dashboard/progress
// @desc    Update user progress
// @access  Private
router.put('/progress', updateProgress);

// @route   POST /api/dashboard/enroll
// @desc    Enroll in program
// @access  Private
router.post('/enroll', enrollInProgram);

// @route   POST /api/dashboard/select-opportunity
// @desc    Select opportunity
// @access  Private
router.post('/select-opportunity', selectOpportunity);

// @route   DELETE /api/dashboard/selected-opportunities/:opportunityId
// @desc    Remove selected opportunity
// @access  Private
router.delete('/selected-opportunities/:opportunityId', removeSelectedOpportunity);

// @route   PUT /api/dashboard/preferences
// @desc    Update dashboard preferences
// @access  Private
router.put('/preferences', updatePreferences);

export default router;
