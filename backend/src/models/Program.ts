import mongoose, { Document, Schema } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  description: string;
  shortDescription?: string;
  category: 'training' | 'mentorship' | 'workshop' | 'course' | 'certification' | 'internship';
  level: 'beginner' | 'intermediate' | 'advanced' | 'all-levels';
  duration: {
    value: number;
    unit: 'hours' | 'days' | 'weeks' | 'months';
  };
  price: {
    amount: number;
    currency: 'SAR' | 'USD' | 'free';
    originalPrice?: number;
    discountPercentage?: number;
  };
  instructor: mongoose.Types.ObjectId;
  maxParticipants?: number;
  currentParticipants: mongoose.Types.ObjectId[];
  participantsCount: number;
  startDate: Date;
  endDate: Date;
  registrationDeadline: Date;
  schedule: {
    days: string[];
    time: string;
    timezone: string;
  };
  location: {
    type: 'online' | 'offline' | 'hybrid';
    address?: string;
    city?: string;
    country?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    onlinePlatform?: string;
    meetingLink?: string;
  };
  curriculum: {
    title: string;
    description: string;
    duration: number;
    materials?: string[];
  }[];
  requirements: string[];
  outcomes: string[];
  materials: string[];
  images: string[];
  featuredImage?: string;
  status: 'draft' | 'published' | 'active' | 'completed' | 'cancelled';
  isFeatured: boolean;
  isPopular: boolean;
  isAvailable: boolean;
  isFull: boolean;
  tags: string[];
  language: 'ar' | 'en' | 'both';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    slug: string;
  };
  ratings: {
    average: number;
    count: number;
    distribution: {
      '1': number;
      '2': number;
      '3': number;
      '4': number;
      '5': number;
    };
  };
  reviews: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const programSchema = new Schema<IProgram>({
  title: {
    type: String,
    required: [true, 'عنوان البرنامج مطلوب'],
    trim: true,
    maxlength: [200, 'عنوان البرنامج لا يمكن أن يتجاوز 200 حرف']
  },
  description: {
    type: String,
    required: [true, 'وصف البرنامج مطلوب'],
    minlength: [100, 'وصف البرنامج يجب أن يكون 100 حرف على الأقل']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'الوصف المختصر لا يمكن أن يتجاوز 300 حرف']
  },
  category: {
    type: String,
    enum: ['training', 'mentorship', 'workshop', 'course', 'certification', 'internship'],
    required: [true, 'فئة البرنامج مطلوبة']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'all-levels'],
    required: [true, 'مستوى البرنامج مطلوب']
  },
  duration: {
    value: {
      type: Number,
      required: [true, 'مدة البرنامج مطلوبة'],
      min: [1, 'مدة البرنامج يجب أن تكون 1 على الأقل']
    },
    unit: {
      type: String,
      enum: ['hours', 'days', 'weeks', 'months'],
      required: [true, 'وحدة المدة مطلوبة']
    }
  },
  price: {
    amount: {
      type: Number,
      required: [true, 'سعر البرنامج مطلوب'],
      min: [0, 'السعر لا يمكن أن يكون سالب']
    },
    currency: {
      type: String,
      enum: ['SAR', 'USD', 'free'],
      default: 'SAR'
    },
    originalPrice: {
      type: Number,
      min: [0, 'السعر الأصلي لا يمكن أن يكون سالب']
    },
    discountPercentage: {
      type: Number,
      min: [0, 'نسبة الخصم لا يمكن أن تكون سالبة'],
      max: [100, 'نسبة الخصم لا يمكن أن تتجاوز 100%']
    }
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'المدرب مطلوب']
  },
  maxParticipants: {
    type: Number,
    min: [1, 'الحد الأقصى للمشاركين يجب أن يكون 1 على الأقل']
  },
  currentParticipants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  participantsCount: {
    type: Number,
    default: 0,
    min: [0, 'عدد المشاركين لا يمكن أن يكون سالب']
  },
  startDate: {
    type: Date,
    required: [true, 'تاريخ بداية البرنامج مطلوب']
  },
  endDate: {
    type: Date,
    required: [true, 'تاريخ انتهاء البرنامج مطلوب']
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'موعد انتهاء التسجيل مطلوب']
  },
  schedule: {
    days: [{
      type: String,
      enum: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    }],
    time: {
      type: String,
      required: [true, 'وقت البرنامج مطلوب']
    },
    timezone: {
      type: String,
      default: 'Asia/Riyadh'
    }
  },
  location: {
    type: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
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
    },
    onlinePlatform: String,
    meetingLink: String
  },
  curriculum: [{
    title: {
      type: String,
      required: [true, 'عنوان الوحدة مطلوب']
    },
    description: {
      type: String,
      required: [true, 'وصف الوحدة مطلوب']
    },
    duration: {
      type: Number,
      required: [true, 'مدة الوحدة مطلوبة'],
      min: [1, 'مدة الوحدة يجب أن تكون 1 على الأقل']
    },
    materials: [String]
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  outcomes: [{
    type: String,
    trim: true
  }],
  materials: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String
  }],
  featuredImage: {
    type: String
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isFull: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  language: {
    type: String,
    enum: ['ar', 'en', 'both'],
    default: 'ar'
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
      required: [true, 'رابط البرنامج مطلوب'],
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'متوسط التقييم لا يمكن أن يكون سالب'],
      max: [5, 'متوسط التقييم لا يمكن أن يتجاوز 5']
    },
    count: {
      type: Number,
      default: 0,
      min: [0, 'عدد التقييمات لا يمكن أن يكون سالب']
    },
    distribution: {
      '1': { type: Number, default: 0 },
      '2': { type: Number, default: 0 },
      '3': { type: Number, default: 0 },
      '4': { type: Number, default: 0 },
      '5': { type: Number, default: 0 }
    }
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Note: isAvailable and isFull are defined as real fields in the schema
// They should be updated manually when participants change

// Virtual for remainingSpots
programSchema.virtual('remainingSpots').get(function() {
  return this.maxParticipants ? this.maxParticipants - this.participantsCount : null;
});

// Virtual for discountAmount
programSchema.virtual('discountAmount').get(function() {
  if (this.price.originalPrice && this.price.discountPercentage) {
    return (this.price.originalPrice * this.price.discountPercentage) / 100;
  }
  return 0;
});

// Virtual for finalPrice
programSchema.virtual('finalPrice').get(function() {
  if (this.price.currency === 'free') return 0;
  if (this.price.originalPrice && this.price.discountPercentage) {
    const discountAmount = (this.price.originalPrice * this.price.discountPercentage) / 100;
    return this.price.originalPrice - discountAmount;
  }
  return this.price.amount;
});

// Auto-generate slug if not provided
programSchema.pre('save', function(next) {
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
  
  next();
});

// Indexes for better performance
programSchema.index({ title: 'text', description: 'text', tags: 'text' });
programSchema.index({ category: 1, status: 1 });
programSchema.index({ level: 1, status: 1 });
programSchema.index({ instructor: 1, status: 1 });
programSchema.index({ startDate: 1, status: 1 });
programSchema.index({ isFeatured: 1, status: 1 });
// programSchema.index({ 'seo.slug': 1 }); // Removed - already indexed by unique: true
programSchema.index({ language: 1, status: 1 });
programSchema.index({ 'ratings.average': -1 });

export default mongoose.model<IProgram>('Program', programSchema);
