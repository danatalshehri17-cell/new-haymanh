import { Request, Response, NextFunction } from 'express';

// Custom error class
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handler middleware
export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'خطأ داخلي في الخادم';

  // Handle custom AppError
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Handle Mongoose validation errors
  else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'بيانات غير صحيحة';
  }
  // Handle Mongoose cast errors (invalid ObjectId)
  else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'معرف غير صحيح';
  }
  // Handle Mongoose duplicate key errors
  else if (error.name === 'MongoError' && (error as any).code === 11000) {
    statusCode = 400;
    message = 'البيانات موجودة مسبقاً';
  }
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'رمز غير صحيح';
  }
  else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'الرمز منتهي الصلاحية';
  }
  // Handle Multer errors
  else if (error.name === 'MulterError') {
    statusCode = 400;
    if ((error as any).code === 'LIMIT_FILE_SIZE') {
      message = 'حجم الملف كبير جداً';
    } else if ((error as any).code === 'LIMIT_FILE_COUNT') {
      message = 'عدد الملفات كبير جداً';
    } else {
      message = 'خطأ في رفع الملف';
    }
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    });
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      error: error.message,
      stack: error.stack
    })
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: 'المسار غير موجود'
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Validation error handler
export const handleValidationError = (error: any): AppError => {
  const errors = Object.values(error.errors).map((err: any) => err.message);
  const message = errors.join('. ');
  return new AppError(message, 400);
};

// Cast error handler
export const handleCastError = (error: any): AppError => {
  const message = `معرف غير صحيح: ${error.value}`;
  return new AppError(message, 400);
};

// Duplicate key error handler
export const handleDuplicateKeyError = (error: any): AppError => {
  const field = Object.keys(error.keyValue)[0];
  const message = `${field} موجود مسبقاً`;
  return new AppError(message, 400);
};

// JWT error handler
export const handleJWTError = (): AppError => {
  return new AppError('رمز غير صحيح', 401);
};

// JWT expired error handler
export const handleJWTExpiredError = (): AppError => {
  return new AppError('الرمز منتهي الصلاحية', 401);
};
