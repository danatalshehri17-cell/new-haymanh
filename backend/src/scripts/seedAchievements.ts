import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Achievement from '../models/Achievement';
import { connectDB } from '../config/database';

// Load environment variables
dotenv.config();

const achievements = [
  {
    achievementId: 'first_steps',
    title: 'الخطوات الأولى',
    description: 'أكمل أول برنامج تدريبي',
    icon: '🎯',
    category: 'learning',
    requirements: {
      type: 'programs_completed',
      value: 1,
      description: 'أكمل برنامج واحد'
    },
    rewards: {
      points: 100,
      badge: 'bronze'
    },
    order: 1
  },
  {
    achievementId: 'dedicated_learner',
    title: 'المتعلم المتفاني',
    description: 'أكمل 5 برامج تدريبية',
    icon: '📚',
    category: 'learning',
    requirements: {
      type: 'programs_completed',
      value: 5,
      description: 'أكمل 5 برامج'
    },
    rewards: {
      points: 500,
      badge: 'silver'
    },
    order: 2
  },
  {
    achievementId: 'expert_learner',
    title: 'خبير التعلم',
    description: 'أكمل 10 برامج تدريبية',
    icon: '🏆',
    category: 'learning',
    requirements: {
      type: 'programs_completed',
      value: 10,
      description: 'أكمل 10 برامج'
    },
    rewards: {
      points: 1000,
      badge: 'gold'
    },
    order: 3
  },
  {
    achievementId: 'streak_master',
    title: 'سيد الاستمرارية',
    description: 'حافظ على استمرارية التعلم لمدة 7 أيام متتالية',
    icon: '🔥',
    category: 'milestone',
    requirements: {
      type: 'streak_days',
      value: 7,
      description: '7 أيام متتالية'
    },
    rewards: {
      points: 300,
      badge: 'silver'
    },
    order: 4
  },
  {
    achievementId: 'time_investor',
    title: 'مستثمر الوقت',
    description: 'اقض 50 ساعة في التعلم',
    icon: '⏰',
    category: 'milestone',
    requirements: {
      type: 'hours_spent',
      value: 50,
      description: '50 ساعة تعلم'
    },
    rewards: {
      points: 750,
      badge: 'gold'
    },
    order: 5
  },
  {
    achievementId: 'early_bird',
    title: 'الطائر المبكر',
    description: 'سجل في أول برنامج خلال 24 ساعة من التسجيل',
    icon: '🐦',
    category: 'participation',
    requirements: {
      type: 'custom',
      value: 1,
      description: 'سجل في برنامج خلال 24 ساعة'
    },
    rewards: {
      points: 200,
      badge: 'bronze'
    },
    order: 6
  },
  {
    achievementId: 'explorer',
    title: 'المستكشف',
    description: 'جرب 3 فئات مختلفة من البرامج',
    icon: '🗺️',
    category: 'participation',
    requirements: {
      type: 'categories_mastered',
      value: 3,
      description: '3 فئات مختلفة'
    },
    rewards: {
      points: 400,
      badge: 'silver'
    },
    order: 7
  },
  {
    achievementId: 'perfectionist',
    title: 'الكمالي',
    description: 'أكمل برنامج بنسبة 100%',
    icon: '💎',
    category: 'special',
    requirements: {
      type: 'custom',
      value: 1,
      description: 'إكمال كامل لبرنامج'
    },
    rewards: {
      points: 250,
      badge: 'diamond'
    },
    order: 8
  }
];

const seedAchievements = async () => {
  try {
    await connectDB();
    console.log('🌱 بدء إضافة الإنجازات...');

    // Clear existing achievements
    await Achievement.deleteMany({});
    console.log('✅ تم حذف الإنجازات الموجودة');

    // Insert new achievements
    await Achievement.insertMany(achievements);
    console.log(`✅ تم إضافة ${achievements.length} إنجاز بنجاح`);

    console.log('🎉 تم إكمال إضافة الإنجازات!');
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في إضافة الإنجازات:', error);
    process.exit(1);
  }
};

// Run if called directly
if (require.main === module) {
  seedAchievements();
}

export default seedAchievements;
