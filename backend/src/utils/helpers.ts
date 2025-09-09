import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { JwtPayload } from '../types';

/**
 * Generate a random string
 * @param length - Length of the random string
 * @returns Random string
 */
export const generateRandomString = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate a random number between min and max
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Random number
 */
export const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Generate JWT token
 * @param payload - Token payload
 * @returns JWT token
 */
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, config.jwtSecret as string, {
    expiresIn: '24h'
  });
};

/**
 * Verify JWT token
 * @param token - JWT token to verify
 * @returns Decoded payload or null
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, config.jwtSecret as string) as JwtPayload;
  } catch (error) {
    return null;
  }
};

/**
 * Hash a string using SHA-256
 * @param text - Text to hash
 * @returns Hashed string
 */
export const hashString = (text: string): string => {
  return crypto.createHash('sha256').update(text).digest('hex');
};

/**
 * Generate a slug from text
 * @param text - Text to convert to slug
 * @returns Slug string
 */
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Format date to Arabic locale
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatArabicDate = (date: Date): string => {
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
};

/**
 * Format date to relative time (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'الآن';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} دقيقة`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `منذ ${diffInDays} يوم`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `منذ ${diffInWeeks} أسبوع`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `منذ ${diffInMonths} شهر`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `منذ ${diffInYears} سنة`;
};

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Capitalize first letter of each word
 * @param text - Text to capitalize
 * @returns Capitalized text
 */
export const capitalizeWords = (text: string): string => {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
};

/**
 * Generate initials from name
 * @param firstName - First name
 * @param lastName - Last name
 * @returns Initials string
 */
export const generateInitials = (firstName: string, lastName: string): string => {
  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

/**
 * Validate email format
 * @param email - Email to validate
 * @returns Boolean indicating if email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format (Saudi Arabia)
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export const isValidSaudiPhone = (phone: string): boolean => {
  const phoneRegex = /^(05|5|9665|\+9665)[0-9]{8}$/;
  return phoneRegex.test(phone);
};

/**
 * Generate a random color in hex format
 * @returns Hex color string
 */
export const generateRandomColor = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

/**
 * Check if string contains Arabic text
 * @param text - Text to check
 * @returns Boolean indicating if text contains Arabic
 */
export const containsArabic = (text: string): boolean => {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

/**
 * Convert text to Arabic numerals
 * @param text - Text with English numerals
 * @returns Text with Arabic numerals
 */
export const toArabicNumerals = (text: string): string => {
  const numeralsMap: { [key: string]: string } = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
  };

  return text.replace(/[0-9]/g, (match) => numeralsMap[match] || match);
};

/**
 * Convert text to English numerals
 * @param text - Text with Arabic numerals
 * @returns Text with English numerals
 */
export const toEnglishNumerals = (text: string): string => {
  const numeralsMap: { [key: string]: string } = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9'
  };

  return text.replace(/[٠-٩]/g, (match) => numeralsMap[match] || match);
};
