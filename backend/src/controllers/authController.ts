import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../utils/email';

// Generate JWT Token
const generateToken = (userId: string): string => {
  const jwtSecret = process.env.JWT_SECRET || 'haymanh-secret-key';
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
  
  return jwt.sign({ userId }, jwtSecret, {
    expiresIn: jwtExpiresIn
  } as jwt.SignOptions);
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    // Demo mode - create demo user
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'جميع الحقول مطلوبة'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      phone: phone || '',
      avatar: firstName.charAt(0),
      role: 'user',
      isActive: true,
      isVerified: true,
      interests: [],
      preferences: {
        emailNotifications: true,
        pushNotifications: true,
        language: 'ar'
      },
      loginCount: 0
    });

    await user.save();

    // Generate token
    const token = generateToken((user._id as any).toString());

    // Remove password from response
    const userResponse = user.toObject();
    delete (userResponse as any).password;

    return res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إنشاء الحساب',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'الحساب معطل، يرجى التواصل مع الإدارة'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'بيانات الدخول غير صحيحة'
      });
    }

    // Update last login and login count
    user.lastLogin = new Date();
    user.loginCount += 1;
    await user.save();

    // Generate token
    const token = generateToken((user._id as any).toString());

    // Remove password from response
    const userResponse = user.toObject();
    if ('password' in userResponse) {
      delete (userResponse as any).password;
    }

    return res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        user: userResponse,
        token
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تسجيل الدخول',
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
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
    console.error('Get me error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في جلب بيانات المستخدم',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, phone, bio, interests, education, experience, socialLinks, preferences } = req.body;

    const updateData: any = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (phone) updateData.phone = phone;
    if (bio) updateData.bio = bio;
    if (interests) updateData.interests = interests;
    if (education) updateData.education = education;
    if (experience) updateData.experience = experience;
    if (socialLinks) updateData.socialLinks = socialLinks;
    if (preferences) updateData.preferences = preferences;

    const user = await User.findByIdAndUpdate(
      req.user.id,
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
      message: 'تم تحديث الملف الشخصي بنجاح',
      data: { user }
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تحديث الملف الشخصي',
      error: error.message
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: 'كلمة المرور الحالية غير صحيحة'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: 'تم تغيير كلمة المرور بنجاح'
    });
  } catch (error: any) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تغيير كلمة المرور',
      error: error.message
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'البريد الإلكتروني غير مسجل'
      });
    }

    // Generate reset token (valid for 1 hour)
    const jwtSecret = process.env.JWT_SECRET || 'haymanh-secret-key';
    const resetToken = jwt.sign(
      { userId: user._id, type: 'password-reset' },
      jwtSecret,
      { expiresIn: '1h' }
    );

    // Send password reset email
    try {
      await sendPasswordResetEmail(user.email, user.firstName, resetToken);
    } catch (emailError) {
      console.error('Error sending password reset email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'خطأ في إرسال بريد إعادة تعيين كلمة المرور'
      });
    }

    return res.json({
      success: true,
      message: 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في عملية نسيان كلمة المرور',
      error: error.message
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    // Verify reset token
    const jwtSecret = process.env.JWT_SECRET || 'haymanh-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    if (decoded.type !== 'password-reset') {
      return res.status(400).json({
        success: false,
        message: 'رمز إعادة التعيين غير صحيح'
      });
    }

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.json({
      success: true,
      message: 'تم إعادة تعيين كلمة المرور بنجاح'
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'رمز إعادة التعيين غير صحيح أو منتهي الصلاحية'
      });
    }

    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في إعادة تعيين كلمة المرور',
      error: error.message
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: Request, res: Response) => {
  try {
    // In a real application, you might want to blacklist the token
    // For now, we'll just return a success message
    return res.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في تسجيل الخروج',
      error: error.message
    });
  }
};

// @desc    Verify email
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    // Verify token
    const jwtSecret = process.env.JWT_SECRET || 'haymanh-secret-key';
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    if (decoded.type !== 'email-verification') {
      return res.status(400).json({
        success: false,
        message: 'رمز التحقق غير صحيح'
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'المستخدم غير موجود'
      });
    }

    return res.json({
      success: true,
      message: 'تم التحقق من البريد الإلكتروني بنجاح'
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(400).json({
        success: false,
        message: 'رمز التحقق غير صحيح أو منتهي الصلاحية'
      });
    }

    console.error('Verify email error:', error);
    return res.status(500).json({
      success: false,
      message: 'خطأ في التحقق من البريد الإلكتروني',
      error: error.message
    });
  }
};
