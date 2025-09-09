import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Get file extension from filename
export const getFileExtension = (filename: string): string => {
  return path.extname(filename).toLowerCase();
};

// Check if file is an image
export const isImageFile = (filename: string): boolean => {
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  return allowedExtensions.includes(getFileExtension(filename));
};

// Check if file is a document
export const isDocumentFile = (filename: string): boolean => {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
  return allowedExtensions.includes(getFileExtension(filename));
};

// Generate unique filename
export const generateUniqueFilename = (originalname: string): string => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = getFileExtension(originalname);
  return `${timestamp}-${randomString}${extension}`;
};

// Create directory if it doesn't exist
export const ensureDirectoryExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Delete file
export const deleteFile = (filePath: string): boolean => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

// Get file size in MB
export const getFileSizeInMB = (sizeInBytes: number): number => {
  return sizeInBytes / (1024 * 1024);
};

// Validate file size
export const validateFileSize = (sizeInBytes: number, maxSizeInMB: number): boolean => {
  const fileSizeInMB = getFileSizeInMB(sizeInBytes);
  return fileSizeInMB <= maxSizeInMB;
};

// Get file info
export const getFileInfo = (req: Request, file: Express.Multer.File) => {
  return {
    originalname: file.originalname,
    filename: file.filename,
    mimetype: file.mimetype,
    size: file.size,
    sizeInMB: getFileSizeInMB(file.size),
    path: file.path,
    url: `/uploads/${file.fieldname}/${file.filename}`
  };
};
