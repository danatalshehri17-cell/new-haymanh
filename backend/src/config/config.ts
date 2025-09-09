import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // JWT Configuration
  jwtSecret: process.env.JWT_SECRET || 'haymanh_default_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  
  // File Upload Configuration
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB
  uploadPath: process.env.UPLOAD_PATH || './uploads',
  
  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  
  // CORS Configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // Database Configuration
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/haymanh_db',
  
  // Email Configuration
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

export default config;
