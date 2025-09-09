import express from 'express';
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
  toggleCommentDislike,
  getCommentReplies
} from '../controllers/commentController';
import { protect } from '../middleware/auth';
import { validateComment } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/:id/replies', getCommentReplies);

// Protected routes
router.use(protect);
router.post('/:id/like', toggleCommentLike);
router.post('/:id/dislike', toggleCommentDislike);
router.put('/:id', validateComment, updateComment);
router.delete('/:id', deleteComment);

export default router;
