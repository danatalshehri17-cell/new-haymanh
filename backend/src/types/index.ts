// User Types
export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  bio?: string;
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends Omit<IUser, '_id' | 'role' | 'isVerified' | 'isActive' | 'createdAt' | 'updatedAt'> {
  confirmPassword: string;
}

// Blog Post Types
export interface IPost {
  _id?: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string | IUser;
  category: string;
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Comment Types
export interface IComment {
  _id?: string;
  content: string;
  author: string | IUser;
  post: string | IPost;
  parentComment?: string | IComment;
  replies: string[] | IComment[];
  isApproved: boolean;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Program Types
export interface IProgram {
  _id?: string;
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  price: number;
  currency: 'SAR' | 'USD';
  isOnline: boolean;
  isInPerson: boolean;
  maxParticipants: number;
  currentParticipants: number;
  startDate: Date;
  endDate: Date;
  instructor: string | IUser;
  materials: string[];
  requirements: string[];
  outcomes: string[];
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Opportunity Types
export interface IOpportunity {
  _id?: string;
  title: string;
  description: string;
  type: 'job' | 'internship' | 'volunteer' | 'scholarship';
  organization: string;
  location: string;
  isRemote: boolean;
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: 'SAR' | 'USD';
  };
  deadline: Date;
  status: 'open' | 'closed' | 'expired';
  contactEmail: string;
  contactPhone?: string;
  applicationCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Event Types
export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  type: 'workshop' | 'seminar' | 'conference' | 'meetup';
  startDate: Date;
  endDate: Date;
  location: string;
  isOnline: boolean;
  onlineLink?: string;
  maxAttendees: number;
  currentAttendees: number;
  organizer: string | IUser;
  speakers: string[] | IUser[];
  agenda: string[];
  materials: string[];
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Pagination Types
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

// Search Types
export interface SearchQuery extends PaginationQuery {
  q?: string;
  category?: string;
  tags?: string[];
  author?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// File Upload Types
export interface FileUpload {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Authentication Types
export interface AuthRequest extends Request {
  user?: IUser;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}
