import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator' | 'instructor';
  isVerified: boolean;
  isActive: boolean;
  bio?: string;
  interests: string[];
  education?: {
    institution: string;
    degree: string;
    field: string;
    graduationYear?: number;
  };
  experience?: {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    description?: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    language: 'ar' | 'en';
  };
  lastLogin?: Date;
  loginCount: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, 'الاسم الأول مطلوب'],
    trim: true,
    maxlength: [50, 'الاسم الأول لا يمكن أن يتجاوز 50 حرف']
  },
  lastName: {
    type: String,
    required: [true, 'الاسم الأخير مطلوب'],
    trim: true,
    maxlength: [50, 'الاسم الأخير لا يمكن أن يتجاوز 50 حرف']
  },
  email: {
    type: String,
    required: [true, 'البريد الإلكتروني مطلوب'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'يرجى إدخال بريد إلكتروني صحيح']
  },
  password: {
    type: String,
    required: [true, 'كلمة المرور مطلوبة'],
    minlength: [8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'],
    select: false
  },
  phone: {
    type: String,
    trim: true,
    match: [/^(\+966|966|0)?5[0-9]{8}$/, 'يرجى إدخال رقم هاتف صحيح']
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator', 'instructor'],
    default: 'admin'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  bio: {
    type: String,
    maxlength: [500, 'السيرة الذاتية لا يمكن أن تتجاوز 500 حرف']
  },
  interests: [{
    type: String,
    trim: true
  }],
  education: {
    institution: String,
    degree: String,
    field: String,
    graduationYear: Number
  },
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  socialLinks: {
    linkedin: String,
    twitter: String,
    github: String,
    website: String
  },
  preferences: {
    emailNotifications: {
      type: Boolean,
      default: true
    },
    pushNotifications: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      enum: ['ar', 'en'],
      default: 'ar'
    }
  },
  lastLogin: Date,
  loginCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Index for search
userSchema.index({ firstName: 'text', lastName: 'text', email: 'text', bio: 'text' });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
