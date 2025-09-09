import { Request, Response } from 'express';
import UserProgress from '../models/UserProgress';
import Achievement from '../models/Achievement';
import Program from '../models/Program';
import Opportunity from '../models/Opportunity';
import User from '../models/User';

// @desc    Get user dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // Get or create user progress
    let userProgress = await UserProgress.findOne({ userId })
      .populate('enrolledPrograms.programId')
      .populate('selectedOpportunities.opportunityId');
    
    if (!userProgress) {
      // Create initial dashboard for new user
      userProgress = await createInitialDashboard(userId);
    }

    // Get user's achievements
    const achievements = await Achievement.find({ isActive: true }).sort({ order: 1 });

    // Get recommended programs and opportunities
    const recommendations = await getRecommendedProgramsAndOpportunities(userId, userProgress);

    // Calculate dashboard stats
    const dashboardStats = calculateDashboardStats(userProgress);

    // Get recent activity
    const recentActivity = await getRecentActivity(userId);

    res.json({
      success: true,
      data: {
        userProgress,
        achievements: userProgress.achievements,
        availableAchievements: achievements,
        recommendations,
        stats: dashboardStats,
        recentActivity,
        preferences: userProgress.dashboardPreferences
      }
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في جلب بيانات الداشبورد',
      error: error.message
    });
  }
};

// @desc    Update user progress
// @route   PUT /api/dashboard/progress
// @access  Private
export const updateProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { programId, lessonId, completionPercentage, action } = req.body;

    let userProgress = await UserProgress.findOne({ userId });
    if (!userProgress) {
      userProgress = await createInitialDashboard(userId);
    }

    // Find the enrolled program
    const enrolledProgram = userProgress.enrolledPrograms.find(
      ep => ep.programId.toString() === programId
    );

    if (!enrolledProgram) {
      res.status(404).json({
        success: false,
        message: 'البرنامج غير مسجل'
      });
      return;
    }

    // Update progress based on action
    switch (action) {
      case 'lesson_completed':
        if (!enrolledProgram.completedLessons.includes(lessonId)) {
          enrolledProgram.completedLessons.push(lessonId);
        }
        break;
      case 'progress_update':
        enrolledProgram.completionPercentage = Math.min(completionPercentage, 100);
        break;
      case 'program_completed':
        enrolledProgram.completionPercentage = 100;
        enrolledProgram.status = 'completed';
        break;
    }

    enrolledProgram.lastAccessed = new Date();
    enrolledProgram.status = enrolledProgram.completionPercentage === 100 ? 'completed' : 'in-progress';

    // Update statistics
    userProgress.statistics.totalProgramsCompleted = userProgress.enrolledPrograms.filter(
      ep => ep.status === 'completed'
    ).length;

    await userProgress.save();

    // Check for new achievements
    await checkAndAwardAchievements(userId, userProgress);

    res.json({
      success: true,
      message: 'تم تحديث التقدم بنجاح',
      data: { userProgress }
    });
  } catch (error: any) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث التقدم',
      error: error.message
    });
  }
};

// @desc    Enroll in program
// @route   POST /api/dashboard/enroll
// @access  Private
export const enrollInProgram = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { programId } = req.body;

    // Check if program exists
    const program = await Program.findById(programId);
    if (!program) {
      res.status(404).json({
        success: false,
        message: 'البرنامج غير موجود'
      });
      return;
    }

    let userProgress = await UserProgress.findOne({ userId });
    if (!userProgress) {
      userProgress = await createInitialDashboard(userId);
    }

    // Check if already enrolled
    const alreadyEnrolled = userProgress.enrolledPrograms.some(
      ep => ep.programId.toString() === programId
    );

    if (alreadyEnrolled) {
      res.status(400).json({
        success: false,
        message: 'أنت مسجل في هذا البرنامج بالفعل'
      });
      return;
    }

    // Add to enrolled programs
    userProgress.enrolledPrograms.push({
      programId,
      programTitle: program.title,
      enrollmentDate: new Date(),
      completionPercentage: 0,
      lastAccessed: new Date(),
      completedLessons: [],
      status: 'enrolled'
    });

    // Update statistics
    userProgress.statistics.totalProgramsEnrolled += 1;

    await userProgress.save();

    // Check for new achievements
    await checkAndAwardAchievements(userId, userProgress);

    res.json({
      success: true,
      message: 'تم التسجيل في البرنامج بنجاح',
      data: { userProgress }
    });
  } catch (error: any) {
    console.error('Enroll error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في التسجيل في البرنامج',
      error: error.message
    });
  }
};

