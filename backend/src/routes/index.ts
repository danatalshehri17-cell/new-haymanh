import express from 'express';
import authRoutes from './auth';
import userRoutes from './users';
import postRoutes from './posts';
import commentRoutes from './comments';
import programRoutes from './programs';
import opportunityRoutes from './opportunities';
import eventRoutes from './events';
import reviewRoutes from './reviews';
import applicationRoutes from './applications';
import dashboardRoutes from './dashboard';
import adminRoutes from './adminRoutes';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/posts/:postId/comments', commentRoutes);
router.use('/programs', programRoutes);
router.use('/opportunities', opportunityRoutes);
router.use('/events', eventRoutes);
router.use('/reviews', reviewRoutes);
router.use('/applications', applicationRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/admin', adminRoutes);

export default router;
