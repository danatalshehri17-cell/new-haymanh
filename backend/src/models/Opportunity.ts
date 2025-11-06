import mongoose, { Document, Schema } from 'mongoose';

export interface IOpportunity extends Document {
  title: string;
  description: string;
  shortDescription?: string;
  type: 'job' | 'internship' | 'volunteer' | 'scholarship' | 'fellowship' | 'competition' | 'grant';
  category: 'technology' | 'education' | 'healthcare' | 'business' | 'arts' | 'sports' | 'environment' | 'social-impact';
  company: {
    name: string;
    logo?: string;
    website?: string;
    description?: string;
  };
  location: {
    type: 'remote' | 'onsite' | 'hybrid';
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  requirements: {
    education: string[];
    experience: string[];
    skills: string[];
    languages: string[];
    certifications?: string[];
  };
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: 'SAR' | 'USD' | 'EUR';
    period: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    isNegotiable: boolean;
  };
  duration?: {
    type: 'temporary' | 'permanent' | 'contract';
    value?: number;
    unit?: 'days' | 'weeks' | 'months' | 'years';
  };
  applicationDeadline: Date;
  startDate?: Date;
  endDate?: Date;
  maxApplicants?: number;
  currentApplicants: number;
  applicantsList: mongoose.Types.ObjectId[];
  status: 'active' | 'closed' | 'expired' | 'draft';
  isFeatured: boolean;
  isUrgent: boolean;
  tags: string[];
  language: 'ar' | 'en' | 'both';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    slug: string;
  };
  contactInfo: {
    email?: string;
    phone?: string;
    website?: string;
    contactPerson?: string;
  };
  applicationProcess: {
    steps: string[];
    requiredDocuments: string[];
    applicationForm?: string;
  };
  views: number;
  applications: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  
  // Virtual properties
  isAvailable: boolean;
  isFull: boolean;
  remainingSpots: number | null;
  daysUntilDeadline: number;
}

