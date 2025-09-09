import express from 'express';
import {
  getPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
  getProgramBySlug,
  getFeaturedPrograms,
  getProgramsByInstructor,
  enrollInProgram,
  unenrollFromProgram
} from '../controllers/programController';
import { protect, admin } from '../middleware/auth';
import { validateProgram } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getPrograms);
router.get('/featured', getFeaturedPrograms);
router.get('/slug/:slug', getProgramBySlug);
router.get('/instructor/:instructorId', getProgramsByInstructor);
router.get('/:id', getProgramById);

// Protected routes
router.use(protect);
router.post('/:id/enroll', enrollInProgram);
router.post('/:id/unenroll', unenrollFromProgram);

// Admin/Instructor routes
router.post('/', admin, validateProgram, createProgram);
router.put('/:id', admin, validateProgram, updateProgram);
router.delete('/:id', admin, deleteProgram);

export default router;
