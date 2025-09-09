import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventBySlug,
  getFeaturedEvents,
  getUpcomingEvents,
  registerForEvent,
  unregisterFromEvent
} from '../controllers/eventController';
import { protect, admin } from '../middleware/auth';
import { validateEvent } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getEvents);
router.get('/featured', getFeaturedEvents);
router.get('/upcoming', getUpcomingEvents);
router.get('/slug/:slug', getEventBySlug);
router.get('/:id', getEventById);

// Protected routes
router.use(protect);
router.post('/:id/register', registerForEvent);
router.post('/:id/unregister', unregisterFromEvent);

// Admin routes
router.post('/', admin, validateEvent, createEvent);
router.put('/:id', admin, validateEvent, updateEvent);
router.delete('/:id', admin, deleteEvent);

export default router;
