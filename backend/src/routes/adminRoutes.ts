import express from 'express';
import { 
  getContentList, 
  getContentById, 
  createContent, 
  updateContent, 
  deleteContent,
  publishContent,
  unpublishContent,
  getPageContent,
  updatePageSection,
  addPageSection,
  removePageSection,
  reorderSections
} from '../controllers/adminController';
import { protect, admin, moderator } from '../middleware/auth';

const router = express.Router();

// Apply authentication to all admin routes
router.use(protect);
router.use(admin);

// Content Management Routes
router.get('/content', getContentList);
router.get('/content/:id', getContentById);
router.post('/content', createContent);
router.put('/content/:id', updateContent);
router.delete('/content/:id', deleteContent);

// Publishing Routes
router.post('/content/:id/publish', publishContent);
router.post('/content/:id/unpublish', unpublishContent);

// Page Content Routes
router.get('/pages/:pageId', getPageContent);
router.put('/pages/:pageId/sections/:sectionId', updatePageSection);
router.post('/pages/:pageId/sections', addPageSection);
router.delete('/pages/:pageId/sections/:sectionId', removePageSection);
router.put('/pages/:pageId/sections/reorder', reorderSections);

export default router;