// @desc    Select opportunity
// @route   POST /api/dashboard/select-opportunity
// @access  Private
export const selectOpportunity = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { opportunityId, notes } = req.body;

    // Check if opportunity exists
    const opportunity = await Opportunity.findById(opportunityId);
    if (!opportunity) {
      res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة'
      });
      return;
    }

    let userProgress = await UserProgress.findOne({ userId });
    if (!userProgress) {
      userProgress = await createInitialDashboard(userId);
    }

    // Check if already selected
    const alreadySelected = userProgress.selectedOpportunities.some(
      so => so.opportunityId.toString() === opportunityId
    );

    if (alreadySelected) {
      res.status(400).json({
        success: false,
        message: 'لقد اخترت هذه الفرصة بالفعل'
      });
      return;
    }

    // Add to selected opportunities
    userProgress.selectedOpportunities.push({
      opportunityId,
      opportunityTitle: opportunity.title,
      selectionDate: new Date(),
      status: 'selected',
      notes
    });

    // Update statistics
    userProgress.statistics.totalOpportunitiesSelected += 1;

    await userProgress.save();

    res.json({
      success: true,
      message: 'تم اختيار الفرصة بنجاح',
      data: { userProgress }
    });
  } catch (error: any) {
    console.error('Select opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في اختيار الفرصة',
      error: error.message
    });
  }
};

// @desc    Remove selected opportunity
// @route   DELETE /api/dashboard/selected-opportunities/:opportunityId
// @access  Private
export const removeSelectedOpportunity = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { opportunityId } = req.params;

    let userProgress = await UserProgress.findOne({ userId });
    if (!userProgress) {
      res.status(404).json({
        success: false,
        message: 'لم يتم العثور على بيانات المستخدم'
      });
      return;
    }

    // Remove from selected opportunities
    const initialLength = userProgress.selectedOpportunities.length;
    userProgress.selectedOpportunities = userProgress.selectedOpportunities.filter(
      so => so.opportunityId.toString() !== opportunityId
    );

    if (userProgress.selectedOpportunities.length === initialLength) {
      res.status(404).json({
        success: false,
        message: 'الفرصة غير موجودة في قائمة الفرص المختارة'
      });
      return;
    }

    // Update statistics
    userProgress.statistics.totalOpportunitiesSelected -= 1;

    await userProgress.save();

    res.json({
      success: true,
      message: 'تم إزالة الفرصة من القائمة بنجاح',
      data: { userProgress }
    });
  } catch (error: any) {
    console.error('Remove selected opportunity error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في إزالة الفرصة',
      error: error.message
    });
  }
};

// @desc    Update dashboard preferences
// @route   PUT /api/dashboard/preferences
// @access  Private
export const updatePreferences = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const preferences = req.body;

    let userProgress = await UserProgress.findOne({ userId });
    if (!userProgress) {
      userProgress = await createInitialDashboard(userId);
    }

    userProgress.dashboardPreferences = {
      ...userProgress.dashboardPreferences,
      ...preferences
    };

    await userProgress.save();

    res.json({
      success: true,
      message: 'تم تحديث التفضيلات بنجاح',
      data: { preferences: userProgress.dashboardPreferences }
    });
  } catch (error: any) {
    console.error('Update preferences error:', error);
    res.status(500).json({
      success: false,
      message: 'خطأ في تحديث التفضيلات',
      error: error.message
    });
  }
};

// Helper function to create initial dashboard for new user
const createInitialDashboard = async (userId: string) => {
  const userProgress = new UserProgress({
    userId,
    enrolledPrograms: [],
    selectedOpportunities: [],
    achievements: [],
    statistics: {
      totalProgramsEnrolled: 0,
      totalProgramsCompleted: 0,
      totalOpportunitiesSelected: 0,
      totalApplicationsSubmitted: 0,
      totalHoursSpent: 0,
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: new Date(),
      favoriteCategories: [],
      skillLevels: new Map()
    },
    goals: [],
    recommendations: [],
    dashboardPreferences: {
      layout: 'grid',
      showAchievements: true,
      showRecommendations: true,
      showProgress: true,
      showGoals: true,
      theme: 'auto'
    }
  });

  await userProgress.save();
  return userProgress;
};

