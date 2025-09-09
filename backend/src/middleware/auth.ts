import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Protect routes - verify JWT token
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'غير مصرح لك بالوصول، يرجى تسجيل الدخول'
      });
      return;
    }

    try {
      // Verify token
      const jwtSecret = process.env.JWT_SECRET || 'haymanh-secret-key';
      const decoded = jwt.verify(token, jwtSecret) as any;
      
      // Get user from token
      const user = await User.findById(decoded.userId).select('-password');
      
      if (!user) {
        res.status(401).json({
          success: false,
          message: 'المستخدم غير موجود'
        });
        return;
      }

      if (!user.isActive) {
        res.status(401).json({
          success: false,
          message: 'الحساب معطل، يرجى التواصل مع الإدارة'
        });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'الرمز غير صحيح أو منتهي الصلاحية'
      });
      return;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في المصادقة',
      error: 'Internal server error'
    });
    return;
  }
};

// Admin middleware - check if user is admin
export const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'غير مصرح لك بالوصول، مطلوب صلاحيات المدير'
    });
    return;
  }
};

// Moderator middleware - check if user is moderator or admin
export const moderator = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && (req.user.role === 'moderator' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'غير مصرح لك بالوصول، مطلوب صلاحيات المشرف'
    });
    return;
  }
};

// Optional auth - verify token if present but don't require it
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const jwtSecret = process.env.JWT_SECRET || 'haymanh-secret-key';
        const decoded = jwt.verify(token, jwtSecret) as any;
        const user = await User.findById(decoded.userId).select('-password');
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we don't fail the request
        console.log('Invalid token in optional auth:', error);
      }
    }

    next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next();
  }
};
