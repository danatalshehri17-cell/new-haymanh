import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';

// @desc    Get comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sort = req.query.sort as string || 'newest';

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    const skip = (page - 1) * limit;
    let sortOption = {};

    switch (sort) {
      case 'oldest':
        sortOption = { createdAt: 1 };
        break;
      case 'mostLiked':
        sortOption = { 'likes.length': -1 };
        break;
      case 'mostReplied':
        sortOption = { 'replies.length': -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const [comments, total] = await Promise.all([
      Comment.find({ post: postId, parentComment: null, isDeleted: false })
        .populate('author', 'firstName lastName avatar')
        .populate({
          path: 'replies',
          populate: {
            path: 'author',
            select: 'firstName lastName avatar'
          },
          match: { isDeleted: false }
        })
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Comment.countDocuments({ post: postId, parentComment: null, isDeleted: false })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        comments,
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
    console.error('Get comments error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب التعليقات',
      error: error.message
    });
  }
};

// @desc    Create new comment
// @route   POST /api/posts/:postId/comments
// @access  Private
export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    // Check if parent comment exists if replying
    if (parentComment) {
      const parentCommentDoc = await Comment.findById(parentComment);
      if (!parentCommentDoc) {
        return res.status(404).json({
          success: false,
          message: 'التعليق الأصلي غير موجود'
        });
      }
    }

    const comment = new Comment({
      content,
      author: req.user.id,
      post: postId,
      parentComment: parentComment || null
    });

    await comment.save();

    // Add comment to post's comments array
    post.comments.push(comment._id as any);
    await post.save();

    // If replying, add to parent comment's replies
    if (parentComment) {
      const parentCommentDoc = await Comment.findById(parentComment);
      if (parentCommentDoc) {
        parentCommentDoc.replies.push(comment._id as any);
        await parentCommentDoc.save();
      }
    }

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'firstName lastName avatar');

    return res.status(201).json({
      success: true,
      message: 'تم إضافة التعليق بنجاح',
      data: { comment: populatedComment }
    });
  } catch (error: any) {
    console.error('Create comment error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إضافة التعليق',
      error: error.message
    });
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    // Check if user is author or admin
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا التعليق'
      });
    }

    // Check if comment is deleted
    if (comment.isDeleted) {
      return res.status(400).json({
        success: false,
        message: 'لا يمكن تعديل تعليق محذوف'
      });
    }

    comment.content = content;
    await comment.save();

    const updatedComment = await Comment.findById(req.params.id)
      .populate('author', 'firstName lastName avatar');

    return res.json({
      success: true,
      message: 'تم تحديث التعليق بنجاح',
      data: { comment: updatedComment }
    });
  } catch (error: any) {
    console.error('Update comment error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث التعليق',
      error: error.message
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    // Check if user is author or admin
    if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا التعليق'
      });
    }

    // Soft delete - mark as deleted
    comment.isDeleted = true;
    await comment.save();

    return res.json({
      success: true,
      message: 'تم حذف التعليق بنجاح'
    });
  } catch (error: any) {
    console.error('Delete comment error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف التعليق',
      error: error.message
    });
  }
};

// @desc    Like/Unlike comment
// @route   POST /api/comments/:id/like
// @access  Private
export const toggleCommentLike = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    const userId = req.user.id;
    const isLiked = comment.likes.includes(userId);

    if (isLiked) {
      // Unlike
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      comment.likes.push(userId);
      // Remove from dislikes if exists
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    }

    await comment.save();

    return res.json({
      success: true,
      message: isLiked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب',
      data: {
        isLiked: !isLiked,
        likesCount: comment.likes.length,
        dislikesCount: comment.dislikes.length
      }
    });
  } catch (error: any) {
    console.error('Toggle comment like error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الإعجاب',
      error: error.message
    });
  }
};

// @desc    Dislike/Undislike comment
// @route   POST /api/comments/:id/dislike
// @access  Private
export const toggleCommentDislike = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    const userId = req.user.id;
    const isDisliked = comment.dislikes.includes(userId);

    if (isDisliked) {
      // Undislike
      comment.dislikes = comment.dislikes.filter(id => id.toString() !== userId);
    } else {
      // Dislike
      comment.dislikes.push(userId);
      // Remove from likes if exists
      comment.likes = comment.likes.filter(id => id.toString() !== userId);
    }

    await comment.save();

    return res.json({
      success: true,
      message: isDisliked ? 'تم إلغاء عدم الإعجاب' : 'تم عدم الإعجاب',
      data: {
        isDisliked: !isDisliked,
        likesCount: comment.likes.length,
        dislikesCount: comment.dislikes.length
      }
    });
  } catch (error: any) {
    console.error('Toggle comment dislike error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث عدم الإعجاب',
      error: error.message
    });
  }
};

// @desc    Get comment replies
// @route   GET /api/comments/:id/replies
// @access  Public
export const getCommentReplies = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'التعليق غير موجود'
      });
    }

    const skip = (page - 1) * limit;

    const [replies, total] = await Promise.all([
      Comment.find({ parentComment: id, isDeleted: false })
        .populate('author', 'firstName lastName avatar')
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit),
      Comment.countDocuments({ parentComment: id, isDeleted: false })
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        replies,
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
    console.error('Get comment replies error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب ردود التعليق',
      error: error.message
    });
  }
};
