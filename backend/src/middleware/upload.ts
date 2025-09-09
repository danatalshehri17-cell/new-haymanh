import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import config from '../config/config';
import { generateUniqueFilename, ensureDirectoryExists } from '../utils/files';

// Configure storage for different file types
const createStorage = (uploadPath: string) => {
  return multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb) => {
      ensureDirectoryExists(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb) => {
      const uniqueFilename = generateUniqueFilename(file.originalname);
      cb(null, uniqueFilename);
    }
  });
};

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Check file type
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('نوع الملف غير مسموح به'));
  }
};

// Create multer instances for different upload types
export const avatarUpload = multer({
  storage: createStorage(path.join(config.uploadPath, 'avatars')),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
});

export const postImageUpload = multer({
  storage: createStorage(path.join(config.uploadPath, 'posts')),
  fileFilter: (req, file, cb) => {
    // Only allow images for posts
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('يجب أن يكون الملف صورة'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 5
  }
});

export const programImageUpload = multer({
  storage: createStorage(path.join(config.uploadPath, 'programs')),
  fileFilter: (req, file, cb) => {
    // Only allow images for programs
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('يجب أن يكون الملف صورة'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10
  }
});

export const eventImageUpload = multer({
  storage: createStorage(path.join(config.uploadPath, 'events')),
  fileFilter: (req, file, cb) => {
    // Only allow images for events
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('يجب أن يكون الملف صورة'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
    files: 10
  }
});

export const documentUpload = multer({
  storage: createStorage(path.join(config.uploadPath, 'documents')),
  fileFilter: (req, file, cb) => {
    // Allow documents and images
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('نوع الملف غير مسموح به'));
    }
  },
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB
    files: 5
  }
});

export const generalUpload = multer({
  storage: createStorage(path.join(config.uploadPath, 'general')),
  fileFilter,
  limits: {
    fileSize: config.maxFileSize,
    files: 10
  }
});

// Error handling middleware for multer
export const handleMulterError = (error: any, req: Request, res: any, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'حجم الملف كبير جداً'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'عدد الملفات كبير جداً'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        success: false,
        message: 'حقل الملف غير متوقع'
      });
    }
  }

  if (error.message) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }

  next(error);
};
