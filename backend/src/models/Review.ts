import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  author: mongoose.Types.ObjectId;
  program: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  content: string;
  isVerified: boolean;
  isHelpful: boolean;
  helpfulCount: number;
  helpfulUsers: mongoose.Types.ObjectId[];
  isEdited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'مؤلف التقييم مطلوب']
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    required: [true, 'البرنامج المرتبط بالتقييم مطلوب']
  },
  rating: {
    type: Number,
    required: [true, 'التقييم مطلوب'],
    min: [1, 'التقييم يجب أن يكون 1 على الأقل'],
    max: [5, 'التقييم لا يمكن أن يتجاوز 5']
  },
  title: {
    type: String,
    maxlength: [100, 'عنوان التقييم لا يمكن أن يتجاوز 100 حرف']
  },
  content: {
    type: String,
    required: [true, 'محتوى التقييم مطلوب'],
    trim: true,
    minlength: [10, 'محتوى التقييم يجب أن يكون 10 أحرف على الأقل'],
    maxlength: [1000, 'محتوى التقييم لا يمكن أن يتجاوز 1000 حرف']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isHelpful: {
    type: Boolean,
    default: false
  },
  helpfulCount: {
    type: Number,
    default: 0,
    min: [0, 'عدد الإفادة لا يمكن أن يكون سالب']
  },
  helpfulUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for isHelpfulByUser (to be populated by user context)
reviewSchema.virtual('isHelpfulByUser').get(function() {
  return false; // Will be set by controller
});

// Ensure one review per user per program
reviewSchema.index({ author: 1, program: 1 }, { unique: true });

// Indexes for better performance
reviewSchema.index({ program: 1, rating: -1 });
reviewSchema.index({ author: 1, createdAt: -1 });
reviewSchema.index({ isVerified: 1, createdAt: -1 });
reviewSchema.index({ helpfulCount: -1, createdAt: -1 });

export default mongoose.model<IReview>('Review', reviewSchema);
