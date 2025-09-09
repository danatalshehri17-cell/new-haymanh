import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  applicant: mongoose.Types.ObjectId;
  opportunity: mongoose.Types.ObjectId;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'accepted' | 'rejected' | 'withdrawn';
  coverLetter: string;
  resume: string;
  additionalDocuments: string[];
  experience: {
    years: number;
    description: string;
    relevantSkills: string[];
  };
  education: {
    degree: string;
    institution: string;
    graduationYear: number;
    gpa?: number;
    relevantCourses: string[];
  };
  skills: string[];
  languages: {
    language: string;
    proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
  }[];
  references: {
    name: string;
    title: string;
    company: string;
    email: string;
    phone?: string;
    relationship: string;
  }[];
  availability: {
    startDate: Date;
    isFlexible: boolean;
    preferredSchedule?: string;
    timezone: string;
  };
  salary: {
    expected: number;
    currency: 'SAR' | 'USD' | 'EUR';
    isNegotiable: boolean;
  };
  questions: {
    question: string;
    answer: string;
  }[];
  notes: string;
  isWithdrawn: boolean;
  withdrawnAt?: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
  reviewNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>({
  applicant: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'مقدم الطلب مطلوب']
  },
  opportunity: {
    type: Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: [true, 'الفرصة المرتبطة بالطلب مطلوبة']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'shortlisted', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending'
  },
  coverLetter: {
    type: String,
    required: [true, 'خطاب التقديم مطلوب'],
    trim: true,
    minlength: [100, 'خطاب التقديم يجب أن يكون 100 حرف على الأقل'],
    maxlength: [2000, 'خطاب التقديم لا يمكن أن يتجاوز 2000 حرف']
  },
  resume: {
    type: String,
    required: [true, 'السيرة الذاتية مطلوبة']
  },
  additionalDocuments: [{
    type: String
  }],
  experience: {
    years: {
      type: Number,
      required: [true, 'سنوات الخبرة مطلوبة'],
      min: [0, 'سنوات الخبرة لا يمكن أن تكون سالبة']
    },
    description: {
      type: String,
      required: [true, 'وصف الخبرة مطلوب'],
      trim: true,
      maxlength: [1000, 'وصف الخبرة لا يمكن أن يتجاوز 1000 حرف']
    },
    relevantSkills: [{
      type: String,
      trim: true
    }]
  },
  education: {
    degree: {
      type: String,
      required: [true, 'الدرجة العلمية مطلوبة'],
      trim: true
    },
    institution: {
      type: String,
      required: [true, 'اسم المؤسسة التعليمية مطلوب'],
      trim: true
    },
    graduationYear: {
      type: Number,
      required: [true, 'سنة التخرج مطلوبة'],
      min: [1950, 'سنة التخرج يجب أن تكون 1950 على الأقل'],
      max: [new Date().getFullYear() + 5, 'سنة التخرج لا يمكن أن تتجاوز 5 سنوات من الآن']
    },
    gpa: {
      type: Number,
      min: [0, 'المعدل التراكمي لا يمكن أن يكون سالب'],
      max: [4, 'المعدل التراكمي لا يمكن أن يتجاوز 4']
    },
    relevantCourses: [{
      type: String,
      trim: true
    }]
  },
  skills: [{
    type: String,
    trim: true
  }],
  languages: [{
    language: {
      type: String,
      required: [true, 'اسم اللغة مطلوب']
    },
    proficiency: {
      type: String,
      enum: ['basic', 'intermediate', 'fluent', 'native'],
      required: [true, 'مستوى الإتقان مطلوب']
    }
  }],
  references: [{
    name: {
      type: String,
      required: [true, 'اسم المرجع مطلوب'],
      trim: true
    },
    title: {
      type: String,
      required: [true, 'المسمى الوظيفي مطلوب'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'اسم الشركة مطلوب'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'البريد الإلكتروني مطلوب'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'يرجى إدخال بريد إلكتروني صحيح']
    },
    phone: String,
    relationship: {
      type: String,
      required: [true, 'العلاقة بالمرجع مطلوبة'],
      trim: true
    }
  }],
  availability: {
    startDate: {
      type: Date,
      required: [true, 'تاريخ البدء المتوقع مطلوب']
    },
    isFlexible: {
      type: Boolean,
      default: true
    },
    preferredSchedule: String,
    timezone: {
      type: String,
      default: 'Asia/Riyadh'
    }
  },
  salary: {
    expected: {
      type: Number,
      required: [true, 'الراتب المتوقع مطلوب'],
      min: [0, 'الراتب المتوقع لا يمكن أن يكون سالب']
    },
    currency: {
      type: String,
      enum: ['SAR', 'USD', 'EUR'],
      default: 'SAR'
    },
    isNegotiable: {
      type: Boolean,
      default: true
    }
  },
  questions: [{
    question: {
      type: String,
      required: [true, 'السؤال مطلوب'],
      trim: true
    },
    answer: {
      type: String,
      required: [true, 'الإجابة مطلوبة'],
      trim: true,
      maxlength: [500, 'الإجابة لا يمكن أن تتجاوز 500 حرف']
    }
  }],
  notes: {
    type: String,
    maxlength: [1000, 'الملاحظات لا يمكن أن تتجاوز 1000 حرف']
  },
  isWithdrawn: {
    type: Boolean,
    default: false
  },
  withdrawnAt: Date,
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: Date,
  reviewNotes: {
    type: String,
    maxlength: [1000, 'ملاحظات المراجعة لا يمكن أن تتجاوز 1000 حرف']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for isActive
applicationSchema.virtual('isActive').get(function() {
  return !this.isWithdrawn && this.status !== 'withdrawn';
});

// Virtual for canWithdraw
applicationSchema.virtual('canWithdraw').get(function() {
  return this.status === 'pending' || this.status === 'reviewing';
});

// Virtual for canEdit
applicationSchema.virtual('canEdit').get(function() {
  return this.status === 'pending' || this.status === 'reviewing';
});

// Ensure one application per user per opportunity
applicationSchema.index({ applicant: 1, opportunity: 1 }, { unique: true });

// Indexes for better performance
applicationSchema.index({ opportunity: 1, status: 1 });
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ reviewedBy: 1, reviewedAt: -1 });
applicationSchema.index({ isWithdrawn: 1, createdAt: -1 });

export default mongoose.model<IApplication>('Application', applicationSchema);
