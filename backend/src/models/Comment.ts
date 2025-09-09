import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  parentComment?: mongoose.Types.ObjectId;
  replies: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  dislikes: mongoose.Types.ObjectId[];
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: [true, 'محتوى التعليق مطلوب'],
    trim: true,
    minlength: [2, 'التعليق يجب أن يكون حرفين على الأقل'],
    maxlength: [1000, 'التعليق لا يمكن أن يتجاوز 1000 حرف']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'مؤلف التعليق مطلوب']
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: [true, 'المنشور المرتبط بالتعليق مطلوب']
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isEdited: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date
  },
  editedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for like count
commentSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for dislike count
commentSchema.virtual('dislikeCount').get(function() {
  return this.dislikes.length;
});

// Virtual for reply count
commentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

// Virtual for isLiked (to be populated by user context)
commentSchema.virtual('isLiked').get(function() {
  return false; // Will be set by controller
});

// Virtual for isDisliked (to be populated by user context)
commentSchema.virtual('isDisliked').get(function() {
  return false; // Will be set by controller
});

// Virtual for isReply
commentSchema.virtual('isReply').get(function() {
  return !!this.parentComment;
});

// Soft delete method
commentSchema.methods.softDelete = async function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.content = '[تم حذف هذا التعليق]';
  await this.save();
};

// Restore method
commentSchema.methods.restore = async function() {
  this.isDeleted = false;
  this.deletedAt = undefined;
  await this.save();
};

// Middleware to update editedAt when content changes
commentSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }
  next();
});

// Indexes for better performance
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ author: 1, createdAt: -1 });
commentSchema.index({ parentComment: 1, createdAt: 1 });
commentSchema.index({ isDeleted: 1 });
commentSchema.index({ content: 'text' });

export default mongoose.model<IComment>('Comment', commentSchema);
