import { Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const status = req.query.status as string || 'published';
    const language = req.query.language as string;
    const search = req.query.search as string;
    const featured = req.query.featured === 'true';

    const query: any = { status };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by language
    if (language) {
      query.language = language;
    }

    // Filter by featured
    if (featured) {
      query.isFeatured = true;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      Post.find(query)
        .populate('author', 'firstName lastName avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        posts,
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
    console.error('Get posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب المنشورات',
      error: error.message
    });
  }
};

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'firstName lastName avatar bio')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'firstName lastName avatar'
        }
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    return res.json({
      success: true,
      data: { post }
    });
  } catch (error: any) {
    console.error('Get post by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب المنشور',
      error: error.message
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage, seo, language } = req.body;

    const post = new Post({
      title,
      content,
      excerpt,
      category,
      tags,
      featuredImage,
      seo,
      language,
      author: req.user.id
    });

    await post.save();

    const populatedPost = await Post.findById(post._id)
      .populate('author', 'firstName lastName avatar');

    res.status(201).json({
      success: true,
      message: 'تم إنشاء المنشور بنجاح',
      data: { post: populatedPost }
    });
  } catch (error: any) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء المنشور',
      error: error.message
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage, seo, language, status } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بتعديل هذا المنشور'
      });
    }

    const updateData: any = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (category) updateData.category = category;
    if (tags) updateData.tags = tags;
    if (featuredImage) updateData.featuredImage = featuredImage;
    if (seo) updateData.seo = seo;
    if (language) updateData.language = language;
    if (status) updateData.status = status;

    // Set publishedAt if status changes to published
    if (status === 'published' && post.status !== 'published') {
      updateData.publishedAt = new Date();
      updateData.isPublished = true;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'firstName lastName avatar');

    return res.json({
      success: true,
      message: 'تم تحديث المنشور بنجاح',
      data: { post: updatedPost }
    });
  } catch (error: any) {
    console.error('Update post error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث المنشور',
      error: error.message
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    // Check if user is author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'غير مصرح لك بحذف هذا المنشور'
      });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    // Delete post
    await Post.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: 'تم حذف المنشور بنجاح'
    });
  } catch (error: any) {
    console.error('Delete post error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف المنشور',
      error: error.message
    });
  }
};

// @desc    Like/Unlike post
// @route   POST /api/posts/:id/like
// @access  Private
export const toggleLike = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    const userId = req.user.id;
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      post.likes.push(userId);
      // Remove from dislikes if exists
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    }

    await post.save();

    return res.json({
      success: true,
      message: isLiked ? 'تم إلغاء الإعجاب' : 'تم الإعجاب',
      data: {
        isLiked: !isLiked,
        likesCount: post.likes.length,
        dislikesCount: post.dislikes.length
      }
    });
  } catch (error: any) {
    console.error('Toggle like error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الإعجاب',
      error: error.message
    });
  }
};

// @desc    Dislike/Undislike post
// @route   POST /api/posts/:id/dislike
// @access  Private
export const toggleDislike = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    const userId = req.user.id;
    const isDisliked = post.dislikes.includes(userId);

    if (isDisliked) {
      // Undislike
      post.dislikes = post.dislikes.filter(id => id.toString() !== userId);
    } else {
      // Dislike
      post.dislikes.push(userId);
      // Remove from likes if exists
      post.likes = post.likes.filter(id => id.toString() !== userId);
    }

    await post.save();

    return res.json({
      success: true,
      message: isDisliked ? 'تم إلغاء عدم الإعجاب' : 'تم عدم الإعجاب',
      data: {
        isDisliked: !isDisliked,
        likesCount: post.likes.length,
        dislikesCount: post.dislikes.length
      }
    });
  } catch (error: any) {
    console.error('Toggle dislike error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث عدم الإعجاب',
      error: error.message
    });
  }
};

// @desc    Get post by slug
// @route   GET /api/posts/slug/:slug
// @access  Public
export const getPostBySlug = async (req: Request, res: Response) => {
  try {
    const post = await Post.findOne({ 'seo.slug': req.params.slug })
      .populate('author', 'firstName lastName avatar bio')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'firstName lastName avatar'
        }
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'المنشور غير موجود'
      });
    }

    // Increment view count
    post.views += 1;
    await post.save();

    return res.json({
      success: true,
      data: { post }
    });
  } catch (error: any) {
    console.error('Get post by slug error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب المنشور',
      error: error.message
    });
  }
};

// @desc    Get featured posts
// @route   GET /api/posts/featured
// @access  Public
export const getFeaturedPosts = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const posts = await Post.find({
      isFeatured: true,
      status: 'published'
    })
      .populate('author', 'firstName lastName avatar')
      .sort({ publishedAt: -1 })
      .limit(limit);

    return res.json({
      success: true,
      data: { posts }
    });
  } catch (error: any) {
    console.error('Get featured posts error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب المنشورات المميزة',
      error: error.message
    });
  }
};
