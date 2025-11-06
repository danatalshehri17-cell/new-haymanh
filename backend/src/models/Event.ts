import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  shortDescription?: string;
  type: 'conference' | 'workshop' | 'seminar' | 'webinar' | 'meetup' | 'competition' | 'exhibition' | 'ceremony';
  category: 'technology' | 'education' | 'business' | 'healthcare' | 'arts' | 'sports' | 'environment' | 'social-impact';
  organizer: {
    name: string;
    logo?: string;
    website?: string;
    description?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
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
    venue?: string;
    onlinePlatform?: string;
    meetingLink?: string;
    timezone: string;
  };
  schedule: {
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
    isAllDay: boolean;
    timezone: string;
  };
  registration: {
    isRequired: boolean;
    deadline?: Date;
    maxAttendees?: number;
    currentAttendees: number;
    isFree: boolean;
    price?: {
      amount: number;
      currency: 'SAR' | 'USD' | 'EUR';
      earlyBirdPrice?: number;
      earlyBirdDeadline?: Date;
    };
    registrationForm?: string;
  };
  speakers: {
    name: string;
    title?: string;
    company?: string;
    bio?: string;
    avatar?: string;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  }[];
  agenda: {
    time: string;
    title: string;
    description?: string;
    speaker?: string;
    duration: number;
    type: 'keynote' | 'session' | 'break' | 'networking' | 'workshop';
  }[];
  targetAudience: string[];
  requirements?: string[];
  benefits: string[];
  materials?: string[];
  images: string[];
  featuredImage?: string;
  status: 'draft' | 'published' | 'upcoming' | 'active' | 'completed' | 'cancelled';
  isFeatured: boolean;
  isPopular: boolean;
  tags: string[];
  language: 'ar' | 'en' | 'both';
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    slug: string;
  };
  socialMedia: {
    hashtags: string[];
    socialLinks?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  views: number;
  attendees: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>({
  title: {
    type: String,
    required: [true, 'عنوان الفعالية مطلوب'],
    trim: true,
    maxlength: [200, 'عنوان الفعالية لا يمكن أن يتجاوز 200 حرف']
  },
  description: {
    type: String,
    required: [true, 'وصف الفعالية مطلوب'],
    minlength: [200, 'وصف الفعالية يجب أن يكون 200 حرف على الأقل']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'الوصف المختصر لا يمكن أن يتجاوز 300 حرف']
  },
  type: {
    type: String,
    enum: ['conference', 'workshop', 'seminar', 'webinar', 'meetup', 'competition', 'exhibition', 'ceremony'],
    required: [true, 'نوع الفعالية مطلوب']
  },
  category: {
    type: String,
    enum: ['technology', 'education', 'business', 'healthcare', 'arts', 'sports', 'environment', 'social-impact'],
    required: [true, 'فئة الفعالية مطلوبة']
  },
  organizer: {
    name: {
      type: String,
      required: [true, 'اسم المنظم مطلوب'],
      trim: true
    },
    logo: String,
    website: String,
    description: String,
    contactPerson: String,
    email: String,
    phone: String
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
    venue: String,
    onlinePlatform: String,
    meetingLink: String,
    timezone: {
      type: String,
      default: 'Asia/Riyadh'
    }
  },
  schedule: {
    startDate: {
      type: Date,
      required: [true, 'تاريخ بداية الفعالية مطلوب']
    },
    endDate: {
      type: Date,
      required: [true, 'تاريخ انتهاء الفعالية مطلوب']
    },
    startTime: {
      type: String,
      required: [true, 'وقت بداية الفعالية مطلوب']
    },
    endTime: {
      type: String,
      required: [true, 'وقت انتهاء الفعالية مطلوب']
    },
    isAllDay: {
      type: Boolean,
      default: false
    },
    timezone: {
      type: String,
      default: 'Asia/Riyadh'
    }
  },
  registration: {
    isRequired: {
      type: Boolean,
      default: true
    },
    deadline: Date,
    maxAttendees: {
      type: Number,
      min: [1, 'الحد الأقصى للحضور يجب أن يكون 1 على الأقل']
    },
    currentAttendees: {
      type: Number,
      default: 0,
      min: [0, 'عدد الحضور الحالي لا يمكن أن يكون سالب']
    },
    isFree: {
      type: Boolean,
      default: true
    },
    price: {
      amount: {
        type: Number,
        min: [0, 'السعر لا يمكن أن يكون سالب']
      },
      currency: {
        type: String,
        enum: ['SAR', 'USD', 'EUR'],
        default: 'SAR'
      },
      earlyBirdPrice: {
        type: Number,
        min: [0, 'سعر الطيور المبكرة لا يمكن أن يكون سالب']
      },
      earlyBirdDeadline: Date
    },
    registrationForm: String
  },
  speakers: [{
    name: {
      type: String,
      required: [true, 'اسم المتحدث مطلوب']
    },
    title: String,
    company: String,
    bio: String,
    avatar: String,
    socialLinks: {
      linkedin: String,
      twitter: String,
      website: String
    }
  }],
  agenda: [{
    time: {
      type: String,
      required: [true, 'وقت الجلسة مطلوب']
    },
    title: {
      type: String,
      required: [true, 'عنوان الجلسة مطلوب']
    },
    description: String,
    speaker: String,
    duration: {
      type: Number,
      required: [true, 'مدة الجلسة مطلوبة'],
      min: [1, 'مدة الجلسة يجب أن تكون دقيقة واحدة على الأقل']
    },
    type: {
      type: String,
      enum: ['keynote', 'session', 'break', 'networking', 'workshop'],
      default: 'session'
    }
  }],
  targetAudience: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  benefits: [{
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
    enum: ['draft', 'published', 'upcoming', 'active', 'completed', 'cancelled'],
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
      required: [true, 'رابط الفعالية مطلوب'],
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  socialMedia: {
    hashtags: [{
      type: String,
      trim: true
    }],
    socialLinks: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String
    }
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'عدد المشاهدات لا يمكن أن يكون سالب']
  },
  attendees: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for availability
eventSchema.virtual('isAvailable').get(function() {
  return this.status === 'upcoming' || this.status === 'active';
});

// Virtual for isFull
eventSchema.virtual('isFull').get(function() {
  return this.registration.maxAttendees ? 
         this.registration.currentAttendees >= this.registration.maxAttendees : false;
});

// Virtual for remainingSpots
eventSchema.virtual('remainingSpots').get(function() {
  return this.registration.maxAttendees ? 
         this.registration.maxAttendees - this.registration.currentAttendees : null;
});

// Virtual for daysUntilEvent
eventSchema.virtual('daysUntilEvent').get(function() {
  const now = new Date();
  const eventDate = new Date(this.schedule.startDate);
  const diffTime = eventDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for isUpcoming
eventSchema.virtual('isUpcoming').get(function() {
  const now = new Date();
  const eventDate = new Date(this.schedule.startDate);
  const diffTime = eventDate.getTime() - now.getTime();
  const daysUntilEvent = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return daysUntilEvent > 0;
});

// Virtual for isToday
eventSchema.virtual('isToday').get(function() {
  const today = new Date();
  const eventDate = new Date(this.schedule.startDate);
  return today.toDateString() === eventDate.toDateString();
});

// Virtual for isPast
eventSchema.virtual('isPast').get(function() {
  const now = new Date();
  const eventDate = new Date(this.schedule.endDate);
  return now > eventDate;
});

// Auto-generate slug if not provided
eventSchema.pre('save', function(next) {
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
  
  // Auto-set status based on dates
  const now = new Date();
  if (this.schedule.startDate > now) {
    this.status = 'upcoming';
  } else if (this.schedule.endDate < now) {
    this.status = 'completed';
  } else if (this.schedule.startDate <= now && this.schedule.endDate >= now) {
    this.status = 'active';
  }
  
  next();
});

// Indexes for better performance
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ type: 1, status: 1 });
eventSchema.index({ category: 1, status: 1 });
eventSchema.index({ organizer: 1, status: 1 });
eventSchema.index({ 'location.type': 1, status: 1 });
eventSchema.index({ 'schedule.startDate': 1, status: 1 });
eventSchema.index({ 'schedule.endDate': 1, status: 1 });
eventSchema.index({ isFeatured: 1, status: 1 });
// eventSchema.index({ 'seo.slug': 1 }); // Removed - already indexed by unique: true
eventSchema.index({ language: 1, status: 1 });
eventSchema.index({ createdAt: -1 });

export default mongoose.model<IEvent>('Event', eventSchema);
