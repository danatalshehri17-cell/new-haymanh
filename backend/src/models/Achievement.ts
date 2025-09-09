import mongoose, { Document, Schema } from 'mongoose';

export interface IAchievement extends Document {
  achievementId: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'participation' | 'milestone' | 'special';
  requirements: {
    type: 'programs_completed' | 'hours_spent' | 'streak_days' | 'categories_mastered' | 'custom';
    value: number;
    description: string;
  };
  rewards: {
    points: number;
    badge: string;
    unlockFeature?: string;
  };
  isActive: boolean;
  isHidden: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const achievementSchema = new Schema<IAchievement>({
  achievementId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['learning', 'participation', 'milestone', 'special'],
    required: true
  },
  requirements: {
    type: {
      type: String,
      enum: ['programs_completed', 'hours_spent', 'streak_days', 'categories_mastered', 'custom'],
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  rewards: {
    points: {
      type: Number,
      default: 0
    },
    badge: {
      type: String,
      default: ''
    },
    unlockFeature: {
      type: String
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isHidden: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes
achievementSchema.index({ achievementId: 1 });
achievementSchema.index({ category: 1, order: 1 });
achievementSchema.index({ isActive: 1, isHidden: 1 });

export default mongoose.model<IAchievement>('Achievement', achievementSchema);
