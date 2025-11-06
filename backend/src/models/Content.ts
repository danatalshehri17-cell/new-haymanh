import mongoose, { Document, Schema } from 'mongoose';

export interface IContent extends Document {
  pageId: string;
  pageTitle: string;
  pageType: 'home' | 'about' | 'programs' | 'opportunities' | 'news' | 'contact' | 'blog' | 'community';
  language: 'ar' | 'en';
  sections: {
    sectionId: string;
    sectionType: 'hero' | 'text' | 'image' | 'cards' | 'list' | 'form' | 'gallery' | 'video' | 'testimonials';
    title?: string;
    content?: string;
    images?: string[];
    links?: {
      text: string;
      url: string;
      type: 'internal' | 'external';
    }[];
    metadata?: {
      [key: string]: any;
    };
    order: number;
    isActive: boolean;
  }[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    slug: string;
  };
  isPublished: boolean;
  publishedAt?: Date;
  lastModified: Date;
  modifiedBy: mongoose.Types.ObjectId;
  version: number;
}

const contentSchema = new Schema<IContent>({
  pageId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  pageTitle: {
    type: String,
    required: true,
    trim: true
  },
  pageType: {
    type: String,
    enum: ['home', 'about', 'programs', 'opportunities', 'news', 'contact', 'blog', 'community'],
    required: true
  },
  language: {
    type: String,
    enum: ['ar', 'en'],
    default: 'ar'
  },
  sections: [{
    sectionId: {
      type: String,
      required: true
    },
    sectionType: {
      type: String,
      enum: ['hero', 'text', 'image', 'cards', 'list', 'form', 'gallery', 'video', 'testimonials'],
      required: true
    },
    title: {
      type: String,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    images: [{
      type: String,
      trim: true
    }],
    links: [{
      text: {
        type: String,
        required: true,
        trim: true
      },
      url: {
        type: String,
        required: true,
        trim: true
      },
      type: {
        type: String,
        enum: ['internal', 'external'],
        default: 'internal'
      }
    }],
    metadata: {
      type: Schema.Types.Mixed,
      default: {}
    },
    order: {
      type: Number,
      required: true,
      default: 0
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  seo: {
    metaTitle: {
      type: String,
      required: true,
      maxlength: [60, 'عنوان SEO لا يمكن أن يتجاوز 60 حرف']
    },
    metaDescription: {
      type: String,
      required: true,
      maxlength: [160, 'وصف SEO لا يمكن أن يتجاوز 160 حرف']
    },
    keywords: [String],
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  modifiedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Indexes for better performance
contentSchema.index({ pageId: 1, language: 1 });
contentSchema.index({ pageType: 1, isPublished: 1 });
contentSchema.index({ 'seo.slug': 1 });
contentSchema.index({ modifiedBy: 1, lastModified: -1 });

export default mongoose.model<IContent>('Content', contentSchema);
