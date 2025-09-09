import { Request, Response } from 'express';
import Program from '../models/Program';
import Review from '../models/Review';

// @desc    Get all programs
// @route   GET /api/programs
// @access  Public
export const getPrograms = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const level = req.query.level as string;
    const status = req.query.status as string || 'active';
    const language = req.query.language as string;
    const search = req.query.search as string;
    const featured = req.query.featured === 'true';
    const priceRange = req.query.priceRange as string;

    const query: any = { status };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by level
    if (level) {
      query.level = level;
    }

    // Filter by language
    if (language) {
      query.language = language;
    }

    // Filter by featured
    if (featured) {
      query.isFeatured = true;
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (min !== undefined && max !== undefined) {
        query['price.amount'] = { $gte: min, $lte: max };
      } else if (min !== undefined) {
        query['price.amount'] = { $gte: min };
      } else if (max !== undefined) {
        query['price.amount'] = { $lte: max };
      }
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [programs, total] = await Promise.all([
      Program.find(query)
        .populate('instructor', 'firstName lastName avatar bio')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Program.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        programs,
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
    console.error('Get programs error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب البرامج',
      error: error.message
    });
  }
};

// @desc    Get program by ID
// @route   GET /api/programs/:id
// @access  Public
export const getProgramById = async (req: Request, res: Response) => {
  try {
    const program = await Program.findById(req.params.id)
      .populate('instructor', 'firstName lastName avatar bio')
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
          select: 'firstName lastName avatar'
        }
      });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    return res.json({
      success: true,
      data: { program }
    });
  } catch (error: any) {
    console.error('Get program by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب البرنامج',
      error: error.message
    });
  }
};

// @desc    Create new program
// @route   POST /api/programs
// @access  Private/Admin
export const createProgram = async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      shortDescription,
      category,
      level,
      duration,
      price,
      maxParticipants,
      startDate,
      endDate,
      registrationDeadline,
      schedule,
      location,
      curriculum,
      requirements,
      outcomes,
      materials,
      images,
      featuredImage,
      tags,
      language,
      seo
    } = req.body;

    const program = new Program({
      title,
      description,
      shortDescription,
      category,
      level,
      duration,
      price,
      instructor: req.user.id,
      maxParticipants,
      startDate,
      endDate,
      registrationDeadline,
      schedule,
      location,
      curriculum,
      requirements,
      outcomes,
      materials,
      images,
      featuredImage,
      tags,
      language,
      seo
    });

    await program.save();

    const populatedProgram = await Program.findById(program._id)
      .populate('instructor', 'firstName lastName avatar');

    return res.status(201).json({
      success: true,
      message: 'تم إنشاء البرنامج بنجاح',
      data: { program: populatedProgram }
    });
  } catch (error: any) {
    console.error('Create program error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء البرنامج',
      error: error.message
    });
  }
};

// @desc    Update program
// @route   PUT /api/programs/:id
// @access  Private/Admin
export const updateProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    // Check if user is instructor or admin
    if (program.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا البرنامج'
      });
    }

    const updateData = req.body;

    const updatedProgram = await Program.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('instructor', 'firstName lastName avatar');

    return res.json({
      success: true,
      message: 'تم تحديث البرنامج بنجاح',
      data: { program: updatedProgram }
    });
  } catch (error: any) {
    console.error('Update program error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث البرنامج',
      error: error.message
    });
  }
};

// @desc    Delete program
// @route   DELETE /api/programs/:id
// @access  Private/Admin
export const deleteProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    // Check if user is instructor or admin
    if (program.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا البرنامج'
      });
    }

    // Delete associated reviews
    await Review.deleteMany({ program: req.params.id });

    // Delete program
    await Program.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'تم حذف البرنامج بنجاح'
    });
  } catch (error: any) {
    console.error('Delete program error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف البرنامج',
      error: error.message
    });
  }
};

// @desc    Get program by slug
// @route   GET /api/programs/slug/:slug
// @access  Public
export const getProgramBySlug = async (req: Request, res: Response) => {
  try {
    const program = await Program.findOne({ 'seo.slug': req.params.slug })
      .populate('instructor', 'firstName lastName avatar bio')
      .populate({
        path: 'reviews',
        populate: {
          path: 'author',
          select: 'firstName lastName avatar'
        }
      });

    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    return res.json({
      success: true,
      data: { program }
    });
  } catch (error: any) {
    console.error('Get program by slug error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب البرنامج',
      error: error.message
    });
  }
};

// @desc    Get featured programs
// @route   GET /api/programs/featured
// @access  Public
export const getFeaturedPrograms = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const programs = await Program.find({
      isFeatured: true,
      status: 'active'
    })
      .populate('instructor', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { programs }
    });
  } catch (error: any) {
    console.error('Get featured programs error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب البرامج المميزة',
      error: error.message
    });
  }
};

// @desc    Get programs by instructor
// @route   GET /api/programs/instructor/:instructorId
// @access  Public
export const getProgramsByInstructor = async (req: Request, res: Response) => {
  try {
    const { instructorId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const [programs, total] = await Promise.all([
      Program.find({ instructor: instructorId, status: 'active' })
        .populate('instructor', 'firstName lastName avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Program.countDocuments({ instructor: instructorId, status: 'active' })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        programs,
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
    console.error('Get programs by instructor error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب برامج المدرب',
      error: error.message
    });
  }
};

// @desc    Enroll in program
// @route   POST /api/programs/:id/enroll
// @access  Private
export const enrollInProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    // Check if program is available
    if (!program.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'البرنامج غير متاح للتسجيل'
      });
    }

    // Check if user is already enrolled
    if (program.currentParticipants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'أنت مسجل بالفعل في هذا البرنامج'
      });
    }

    // Check if program is full
    if (program.isFull) {
      return res.status(400).json({
        success: false,
        message: 'البرنامج ممتلئ'
      });
    }

    // Enroll user
    program.currentParticipants.push(req.user.id);
    await program.save();

    return res.json({
      success: true,
      message: 'تم التسجيل في البرنامج بنجاح'
    });
  } catch (error: any) {
    console.error('Enroll in program error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في التسجيل في البرنامج',
      error: error.message
    });
  }
};

// @desc    Unenroll from program
// @route   POST /api/programs/:id/unenroll
// @access  Private
export const unenrollFromProgram = async (req: Request, res: Response) => {
  try {
    const program = await Program.findById(req.params.id);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    // Check if user is enrolled
    if (!program.currentParticipants.includes(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'أنت غير مسجل في هذا البرنامج'
      });
    }

    // Unenroll user
    program.currentParticipants = program.currentParticipants.filter(
      id => id.toString() !== req.user.id
    );
    await program.save();

    return res.json({
      success: true,
      message: 'تم إلغاء التسجيل من البرنامج بنجاح'
    });
  } catch (error: any) {
    console.error('Unenroll from program error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إلغاء التسجيل من البرنامج',
      error: error.message
    });
  }
};