const opportunitySchema = new Schema<IOpportunity>({
  title: {
    type: String,
    required: [true, 'عنوان الفرصة مطلوب'],
    trim: true,
    maxlength: [200, 'عنوان الفرصة لا يمكن أن يتجاوز 200 حرف']
  },
  description: {
    type: String,
    required: [true, 'وصف الفرصة مطلوب'],
    minlength: [200, 'وصف الفرصة يجب أن يكون 200 حرف على الأقل']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'الوصف المختصر لا يمكن أن يتجاوز 300 حرف']
  },
  type: {
    type: String,
    enum: ['job', 'internship', 'volunteer', 'scholarship', 'fellowship', 'competition', 'grant'],
    required: [true, 'نوع الفرصة مطلوب']
  },
  category: {
    type: String,
    enum: ['technology', 'education', 'healthcare', 'business', 'arts', 'sports', 'environment', 'social-impact'],
    required: [true, 'فئة الفرصة مطلوبة']
  },
  company: {
    name: {
      type: String,
      required: [true, 'اسم الشركة مطلوب'],
      trim: true
    },
    logo: String,
    website: String,
    description: String
  },
  location: {
    type: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: [true, 'نوع الموقع مطلوب']
    },
    address: String,
    city: String,
    country: {
      type: String,
      default: 'Saudi Arabia'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  requirements: {
    education: [{
      type: String,
      trim: true
    }],
    experience: [{
      type: String,
      trim: true
    }],
    skills: [{
      type: String,
      trim: true
    }],
    languages: [{
      type: String,
      trim: true
    }],
    certifications: [{
      type: String,
      trim: true
    }]
  },
  benefits: [{
    type: String,
    trim: true
  }],
  salary: {
    min: {
      type: Number,
      min: [0, 'الحد الأدنى للراتب لا يمكن أن يكون سالب']
    },
    max: {
      type: Number,
      min: [0, 'الحد الأقصى للراتب لا يمكن أن يكون سالب']
    },
    currency: {
      type: String,
      enum: ['SAR', 'USD', 'EUR'],
      default: 'SAR'
    },
    period: {
      type: String,
      enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'monthly'
    },
    isNegotiable: {
      type: Boolean,
      default: false
    }
  },
  duration: {
    type: {
      type: String,
      enum: ['temporary', 'permanent', 'contract']
    },
    value: {
      type: Number,
      min: [1, 'قيمة المدة يجب أن تكون 1 على الأقل']
    },
    unit: {
      type: String,
      enum: ['days', 'weeks', 'months', 'years']
    }
  },
  applicationDeadline: {
    type: Date,
    required: [true, 'موعد انتهاء التقديم مطلوب']
  },
  startDate: Date,
  endDate: Date,
  maxApplicants: {
    type: Number,
    min: [1, 'الحد الأقصى للمتقدمين يجب أن يكون 1 على الأقل']
  },
  currentApplicants: {
    type: Number,
    default: 0,
    min: [0, 'عدد المتقدمين الحالي لا يمكن أن يكون سالب']
  },
  applicantsList: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'expired', 'draft'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  language: {
    type: String,
    enum: ['en', 'both'],
    default: 'en'
  },
  seo: {
    metaTitle: {
      type: String,
      maxlength: [60, 'عنوان SEO لا يمكن أن يتجاوز 60 حرف']
    },
    metaDescription: {
      type: String,
      maxlength: [160, 'وصف SEO لا يمكن أن يتجاوز 160 حرف']
    },
    keywords: [String],
    slug: {
      type: String,
      required: [true, 'رابط الفرصة مطلوب'],
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  contactInfo: {
    email: String,
    phone: String,
    website: String,
    contactPerson: String
  },
  applicationProcess: {
    steps: [{
      type: String,
      trim: true
    }],
    requiredDocuments: [{
      type: String,
      trim: true
    }],
    applicationForm: String
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'عدد المشاهدات لا يمكن أن يكون سالب']
  },
  applications: [{
    type: Schema.Types.ObjectId,
    ref: 'Application'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for availability
opportunitySchema.virtual('isAvailable').get(function() {
  return this.status === 'active' && 
         new Date() < this.applicationDeadline &&
         (!this.maxApplicants || this.currentApplicants < this.maxApplicants);
});

// Virtual for isFull
opportunitySchema.virtual('isFull').get(function() {
  return this.maxApplicants ? this.currentApplicants >= this.maxApplicants : false;
});

// Virtual for remainingSpots
opportunitySchema.virtual('remainingSpots').get(function() {
  return this.maxApplicants ? this.maxApplicants - this.currentApplicants : null;
});

// Virtual for daysUntilDeadline
opportunitySchema.virtual('daysUntilDeadline').get(function() {
  const now = new Date();
  const deadline = new Date(this.applicationDeadline);
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for isUrgent
opportunitySchema.virtual('isUrgentOpportunity').get(function() {
  const now = new Date();
  const deadline = new Date(this.applicationDeadline);
  const diffTime = deadline.getTime() - now.getTime();
  const daysUntilDeadline = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return daysUntilDeadline <= 7;
});

// Auto-generate slug if not provided
opportunitySchema.pre('save', function(next) {
  if (!this.seo.slug) {
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  // Auto-generate short description if not provided
  if (!this.shortDescription && this.description) {
    this.shortDescription = this.description.substring(0, 150).trim() + '...';
  }
  
  // Auto-set urgent status if deadline is within 7 days
  const now = new Date();
  const deadline = new Date(this.applicationDeadline);
  const diffTime = deadline.getTime() - now.getTime();
  const daysUntilDeadline = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (daysUntilDeadline <= 7) {
    this.isUrgent = true;
  }
  
  next();
});

// Indexes for better performance
opportunitySchema.index({ title: 'text', description: 'text', tags: 'text' });
opportunitySchema.index({ type: 1, status: 1 });
opportunitySchema.index({ category: 1, status: 1 });
opportunitySchema.index({ 'company.name': 1, status: 1 });
opportunitySchema.index({ 'location.type': 1, status: 1 });
opportunitySchema.index({ applicationDeadline: 1, status: 1 });
opportunitySchema.index({ isFeatured: 1, status: 1 });
opportunitySchema.index({ isUrgent: 1, status: 1 });
// opportunitySchema.index({ 'seo.slug': 1 }); // Removed - already indexed by unique: true
opportunitySchema.index({ language: 1, status: 1 });
opportunitySchema.index({ createdAt: -1 });

export default mongoose.model<IOpportunity>('Opportunity', opportunitySchema);
