import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import config from '../config/config';

// Extend Request interface to include file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

// CORS configuration
export const corsOptions: cors.CorsOptions = {
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key'
  ],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count']
};

// Helmet configuration
export const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
});

// Rate limiting configuration
export const rateLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً'
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      message: 'تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً'
    });
  }
});

// Specific rate limiters for different endpoints
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول، يرجى المحاولة لاحقاً'
  },
  skipSuccessfulRequests: true
});

export const uploadRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 uploads per window
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى لرفع الملفات، يرجى المحاولة لاحقاً'
  }
});

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    success: false,
    message: 'تم تجاوز الحد الأقصى للطلبات، يرجى المحاولة لاحقاً'
  }
});

// Security middleware to prevent common attacks
export const securityMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Remove X-Powered-By header
  res.removeHeader('X-Powered-By');
  
  // Add security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  next();
};

// Request size limiter
export const requestSizeLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const contentLength = parseInt(req.headers['content-length'] || '0');
  
  if (contentLength > config.maxFileSize) {
    res.status(413).json({
      success: false,
      message: 'حجم الطلب كبير جداً'
    });
    return;
  }
  
  next();
};

// File type validator
export const validateFileType = (allowedTypes: string[]) => {
  return (req: MulterRequest, res: Response, next: NextFunction): void => {
    if (!req.file) {
      next();
      return;
    }
    
    if (!allowedTypes.includes(req.file.mimetype)) {
      res.status(400).json({
        success: false,
        message: 'نوع الملف غير مسموح به'
      });
      return;
    }
    
    next();
  };
};

// File size validator
export const validateFileSize = (maxSize: number) => {
  return (req: MulterRequest, res: Response, next: NextFunction): void => {
    if (!req.file) {
      next();
      return;
    }
    
    if (req.file.size > maxSize) {
      res.status(400).json({
        success: false,
        message: 'حجم الملف كبير جداً'
      });
      return;
    }
    
    next();
  };
};

// Sanitize request body
export const sanitizeBody = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body) {
    // Remove potentially dangerous properties
    delete req.body.__proto__;
    delete req.body.constructor;
    
    // Sanitize string values
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = req.body[key]
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
      }
    });
  }
  
  next();
};

// Logging middleware for security events
export const securityLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Log suspicious requests
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload/i,
    /onerror/i
  ];
  
  const userAgent = req.headers['user-agent'] || '';
  const body = JSON.stringify(req.body);
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(userAgent) || pattern.test(body)
  );
  
  if (isSuspicious) {
    console.warn('Suspicious request detected:', {
      ip: req.ip,
      userAgent,
      body: req.body,
      url: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  }
  
  next();
};