// Helper function to get recommended programs and opportunities
const getRecommendedProgramsAndOpportunities = async (userId: string, userProgress: any) => {
  // Get user's interests and completed categories
  const user = await User.findById(userId);
  const completedCategories = userProgress.enrolledPrograms
    .filter((ep: any) => ep.status === 'completed')
    .map((ep: any) => ep.programId.category);

  const userInterests = user?.interests || [];
  const allCategories = [...userInterests, ...completedCategories];

  // Find recommended programs
  const recommendedPrograms = await Program.find({
    _id: { $nin: userProgress.enrolledPrograms.map((ep: any) => ep.programId) },
    category: { $in: allCategories },
    status: 'active'
  }).limit(3);

  // Find recommended opportunities
  const recommendedOpportunities = await Opportunity.find({
    _id: { $nin: userProgress.selectedOpportunities.map((so: any) => so.opportunityId) },
    category: { $in: allCategories },
    status: 'active'
  }).limit(3);

  const recommendations = [];

  // Add program recommendations
  recommendations.push(...recommendedPrograms.map(program => ({
    programId: program._id,
    type: 'program',
    reason: 'مبني على اهتماماتك',
    priority: 'high',
    suggestedDate: new Date()
  })));

  // Add opportunity recommendations
  recommendations.push(...recommendedOpportunities.map(opportunity => ({
    opportunityId: opportunity._id,
    type: 'opportunity',
    reason: 'مناسب لمجال اهتمامك',
    priority: 'medium',
    suggestedDate: new Date()
  })));

  return recommendations;
};

// Helper function to calculate dashboard statistics
const calculateDashboardStats = (userProgress: any) => {
  const totalPrograms = userProgress.enrolledPrograms.length;
  const completedPrograms = userProgress.enrolledPrograms.filter(
    (ep: any) => ep.status === 'completed'
  ).length;
  const inProgressPrograms = userProgress.enrolledPrograms.filter(
    (ep: any) => ep.status === 'in-progress'
  ).length;

  const totalOpportunities = userProgress.selectedOpportunities.length;
  const appliedOpportunities = userProgress.selectedOpportunities.filter(
    (so: any) => so.status === 'applied'
  ).length;

  const completionRate = totalPrograms > 0 ? (completedPrograms / totalPrograms) * 100 : 0;

  return {
    totalPrograms,
    completedPrograms,
    inProgressPrograms,
    totalOpportunities,
    appliedOpportunities,
    completionRate: Math.round(completionRate),
    totalAchievements: userProgress.achievements.length,
    currentStreak: userProgress.statistics.currentStreak,
    totalHoursSpent: userProgress.statistics.totalHoursSpent
  };
};

// Helper function to get recent activity
const getRecentActivity = async (userId: string) => {
  const userProgress = await UserProgress.findOne({ userId })
    .populate('enrolledPrograms.programId')
    .sort({ 'enrolledPrograms.lastAccessed': -1 });

  if (!userProgress) return [];

  return userProgress.enrolledPrograms
    .slice(0, 5)
    .map((ep: any) => ({
      type: 'program_activity',
      programTitle: ep.programTitle,
      action: ep.status === 'completed' ? 'completed' : 'accessed',
      date: ep.lastAccessed,
      progress: ep.completionPercentage
    }));
};

// Helper function to check and award achievements
const checkAndAwardAchievements = async (userId: string, userProgress: any) => {
  const achievements = await Achievement.find({ isActive: true });
  const newAchievements = [];

  for (const achievement of achievements) {
    // Check if user already has this achievement
    const hasAchievement = userProgress.achievements.some(
      (a: any) => a.achievementId === achievement.achievementId
    );

    if (hasAchievement) continue;

    // Check if user meets requirements
    let meetsRequirements = false;

    switch (achievement.requirements.type) {
      case 'programs_completed':
        meetsRequirements = userProgress.statistics.totalProgramsCompleted >= achievement.requirements.value;
        break;
      case 'hours_spent':
        meetsRequirements = userProgress.statistics.totalHoursSpent >= achievement.requirements.value;
        break;
      case 'streak_days':
        meetsRequirements = userProgress.statistics.currentStreak >= achievement.requirements.value;
        break;
    }

    if (meetsRequirements) {
      userProgress.achievements.push({
        achievementId: achievement.achievementId,
        title: achievement.title,
        description: achievement.description,
        icon: achievement.icon,
        earnedDate: new Date(),
        category: achievement.category
      });

      newAchievements.push(achievement);
    }
  }

  if (newAchievements.length > 0) {
    await userProgress.save();
  }

  return newAchievements;
};
