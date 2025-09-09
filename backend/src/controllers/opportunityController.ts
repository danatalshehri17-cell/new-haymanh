import { Request, Response } from 'express';
import Opportunity from '../models/Opportunity';
import Application from '../models/Application';

// @desc    Get all opportunities
// @route   GET /api/opportunities
// @access  Public
export const getOpportunities = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const type = req.query.type as string;
    const category = req.query.category as string;
    const status = req.query.status as string || 'active';
    const location = req.query.location as string;
    const search = req.query.search as string;
    const featured = req.query.featured === 'true';
    const urgent = req.query.urgent === 'true';
    const salaryRange = req.query.salaryRange as string;

    const query: any = { status };

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by location
    if (location) {
      query['location.type'] = location;
    }

    // Filter by featured
    if (featured) {
      query.isFeatured = true;
    }

    // Filter by urgent
    if (urgent) {
      query.isUrgent = true;
    }

    // Filter by salary range
    if (salaryRange) {
      const [min, max] = salaryRange.split('-').map(Number);
      if (min !== undefined && max !== undefined) {
        query['salary.min'] = { $gte: min };
        query['salary.max'] = { $lte: max };
      } else if (min !== undefined) {
        query['salary.min'] = { $gte: min };
      } else if (max !== undefined) {
        query['salary.max'] = { $lte: max };
      }
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [opportunities, total] = await Promise.all([
      Opportunity.find(query)
        .populate('company', 'name logo website')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Opportunity.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        opportunities,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      }
    });
  } catch (error: any) {
    console.error('Get opportunities error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص',
      error: error.message
    });
  }
};

// @desc    Get opportunity by ID
// @route   GET /api/opportunities/:id
// @access  Public
export const getOpportunityById = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('company', 'name logo website description');

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Increment view count
    opportunity.views += 1;
    await opportunity.save();

    return res.json({
      success: true,
      data: { opportunity }
    });
  } catch (error: any) {
    console.error('Get opportunity by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرصة',
      error: error.message
    });
  }
};

// @desc    Create new opportunity
// @route   POST /api/opportunities
// @access  Private/Admin
export const createOpportunity = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      shortDescription,
      type,
      category,
      company,
      location,
      requirements,
      benefits,
      salary,
      duration,
      applicationDeadline,
      startDate,
      endDate,
      maxApplicants,
      tags,
      language,
      seo,
      contactInfo,
      applicationProcess
    } = req.body;

    const opportunity = new Opportunity({
      title,
      description,
      shortDescription,
      type,
      category,
      company,
      location,
      requirements,
      benefits,
      salary,
      duration,
      applicationDeadline,
      startDate,
      endDate,
      maxApplicants,
      tags,
      language,
      seo,
      contactInfo,
      applicationProcess
    });

    await opportunity.save();

    const populatedOpportunity = await Opportunity.findById(opportunity._id)
      .populate('company', 'name logo website');

    return res.status(201).json({
      success: true,
      message: 'تم إنشاء الفرصة بنجاح',
      data: { opportunity: populatedOpportunity }
    });
  } catch (error: any) {
    console.error('Create opportunity error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء الفرصة',
      error: error.message
    });
  }
};

// @desc    Update opportunity
// @route   PUT /api/opportunities/:id
// @access  Private/Admin
export const updateOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    const updateData = req.body;

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('company', 'name logo website');

    return res.json({
      success: true,
      message: 'تم تحديث الفرصة بنجاح',
      data: { opportunity: updatedOpportunity }
    });
  } catch (error: any) {
    console.error('Update opportunity error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الفرصة',
      error: error.message
    });
  }
};

// @desc    Delete opportunity
// @route   DELETE /api/opportunities/:id
// @access  Private/Admin
export const deleteOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Delete associated applications
    await Application.deleteMany({ opportunity: req.params.id });

    // Delete opportunity
    await Opportunity.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'تم حذف الفرصة بنجاح'
    });
  } catch (error: any) {
    console.error('Delete opportunity error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف الفرصة',
      error: error.message
    });
  }
};

// @desc    Get opportunity by slug
// @route   GET /api/opportunities/slug/:slug
// @access  Public
export const getOpportunityBySlug = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findOne({ 'seo.slug': req.params.slug })
      .populate('company', 'name logo website description');

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Increment view count
    opportunity.views += 1;
    await opportunity.save();

    return res.json({
      success: true,
      data: { opportunity }
    });
  } catch (error: any) {
    console.error('Get opportunity by slug error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرصة',
      error: error.message
    });
  }
};

// @desc    Get featured opportunities
// @route   GET /api/opportunities/featured
// @access  Public
export const getFeaturedOpportunities = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const opportunities = await Opportunity.find({
      isFeatured: true,
      status: 'active'
    })
      .populate('company', 'name logo website')
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { opportunities }
    });
  } catch (error: any) {
    console.error('Get featured opportunities error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص المميزة',
      error: error.message
    });
  }
};

// @desc    Get urgent opportunities
// @route   GET /api/opportunities/urgent
// @access  Public
export const getUrgentOpportunities = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const opportunities = await Opportunity.find({
      isUrgent: true,
      status: 'active'
    })
      .populate('company', 'name logo website')
      .sort({ applicationDeadline: 1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { opportunities }
    });
  } catch (error: any) {
    console.error('Get urgent opportunities error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الفرص العاجلة',
      error: error.message
    });
  }
};

// @desc    Apply for opportunity
// @route   POST /api/opportunities/:id/apply
// @access  Private
export const applyForOpportunity = async (req: Request, res: Response) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
    }

    // Check if opportunity is available
    if (!opportunity.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'الفرصة غير متاحة للتقديم'
      });
    }

    // Check if user has already applied
    const existingApplication = await Application.findOne({
      applicant: req.user.id,
      opportunity: req.params.id
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'لقد تقدمت بالفعل لهذه الفرصة'
      });
    }

    // Check if opportunity is full
    if (opportunity.isFull) {
      return res.status(400).json({
        success: false,
        message: 'الفرصة ممتلئة'
      });
    }

    const {
      coverLetter,
      resume,
      additionalDocuments,
      experience,
      education,
      skills,
      languages,
      references,
      availability,
      salary,
      questions,
      notes
    } = req.body;

    const application = new Application({
      applicant: req.user.id,
      opportunity: req.params.id,
      coverLetter,
      resume,
      additionalDocuments,
      experience,
      education,
      skills,
      languages,
      references,
      availability,
      salary,
      questions,
      notes
    });

    await application.save();

    // Increment current applicants count
    opportunity.currentApplicants += 1;
    opportunity.applications.push(application._id as any);
    await opportunity.save();

    return res.status(201).json({
      success: true,
      message: 'تم تقديم طلبك بنجاح'
    });
  } catch (error: any) {
    console.error('Apply for opportunity error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تقديم الطلب',
      error: error.message
    });
  }
};
