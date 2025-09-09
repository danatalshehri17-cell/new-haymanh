import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  toggleDislike,
  getPostBySlug,
  getFeaturedPosts
} from '../controllers/postController';
import { protect, moderator } from '../middleware/auth';
import { validatePost } from '../middleware/validation';

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/featured', getFeaturedPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', getPostById);

// Protected routes
router.use(protect);
router.post('/', validatePost, createPost);
router.put('/:id', validatePost, updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', toggleLike);
router.post('/:id/dislike', toggleDislike);

export default router;
