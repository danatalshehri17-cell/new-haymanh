import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const role = req.query.role as string;
    const status = req.query.status as string;

    const query: any = {};

    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Filter by status
    if (status) {
      query.isActive = status === 'active';
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        users,
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
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب المستخدمين',
      error: error.message
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    return res.json({
      success: true,
      data: { user }
    });
  } catch (error: any) {
    console.error('Get user by ID error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب بيانات المستخدم',
      error: error.message
    });
  }
};

// @desc    Update user (admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, role, isActive, isVerified, bio, interests, education, experience, socialLinks, preferences } = req.body;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (role) updateData.role = role;
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (typeof isVerified === 'boolean') updateData.isVerified = isVerified;
    if (bio) updateData.bio = bio;
    if (interests) updateData.interests = interests;
    if (education) updateData.education = education;
    if (experience) updateData.experience = experience;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (preferences) updateData.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    return res.json({
      success: true,
      message: 'تم تحديث بيانات المستخدم بنجاح',
      data: { user }
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث بيانات المستخدم',
      error: error.message
    });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    return res.json({
      success: true,
      message: 'تم حذف المستخدم بنجاح'
    });
  } catch (error: any) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في حذف المستخدم',
      error: error.message
    });
  }
};

// @desc    Get user statistics (admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
export const getUserStats = async (req: Request, res: Response) => {
  try {
    const [
      totalUsers,
      activeUsers,
      verifiedUsers,
      usersThisMonth,
      usersByRole,
      usersByStatus
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isVerified: true }),
      User.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }),
      User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      User.aggregate([
        { $group: { _id: '$isActive', count: { $sum: 1 } } }
      ])
    ]);

    return res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        verifiedUsers,
        usersThisMonth,
        usersByRole,
        usersByStatus
      }
    });
  } catch (error: any) {
    console.error('Get user stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب إحصائيات المستخدمين',
      error: error.message
    });
  }
};

// @desc    Upload user avatar
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'يرجى رفع صورة'
      });
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: avatarUrl },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    return res.json({
      success: true,
      message: 'تم رفع الصورة الشخصية بنجاح',
      data: { user }
    });
  } catch (error: any) {
    console.error('Upload avatar error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في رفع الصورة الشخصية',
      error: error.message
    });
  }
};

// @desc    Search users
// @route   GET /api/users/search
// @access  Private
export const searchUsers = async (req: Request, res: Response) => {
  try {
    const { q, skills, interests, location } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: any = {};

    // Text search
    if (q) {
      query.$text = { $search: q as string };
    }

    // Skills filter
    if (skills) {
      const skillsArray = (skills as string).split(',').map(s => s.trim());
      query.skills = { $in: skillsArray };
    }

    // Interests filter
    if (interests) {
      const interestsArray = (interests as string).split(',').map(i => i.trim());
      query.interests = { $in: interestsArray };
    }

    // Location filter
    if (location) {
      query['location.city'] = { $regex: location as string, $options: 'i' };
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      User.countDocuments(query)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.json({
      success: true,
      data: {
        users,
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
    console.error('Search users error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في البحث عن المستخدمين',
      error: error.message
    });
  }
};
