import { Request, Response } from 'express';
import Content from '../models/Content';
import { validationResult } from 'express-validator';

// @desc    Get all content pages
// @route   GET /api/admin/content
// @access  Private (Admin/Moderator)
export const getContentList = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, pageType, language, isPublished } = req.query;
    
    const filter: any = {};
    if (pageType) filter.pageType = pageType;
    if (language) filter.language = language;
    if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

    const content = await Content.find(filter)
      .populate('modifiedBy', 'firstName lastName email')
      .sort({ lastModified: -1 })
      .limit(Number(limit) * 1)
      .skip((Number(page) - 1) * Number(limit));

    const total = await Content.countDocuments(filter);

    res.json({
      success: true,
      data: {
        content,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          totalPages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error: any) {
    console.error('Get content list error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب قائمة المحتوى',
      error: error.message
    });
  }
};

// @desc    Get content by ID
// @route   GET /api/admin/content/:id
// @access  Private (Admin/Moderator)
export const getContentById = async (req: Request, res: Response) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('modifiedBy', 'firstName lastName email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error: any) {
    console.error('Get content by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب المحتوى',
      error: error.message
    });
  }
};

// @desc    Create new content
// @route   POST /api/admin/content
// @access  Private (Admin/Moderator)
export const createContent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const contentData = {
      ...req.body,
      modifiedBy: req.user.id,
      lastModified: new Date()
    };

    const content = new Content(contentData);
    await content.save();

    res.status(201).json({
      success: true,
      message: 'تم إنشاء المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Create content error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء المحتوى',
      error: error.message
    });
  }
};

// @desc    Update content
// @route   PUT /api/admin/content/:id
// @access  Private (Admin/Moderator)
export const updateContent = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'بيانات غير صحيحة',
        errors: errors.array()
      });
    }

    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    const updateData = {
      ...req.body,
      modifiedBy: req.user.id,
      lastModified: new Date(),
      version: content.version + 1
    };

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'تم تحديث المحتوى بنجاح',
      data: updatedContent
    });
  } catch (error: any) {
    console.error('Update content error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث المحتوى',
      error: error.message
    });
  }
};

// @desc    Delete content
// @route   DELETE /api/admin/content/:id
// @access  Private (Admin)
export const deleteContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'تم حذف المحتوى بنجاح'
    });
  } catch (error: any) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في حذف المحتوى',
      error: error.message
    });
  }
};

// @desc    Publish content
// @route   POST /api/admin/content/:id/publish
// @access  Private (Admin/Moderator)
export const publishContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      {
        isPublished: true,
        publishedAt: new Date(),
        modifiedBy: req.user.id,
        lastModified: new Date()
      },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم نشر المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Publish content error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في نشر المحتوى',
      error: error.message
    });
  }
};

// @desc    Unpublish content
// @route   POST /api/admin/content/:id/unpublish
// @access  Private (Admin/Moderator)
export const unpublishContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      {
        isPublished: false,
        modifiedBy: req.user.id,
        lastModified: new Date()
      },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'المحتوى غير موجود'
      });
    }

    res.json({
      success: true,
      message: 'تم إلغاء نشر المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Unpublish content error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إلغاء نشر المحتوى',
      error: error.message
    });
  }
};

// @desc    Get page content
// @route   GET /api/admin/pages/:pageId
// @access  Private (Admin/Moderator)
export const getPageContent = async (req: Request, res: Response) => {
  try {
    const { language = 'ar' } = req.query;
    
    const content = await Content.findOne({
      pageId: req.params.pageId,
      language
    }).populate('modifiedBy', 'firstName lastName email');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'صفحة المحتوى غير موجودة'
      });
    }

    res.json({
      success: true,
      data: content
    });
  } catch (error: any) {
    console.error('Get page content error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب محتوى الصفحة',
      error: error.message
    });
  }
};

// @desc    Update page section
// @route   PUT /api/admin/pages/:pageId/sections/:sectionId
// @access  Private (Admin/Moderator)
export const updatePageSection = async (req: Request, res: Response) => {
  try {
    const { pageId, sectionId } = req.params;
    const { language = 'ar' } = req.query;

    const content = await Content.findOne({
      pageId,
      language
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'صفحة المحتوى غير موجودة'
      });
    }

    const sectionIndex = content.sections.findIndex(
      section => section.sectionId === sectionId
    );

    if (sectionIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'قسم المحتوى غير موجود'
      });
    }

    content.sections[sectionIndex] = {
      ...content.sections[sectionIndex],
      ...req.body
    };

    content.lastModified = new Date();
    content.modifiedBy = req.user.id;
    content.version += 1;

    await content.save();

    res.json({
      success: true,
      message: 'تم تحديث قسم المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Update page section error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث قسم المحتوى',
      error: error.message
    });
  }
};

// @desc    Add page section
// @route   POST /api/admin/pages/:pageId/sections
// @access  Private (Admin/Moderator)
export const addPageSection = async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { language = 'ar' } = req.query;

    const content = await Content.findOne({
      pageId,
      language
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'صفحة المحتوى غير موجودة'
      });
    }

    const newSection = {
      ...req.body,
      sectionId: `section_${Date.now()}`,
      order: content.sections.length
    };

    content.sections.push(newSection);
    content.lastModified = new Date();
    content.modifiedBy = req.user.id;
    content.version += 1;

    await content.save();

    res.json({
      success: true,
      message: 'تم إضافة قسم المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Add page section error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إضافة قسم المحتوى',
      error: error.message
    });
  }
};

// @desc    Remove page section
// @route   DELETE /api/admin/pages/:pageId/sections/:sectionId
// @access  Private (Admin/Moderator)
export const removePageSection = async (req: Request, res: Response) => {
  try {
    const { pageId, sectionId } = req.params;
    const { language = 'ar' } = req.query;

    const content = await Content.findOne({
      pageId,
      language
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'صفحة المحتوى غير موجودة'
      });
    }

    content.sections = content.sections.filter(
      section => section.sectionId !== sectionId
    );

    content.lastModified = new Date();
    content.modifiedBy = req.user.id;
    content.version += 1;

    await content.save();

    res.json({
      success: true,
      message: 'تم حذف قسم المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Remove page section error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في حذف قسم المحتوى',
      error: error.message
    });
  }
};

// @desc    Reorder sections
// @route   PUT /api/admin/pages/:pageId/sections/reorder
// @access  Private (Admin/Moderator)
export const reorderSections = async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const { language = 'ar' } = req.query;
    const { sectionIds } = req.body;

    const content = await Content.findOne({
      pageId,
      language
    });

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'صفحة المحتوى غير موجودة'
      });
    }

    // Reorder sections based on provided order
    const reorderedSections = sectionIds.map((sectionId: string, index: number) => {
      const section = content.sections.find(s => s.sectionId === sectionId);
      if (section) {
        section.order = index;
        return section;
      }
      return null;
    }).filter(Boolean);

    content.sections = reorderedSections;
    content.lastModified = new Date();
    content.modifiedBy = req.user.id;
    content.version += 1;

    await content.save();

    res.json({
      success: true,
      message: 'تم إعادة ترتيب أقسام المحتوى بنجاح',
      data: content
    });
  } catch (error: any) {
    console.error('Reorder sections error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إعادة ترتيب أقسام المحتوى',
      error: error.message
    });
  }
};
