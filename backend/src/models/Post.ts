import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  excerpt?: string;
  author: mongoose.Types.ObjectId;
  category: 'news' | 'blog' | 'announcement' | 'success-story' | 'educational';
  tags: string[];
  featuredImage?: string;
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
  isPublished: boolean;
  publishedAt?: Date;
  views: number;
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    slug: string;
  };
  language: 'ar' | 'en';
  readingTime?: number;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>({
  title: {
    type: String,
    required: [true, 'عنوان المنشور مطلوب'],
    trim: true,
    maxlength: [200, 'عنوان المنشور لا يمكن أن يتجاوز 200 حرف']
  },
  content: {
    type: String,
    required: [true, 'محتوى المنشور مطلوب'],
    minlength: [100, 'محتوى المنشور يجب أن يكون 100 حرف على الأقل']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'ملخص المنشور لا يمكن أن يتجاوز 300 حرف']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'مؤلف المنشور مطلوب']
  },
  category: {
    type: String,
    enum: ['news', 'blog', 'announcement', 'success-story', 'educational'],
    required: [true, 'فئة المنشور مطلوبة'],
    default: 'blog'
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'كل وسم لا يمكن أن يتجاوز 30 حرف']
  }],
  featuredImage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
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
      required: [true, 'رابط المنشور مطلوب'],
      unique: true,
      lowercase: true,
      trim: true
    }
  },
  language: {
    type: String,
    enum: ['ar', 'en'],
    default: 'ar'
  },
  readingTime: {
    type: Number,
    min: [1, 'وقت القراءة يجب أن يكون دقيقة واحدة على الأقل']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for dislike count
postSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length;
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Virtual for isLiked (to be populated by user context)
postSchema.virtual('isLiked').get(function() {
  return false; // Will be set by controller
});

// Virtual for isDisliked (to be populated by user context)
postSchema.virtual('isDisliked').get(function() {
  return false; // Will be set by controller
});

// Auto-generate excerpt if not provided
postSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 150).trim() + '...';
  }
  
  // Auto-generate reading time (average reading speed: 200 words per minute)
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    this.readingTime = Math.ceil(wordCount / 200);
  }
  
  // Auto-generate slug if not provided
  if (!this.seo.slug) {
    this.seo.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  next();
});

// Indexes for better performance
postSchema.index({ title: 'text', content: 'text', tags: 'text' });
postSchema.index({ author: 1, status: 1 });
postSchema.index({ category: 1, status: 1 });
postSchema.index({ isFeatured: 1, publishedAt: -1 });
// postSchema.index({ 'seo.slug': 1 }); // Removed - already indexed by unique: true
postSchema.index({ language: 1, status: 1 });

export default mongoose.model<IPost>('Post', postSchema);
