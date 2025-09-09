import { Request, Response } from 'express';
import Application from '../models/Application';
import Opportunity from '../models/Opportunity';

// @desc    Get user applications
// @route   GET /api/applications
// @access  Private
export const getUserApplications = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const query: any = { applicant: req.user.id };

    // Filter by status
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      Application.find(query)
        .populate('opportunity', 'title company location type category')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        applications,
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
    console.error('Get user applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الطلبات',
      error: error.message
    });
  }
};

// @desc    Get application by ID
// @route   GET /api/applications/:id
// @access  Private
export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('opportunity', 'title company location type category description')
      .populate('applicant', 'firstName lastName email phone')
      .populate('reviewedBy', 'firstName lastName');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    // Check if user is applicant or admin
    if (application.applicant.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بعرض هذا الطلب'
      });
    }

    return res.json({
      success: true,
      data: { application }
    });
  } catch (error: any) {
    console.error('Get application by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الطلب',
      error: error.message
    });
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
export const updateApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    // Check if user is applicant
    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا الطلب'
      });
    }

    // Check if application can be edited (only if status is pending)
    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'لا يمكن تعديل هذا الطلب'
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

    const updateData: any = {};
    if (coverLetter) updateData.coverLetter = coverLetter;
    if (resume) updateData.resume = resume;
    if (additionalDocuments) updateData.additionalDocuments = additionalDocuments;
    if (experience) updateData.experience = experience;
    if (education) updateData.education = education;
    if (skills) updateData.skills = skills;
    if (languages) updateData.languages = languages;
    if (references) updateData.references = references;
    if (availability) updateData.availability = availability;
    if (salary) updateData.salary = salary;
    if (questions) updateData.questions = questions;
    if (notes) updateData.notes = notes;

    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('opportunity', 'title company location type category');

    return res.json({
      success: true,
      message: 'تم تحديث الطلب بنجاح',
      data: { application: updatedApplication }
    });
  } catch (error: any) {
    console.error('Update application error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الطلب',
      error: error.message
    });
  }
};

// @desc    Withdraw application
// @route   POST /api/applications/:id/withdraw
// @access  Private
export const withdrawApplication = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    // Check if user is applicant
    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بسحب هذا الطلب'
      });
    }

    // Check if application can be withdrawn (only if status is pending)
    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'لا يمكن سحب هذا الطلب'
      });
    }

    application.isWithdrawn = true;
    application.withdrawnAt = new Date();
    application.status = 'withdrawn';
    await application.save();

    // Decrement opportunity applicants count
    await Opportunity.findByIdAndUpdate(application.opportunity, {
      $inc: { currentApplicants: -1 }
    });

    return res.json({
      success: true,
      message: 'تم سحب الطلب بنجاح'
    });
  } catch (error: any) {
    console.error('Withdraw application error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في سحب الطلب',
      error: error.message
    });
  }
};

// @desc    Get all applications (admin only)
// @route   GET /api/admin/applications
// @access  Private/Admin
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const opportunity = req.query.opportunity as string;
    const search = req.query.search as string;

    const query: any = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by opportunity
    if (opportunity) {
      query.opportunity = opportunity;
    }

    // Text search in cover letter
    if (search) {
      query.coverLetter = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      Application.find(query)
        .populate('applicant', 'firstName lastName email phone')
        .populate('opportunity', 'title company location type category')
        .populate('reviewedBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Application.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        applications,
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
    console.error('Get all applications error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب الطلبات',
      error: error.message
    });
  }
};

// @desc    Review application (admin only)
// @route   PUT /api/admin/applications/:id/review
// @access  Private/Admin
export const reviewApplication = async (req: Request, res: Response) => {
  try {
    const { status, reviewNotes } = req.body;

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'الطلب غير موجود'
      });
    }

    application.status = status;
    application.reviewedBy = req.user.id;
    application.reviewedAt = new Date();
    if (reviewNotes) {
      application.reviewNotes = reviewNotes;
    }

    await application.save();

    const updatedApplication = await Application.findById(req.params.id)
      .populate('applicant', 'firstName lastName email phone')
      .populate('opportunity', 'title company location type category')
      .populate('reviewedBy', 'firstName lastName');

    return res.json({
      success: true,
      message: 'تم مراجعة الطلب بنجاح',
      data: { application: updatedApplication }
    });
  } catch (error: any) {
    console.error('Review application error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في مراجعة الطلب',
      error: error.message
    });
  }
};

// @desc    Get application statistics (admin only)
// @route   GET /api/admin/applications/stats
// @access  Private/Admin
export const getApplicationStats = async (req: Request, res: Response) => {
  try {
    const [
      totalApplications,
      pendingApplications,
      reviewingApplications,
      shortlistedApplications,
      acceptedApplications,
      rejectedApplications,
      withdrawnApplications,
      applicationsThisMonth,
      applicationsByStatus,
      applicationsByOpportunity
    ] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'reviewing' }),
      Application.countDocuments({ status: 'shortlisted' }),
      Application.countDocuments({ status: 'accepted' }),
      Application.countDocuments({ status: 'rejected' }),
      Application.countDocuments({ status: 'withdrawn' }),
      Application.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }),
      Application.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Application.aggregate([
        { $group: { _id: '$opportunity', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    return res.json({
      success: true,
      data: {
        totalApplications,
        pendingApplications,
        reviewingApplications,
        shortlistedApplications,
        acceptedApplications,
        rejectedApplications,
        withdrawnApplications,
        applicationsThisMonth,
        applicationsByStatus,
        applicationsByOpportunity
      }
    });
  } catch (error: any) {
    console.error('Get application stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب إحصائيات الطلبات',
      error: error.message
    });
  }
};
