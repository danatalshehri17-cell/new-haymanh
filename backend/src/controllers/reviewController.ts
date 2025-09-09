import { Request, Response } from 'express';
import Review from '../models/Review';
import Program from '../models/Program';

// @desc    Get reviews for a program
// @route   GET /api/programs/:programId/reviews
// @access  Public
export const getReviews = async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort as string || 'newest';
    const rating = parseInt(req.query.rating as string);

    // Check if program exists
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    const skip = (page - 1) * limit;
    let sortOption = {};
    let query: any = { program: programId };

    // Filter by rating
    if (rating && rating >= 1 && rating <= 5) {
      query.rating = rating;
    }

    switch (sort) {
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'highest':
        sortOption = { rating: -1 };
        break;
      case 'lowest':
        sortOption = { rating: 1 };
        break;
      case 'mostHelpful':
        sortOption = { helpfulCount: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .populate('author', 'firstName lastName avatar')
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Review.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        reviews,
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
    console.error('Get reviews error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب التقييمات',
      error: error.message
    });
  }
};

// @desc    Create new review
// @route   POST /api/programs/:programId/reviews
// @access  Private
export const createReview = async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;
    const { rating, title, content } = req.body;

    // Check if program exists
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    // Check if user has already reviewed this program
    const existingReview = await Review.findOne({
      author: req.user.id,
      program: programId
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'لقد قمت بتقييم هذا البرنامج مسبقاً'
      });
    }

    const review = new Review({
      author: req.user.id,
      program: programId,
      rating,
      title,
      content
    });

    await review.save();

    // Add review to program
    program.reviews.push(review._id as any);
    await program.save();

    // Update program rating statistics
    await updateProgramRatingStats(programId);

    const populatedReview = await Review.findById(review._id)
      .populate('author', 'firstName lastName avatar');

    return res.status(201).json({
      success: true,
      message: 'تم إضافة التقييم بنجاح',
      data: { review: populatedReview }
    });
  } catch (error: any) {
    console.error('Create review error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إضافة التقييم',
      error: error.message
    });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req: Request, res: Response) => {
  try {
    const { rating, title, content } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'التقييم غير موجود'
      });
    }

    // Check if user is author or admin
    if (review.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا التقييم'
      });
    }

    review.rating = rating;
    review.title = title;
    review.content = content;
    review.isEdited = true;
    review.editedAt = new Date();

    await review.save();

    // Update program rating statistics
    await updateProgramRatingStats(review.program.toString());

    const updatedReview = await Review.findById(req.params.id)
      .populate('author', 'firstName lastName avatar');

    return res.json({
      success: true,
      message: 'تم تحديث التقييم بنجاح',
      data: { review: updatedReview }
    });
  } catch (error: any) {
    console.error('Update review error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث التقييم',
      error: error.message
    });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'التقييم غير موجود'
      });
    }

    // Check if user is author or admin
    if (review.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا التقييم'
      });
    }

    // Remove review from program
    await Program.findByIdAndUpdate(review.program, {
      $pull: { reviews: review._id }
    });

    // Delete review
    await Review.findByIdAndDelete(req.params.id);

    // Update program rating statistics
    await updateProgramRatingStats(review.program.toString());

    return res.json({
      success: true,
      message: 'تم حذف التقييم بنجاح'
    });
  } catch (error: any) {
    console.error('Delete review error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف التقييم',
      error: error.message
    });
  }
};

// @desc    Mark review as helpful
// @route   POST /api/reviews/:id/helpful
// @access  Private
export const toggleHelpful = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'التقييم غير موجود'
      });
    }

    const userId = req.user.id;
    const isHelpful = review.helpfulUsers.includes(userId);

    if (isHelpful) {
      // Remove helpful mark
      review.helpfulUsers = review.helpfulUsers.filter(id => id.toString() !== userId);
      review.helpfulCount = Math.max(0, review.helpfulCount - 1);
    } else {
      // Add helpful mark
      review.helpfulUsers.push(userId);
      review.helpfulCount += 1;
    }

    await review.save();

    return res.json({
      success: true,
      message: isHelpful ? 'تم إلغاء علامة الإفادة' : 'تم إضافة علامة الإفادة',
      data: {
        isHelpful: !isHelpful,
        helpfulCount: review.helpfulCount
      }
    });
  } catch (error: any) {
    console.error('Toggle helpful error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث علامة الإفادة',
      error: error.message
    });
  }
};

// @desc    Get review statistics for a program
// @route   GET /api/programs/:programId/reviews/stats
// @access  Public
export const getReviewStats = async (req: Request, res: Response) => {
  try {
    const { programId } = req.params;

    // Check if program exists
    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
    }

    // تعطيل الـ aggregation مؤقتاً لحل مشكلة TypeScript
    const reviews = await Review.find({ program: program._id });
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
    
    const ratingDistribution = {
      rating1: reviews.filter(review => review.rating === 1).length,
      rating2: reviews.filter(review => review.rating === 2).length,
      rating3: reviews.filter(review => review.rating === 3).length,
      rating4: reviews.filter(review => review.rating === 4).length,
      rating5: reviews.filter(review => review.rating === 5).length
    };
    
    const stats = [{
      totalReviews,
      averageRating,
      ratingDistribution
    }];

    const reviewStats = stats[0] || {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { rating1: 0, rating2: 0, rating3: 0, rating4: 0, rating5: 0 }
    };

    return res.json({
      success: true,
      data: { stats: reviewStats }
    });
  } catch (error: any) {
    console.error('Get review stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب إحصائيات التقييمات',
      error: error.message
    });
  }
};

// Helper function to update program rating statistics
const updateProgramRatingStats = async (programId: string) => {
  try {
    // تعطيل الـ aggregation مؤقتاً لحل مشكلة TypeScript
    const reviews = await Review.find({ program: programId });
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0;
    
    const ratingDistribution = {
      rating1: reviews.filter(review => review.rating === 1).length,
      rating2: reviews.filter(review => review.rating === 2).length,
      rating3: reviews.filter(review => review.rating === 3).length,
      rating4: reviews.filter(review => review.rating === 4).length,
      rating5: reviews.filter(review => review.rating === 5).length
    };
    
    const stats = [{
      averageRating,
      totalReviews,
      ratingDistribution
    }];

    if (stats.length > 0) {
      const { averageRating, totalReviews, ratingDistribution } = stats[0];
      
      await Program.findByIdAndUpdate(programId, {
        'ratings.average': Math.round(averageRating * 10) / 10,
        'ratings.count': totalReviews,
        'ratings.distribution': ratingDistribution
      });
    }
  } catch (error) {
    console.error('Error updating program rating stats:', error);
  }
};
