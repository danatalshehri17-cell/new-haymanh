import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  enrolledPrograms: {
    programId: mongoose.Types.ObjectId;
    programTitle: string;
    enrollmentDate: Date;
    completionPercentage: number;
    lastAccessed: Date;
    completedLessons: mongoose.Types.ObjectId[];
    currentLesson?: mongoose.Types.ObjectId;
    status: 'enrolled' | 'in-progress' | 'completed' | 'paused';
    certificates?: {
      certificateId: string;
      issuedDate: Date;
      score?: number;
    }[];
  }[];
  selectedOpportunities: {
    opportunityId: mongoose.Types.ObjectId;
    opportunityTitle: string;
    selectionDate: Date;
    status: 'selected' | 'applied' | 'accepted' | 'rejected' | 'withdrawn';
    applicationId?: mongoose.Types.ObjectId;
    notes?: string;
  }[];
  achievements: {
    achievementId: string;
    title: string;
    description: string;
    icon: string;
    earnedDate: Date;
    category: 'learning' | 'participation' | 'milestone' | 'special';
  }[];
  statistics: {
    totalProgramsEnrolled: number;
    totalProgramsCompleted: number;
    totalOpportunitiesSelected: number;
    totalApplicationsSubmitted: number;
    totalHoursSpent: number;
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
    favoriteCategories: string[];
    skillLevels: {
      [category: string]: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    };
  };
  goals: {
    goalId: string;
    title: string;
    description: string;
    targetDate: Date;
    progress: number;
    status: 'active' | 'completed' | 'paused' | 'cancelled';
    category: string;
    createdAt: Date;
  }[];
  recommendations: {
    programId?: mongoose.Types.ObjectId;
    opportunityId?: mongoose.Types.ObjectId;
    type: 'program' | 'opportunity';
    reason: string;
    priority: 'high' | 'medium' | 'low';
    suggestedDate: Date;
  }[];
  dashboardPreferences: {
    layout: 'grid' | 'list' | 'compact';
    showAchievements: boolean;
    showRecommendations: boolean;
    showProgress: boolean;
    showGoals: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  createdAt: Date;
  updatedAt: Date;
}

const userProgressSchema = new Schema<IUserProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  enrolledPrograms: [{
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program',
      required: true
    },
    programTitle: {
      type: String,
      required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    lastAccessed: {
      type: Date,
      default: Date.now
    },
    completedLessons: [{
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    }],
    currentLesson: {
      type: Schema.Types.ObjectId,
      ref: 'Lesson'
    },
    status: {
      type: String,
      enum: ['enrolled', 'in-progress', 'completed', 'paused'],
      default: 'enrolled'
    },
    certificates: [{
      certificateId: String,
      issuedDate: Date,
      score: Number
    }]
  }],
  selectedOpportunities: [{
    opportunityId: {
      type: Schema.Types.ObjectId,
      ref: 'Opportunity',
      required: true
    },
    opportunityTitle: {
      type: String,
      required: true
    },
    selectionDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['selected', 'applied', 'accepted', 'rejected', 'withdrawn'],
      default: 'selected'
    },
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: 'Application'
    },
    notes: String
  }],
  achievements: [{
    achievementId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    earnedDate: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      enum: ['learning', 'participation', 'milestone', 'special'],
      required: true
    }
  }],
  statistics: {
    totalProgramsEnrolled: {
      type: Number,
      default: 0
    },
    totalProgramsCompleted: {
      type: Number,
      default: 0
    },
    totalOpportunitiesSelected: {
      type: Number,
      default: 0
    },
    totalApplicationsSubmitted: {
      type: Number,
      default: 0
    },
    totalHoursSpent: {
      type: Number,
      default: 0
    },
    currentStreak: {
      type: Number,
      default: 0
    },
    longestStreak: {
      type: Number,
      default: 0
    },
    lastActivityDate: {
      type: Date,
      default: Date.now
    },
    favoriteCategories: [String],
    skillLevels: {
      type: Map,
      of: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'expert']
      }
    }
  },
  goals: [{
    goalId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    targetDate: {
      type: Date,
      required: true
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'paused', 'cancelled'],
      default: 'active'
    },
    category: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  recommendations: [{
    programId: {
      type: Schema.Types.ObjectId,
      ref: 'Program'
    },
    opportunityId: {
      type: Schema.Types.ObjectId,
      ref: 'Opportunity'
    },
    type: {
      type: String,
      enum: ['program', 'opportunity'],
      required: true
    },
    reason: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    suggestedDate: {
      type: Date,
      default: Date.now
    }
  }],
  dashboardPreferences: {
    layout: {
      type: String,
      enum: ['grid', 'list', 'compact'],
      default: 'grid'
    },
    showAchievements: {
      type: Boolean,
      default: true
    },
    showRecommendations: {
      type: Boolean,
      default: true
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    showGoals: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'auto'],
      default: 'auto'
    }
  }
}, {
  timestamps: true
});

// Indexes
// userProgressSchema.index({ userId: 1 }); // Removed - already indexed by unique: true
userProgressSchema.index({ 'enrolledPrograms.programId': 1 });
userProgressSchema.index({ 'selectedOpportunities.opportunityId': 1 });
userProgressSchema.index({ 'statistics.lastActivityDate': 1 });

export default mongoose.model<IUserProgress>('UserProgress', userProgressSchema);
