
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import PageLayout from '../styles/PageLayout';

// Styled Components
const DashboardContainer = styled(PageLayout)`
  min-height: 100vh;
  background: linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%);
  padding: 0 0 2rem 0;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const WelcomeSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0 2rem 0;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(30, 58, 138, 0.1);
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const UserAvatar = styled.div<{ hasImage?: boolean }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${props => props.hasImage 
    ? 'none' 
    : 'linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(30, 58, 138, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const WelcomeContent = styled.div`
  flex: 1;
`;

const WelcomeTitle = styled.h1`
  font-size: 2.5rem;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6B7280;
  margin-bottom: 1rem;
  font-family: 'Tajawal', sans-serif;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const UserName = styled.span`
  font-size: 1.1rem;
  color: #1E3A8A;
  font-weight: 600;
  font-family: 'Cairo', sans-serif;
`;

const UserEmail = styled.span`
  font-size: 0.9rem;
  color: #6B7280;
  font-family: 'Tajawal', sans-serif;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(30, 58, 138, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(30, 58, 138, 0.2);
    border-color: rgba(30, 58, 138, 0.3);
  }
`;

const StatIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
  font-family: 'Cairo', sans-serif;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #6B7280;
  font-weight: 600;
  font-family: 'Tajawal', sans-serif;
`;

const Section = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%);
  border-radius: 25px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(30, 58, 138, 0.1);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(30, 58, 138, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1E3A8A 0%, #E11D48 100%);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #1E3A8A;
  margin-bottom: 2rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Cairo', sans-serif;
  position: relative;
  
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #1E3A8A 0%, transparent 100%);
    margin-right: 1rem;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProgramCard = styled(motion.div)`
  background: linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const ProgramTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProgramProgress = styled.div`
  margin: 1.5rem 0;
`;

const ProgressBar = styled.div`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  height: 12px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ProgressFill = styled.div<{ progress: number }>`
  background: linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%);
  height: 100%;
  width: ${props => props.progress}%;
  border-radius: 15px;
  transition: width 0.5s ease;
  box-shadow: 0 2px 8px rgba(251, 191, 36, 0.4);
`;

const ProgressText = styled.div`
  font-size: 1rem;
  margin-top: 0.75rem;
  opacity: 0.95;
  font-weight: 600;
  font-family: 'Tajawal', sans-serif;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const AchievementCard = styled(motion.div)<{ earned: boolean }>`
  background: ${props => props.earned 
    ? 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)' 
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'};
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  border: 2px solid ${props => props.earned ? '#F59E0B' : 'rgba(30, 58, 138, 0.2)'};
  opacity: ${props => props.earned ? 1 : 0.7};
  box-shadow: ${props => props.earned 
    ? '0 15px 35px rgba(251, 191, 36, 0.3)' 
    : '0 10px 25px rgba(30, 58, 138, 0.1)'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.earned 
      ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%)'
      : 'linear-gradient(45deg, rgba(30, 58, 138, 0.1) 0%, transparent 100%)'};
    pointer-events: none;
  }
`;

const AchievementIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
`;

const AchievementTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #1E3A8A;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
`;

const AchievementDesc = styled.p`
  font-size: 0.95rem;
  color: #1E3A8A;
  opacity: 0.9;
  font-family: 'Tajawal', sans-serif;
  line-height: 1.5;
`;

const RecommendationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RecommendationCard = styled(motion.div)`
  background: linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const RecommendationInfo = styled.div`
  flex: 1;
  z-index: 1;
`;

const RecommendationTitle = styled.h4`
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const RecommendationReason = styled.p`
  font-size: 1rem;
  opacity: 0.95;
  font-family: 'Tajawal', sans-serif;
  line-height: 1.5;
`;

const EnrollButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  z-index: 1;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
  color: white;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #6B7280;
  font-size: 1.2rem;
  font-family: 'Tajawal', sans-serif;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  border-radius: 20px;
  border: 2px dashed rgba(30, 58, 138, 0.2);
  margin: 2rem 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const QuickActionButton = styled(motion.button)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
  border: 2px solid rgba(30, 58, 138, 0.1);
  padding: 2rem;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: #1E3A8A;
  box-shadow: 0 15px 35px rgba(30, 58, 138, 0.1);
  font-family: 'Cairo', sans-serif;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 25px 50px rgba(30, 58, 138, 0.2);
    border-color: rgba(30, 58, 138, 0.3);
    background: linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 100%);
  }
`;

const QuickActionIcon = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
`;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // const [selectedOpportunities, setSelectedOpportunities] = useState<any[]>([]);

  // Debug: Log user data
  console.log('User data:', user);

  // Smart default data based on user status
  const getUserStatus = () => {
    const hasEnrolledPrograms = dashboardData?.userProgress?.enrolledPrograms?.length > 0;
    const hasSelectedOpportunities = dashboardData?.userProgress?.selectedOpportunities?.length > 0;
    
    if (hasEnrolledPrograms && hasSelectedOpportunities) {
      return 'active_user_with_opportunities';
    } else if (hasEnrolledPrograms) {
      return 'active_user';
    } else if (hasSelectedOpportunities) {
      return 'opportunity_selected';
    } else {
      return 'new_user';
    }
  };

  const userStatus = getUserStatus();

  const getDefaultStats = () => {
    switch (userStatus) {
      case 'active_user_with_opportunities':
        return {
          totalPrograms: 3,
          completedPrograms: 1,
          totalOpportunities: 2,
          appliedOpportunities: 1,
          totalAchievements: 3,
          currentStreak: 7,
          totalHoursSpent: 32,
          completionRate: 75
        };
      case 'active_user':
        return {
          totalPrograms: 3,
          completedPrograms: 1,
          totalOpportunities: 0,
          appliedOpportunities: 0,
          totalAchievements: 2,
          currentStreak: 5,
          totalHoursSpent: 24,
          completionRate: 75
        };
      case 'opportunity_selected':
        return {
          totalPrograms: 0,
          completedPrograms: 0,
          totalOpportunities: 2,
          appliedOpportunities: 0,
          totalAchievements: 1,
          currentStreak: 1,
          totalHoursSpent: 0,
          completionRate: 0
        };
      default:
        return {
          totalPrograms: 0,
          completedPrograms: 0,
          totalOpportunities: 0,
          appliedOpportunities: 0,
          totalAchievements: 0,
          currentStreak: 0,
          totalHoursSpent: 0,
          completionRate: 0
        };
    }
  };

  const getWelcomeMessage = () => {
    switch (userStatus) {
      case 'active_user_with_opportunities':
        return {
          title: `مرحباً ${user?.firstName || user?.name || 'عزيزي المستخدم'}! 🎉`,
          subtitle: `لديك ${dashboardData?.userProgress?.enrolledPrograms?.length || 0} برنامج نشط و ${dashboardData?.userProgress?.selectedOpportunities?.length || 0} فرصة مختارة`,
          status: 'نشط ومختار'
        };
      case 'active_user':
        return {
          title: `مرحباً ${user?.firstName || user?.name || 'عزيزي المستخدم'}! 👋`,
          subtitle: `لديك ${dashboardData?.userProgress?.enrolledPrograms?.length || 0} برنامج نشط`,
          status: 'نشط'
        };
      case 'opportunity_selected':
        return {
          title: `مرحباً ${user?.firstName || user?.name || 'عزيزي المستخدم'}! 🎯`,
          subtitle: `لديك ${dashboardData?.userProgress?.selectedOpportunities?.length || 0} فرصة مختارة`,
          status: 'مختار'
        };
      default:
        return {
          title: `مرحباً ${user?.firstName || user?.name || 'عزيزي المستخدم'}! 🚀`,
          subtitle: 'اختر برامجك وفرصك الآن وابدأ بالتعلم!',
          status: ''
        };
    }
  };

  const defaultStats = getDefaultStats();
  const welcomeMessage = getWelcomeMessage();

  const defaultAchievements = [
    {
      achievementId: 'first_login',
      title: 'أول خطوة',
      description: 'أول تسجيل دخول للمنصة',
      icon: '🎉'
    },
    {
      achievementId: 'profile_complete',
      title: 'الملف الشخصي',
      description: 'إكمال الملف الشخصي',
      icon: '👤'
    },
    {
      achievementId: 'first_course',
      title: 'أول دورة',
      description: 'إكمال أول دورة تدريبية',
      icon: '📚'
    },
    {
      achievementId: 'streak_5',
      title: 'مثابر',
      description: '5 أيام متتالية من التعلم',
      icon: '🔥'
    },
    {
      achievementId: 'perfect_score',
      title: 'متفوق',
      description: 'حصول على درجة ممتازة',
      icon: '⭐'
    }
  ];

  const defaultRecommendations = [
    {
      programId: 'leadership_101',
      type: 'program',
      reason: 'بناءً على اهتمامك بالقيادة'
    },
    {
      opportunityId: 'tech_internship_1',
      type: 'opportunity',
      reason: 'مناسب لمجال اهتمامك'
    },
    {
      programId: 'entrepreneurship_basics',
      type: 'program',
      reason: 'مناسب لمستواك الحالي'
    },
    {
      opportunityId: 'scholarship_1',
      type: 'opportunity',
      reason: 'فرصة ممتازة للتعلم'
    }
  ];

  const defaultSelectedOpportunities = [
    {
      opportunityId: 'tech_internship_1',
      opportunityTitle: 'فرصة تدريب في شركة تقنية',
      selectionDate: new Date(),
      status: 'selected',
      notes: 'أريد التقديم لهذه الفرصة'
    },
    {
      opportunityId: 'leadership_scholarship_1',
      opportunityTitle: 'منحة دراسية للقيادة',
      selectionDate: new Date(),
      status: 'applied',
      notes: 'منحة ممتازة للقيادة'
    }
  ];

  // const defaultEnrolledPrograms = [
  //   {
  //     programId: 'intro_program',
  //     programTitle: 'البرنامج التمهيدي',
  //     completionPercentage: 60,
  //     status: 'in_progress'
  //   },
  //   {
  //     programId: 'leadership_basics',
  //     programTitle: 'أساسيات القيادة',
  //     completionPercentage: 85,
  //     status: 'in_progress'
  //   },
  //   {
  //     programId: 'communication_skills',
  //     programTitle: 'مهارات التواصل',
  //     completionPercentage: 100,
  //     status: 'completed'
  //   }
  // ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Debug: Log selected opportunities when dashboardData changes
  useEffect(() => {
    if (dashboardData?.userProgress?.selectedOpportunities) {
      console.log('✅ Dashboard loaded with', dashboardData.userProgress.selectedOpportunities.length, 'selected opportunities');
    } else {
      console.log('ℹ️ No selected opportunities found');
    }
  }, [dashboardData]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('haymanh_token');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      console.log('🔄 Fetching dashboard data...');
      
      if (!token) {
        console.error('❌ No token found in localStorage');
        setLoading(false);
        return;
      }
      
      // Decode token to see user ID
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('👤 User ID:', payload.userId);
      } catch (e) {
        console.error('❌ Invalid token format');
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${apiUrl}/api/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Dashboard data loaded successfully');
        
        // استخدام data.data بدلاً من data مباشرة
        setDashboardData(data.data || data);
      } else {
        const errorData = await response.json();
        console.error('❌ Dashboard error:', errorData.message);
        
        // إذا كان الخطأ 401، فقد انتهت صلاحية الرمز
        if (response.status === 401) {
          console.error('🔒 Authentication failed - token expired');
          localStorage.removeItem('haymanh_token');
          localStorage.removeItem('haymanh_user');
        }
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (programId: string) => {
    try {
      const token = localStorage.getItem('haymanh_token');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/dashboard/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ programId })
      });

      if (response.ok) {
        await fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error enrolling in program:', error);
    }
  };

  const handleSelectOpportunity = async (opportunityId: string, notes?: string) => {
    try {
      const token = localStorage.getItem('haymanh_token');
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/dashboard/select-opportunity`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ opportunityId, notes })
      });

      if (response.ok) {
        await fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error selecting opportunity:', error);
    }
  };

  // const handleRemoveOpportunity = async (opportunityId: string) => {
  //   try {
  //     const token = localStorage.getItem('haymanh_token');
  //     const response = await fetch(`http://localhost:5001/api/dashboard/selected-opportunities/${opportunityId}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     if (response.ok) {
  //       await fetchDashboardData(); // Refresh data
  //     }
  //   } catch (error) {
  //     console.error('Error removing opportunity:', error);
  //   }
  // };

  if (loading) {
  return (
    <DashboardContainer>
        <LoadingSpinner>جاري تحميل الداشبورد...</LoadingSpinner>
      </DashboardContainer>
    );
  }

  // Always use default data if no API data
  const finalStats = dashboardData?.stats || defaultStats;
  const finalAchievements = dashboardData?.achievements || defaultAchievements;
  const finalRecommendations = dashboardData?.recommendations || defaultRecommendations;
  const finalUserProgress = {
    ...dashboardData?.userProgress,
    enrolledPrograms: dashboardData?.userProgress?.enrolledPrograms || [],
    selectedOpportunities: dashboardData?.userProgress?.selectedOpportunities || defaultSelectedOpportunities
  };



  return (
    <DashboardContainer>
        <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Welcome Section */}
          <WelcomeSection variants={itemVariants}>
            <UserAvatar hasImage={!!user?.avatar}>
              {user?.avatar ? (
                <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
              ) : (
                user?.firstName?.charAt(0) || '👤'
              )}
            </UserAvatar>
                        <WelcomeContent>
              <WelcomeTitle>
                {welcomeMessage.title}
              </WelcomeTitle>
              <WelcomeSubtitle>
                {welcomeMessage.subtitle}
              </WelcomeSubtitle>
            <UserInfo>
                <UserName>{user?.firstName || user?.name || 'المستخدم'} {user?.lastName || ''}</UserName>
                <span>•</span>
                <UserEmail>{user?.email || 'البريد الإلكتروني'}</UserEmail>

            </UserInfo>
            </WelcomeContent>
          </WelcomeSection>

          {/* Quick Actions */}
          <QuickActions>
            <QuickActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/opportunity-selector'}
            >
              <QuickActionIcon>💼</QuickActionIcon>
              <span>اختر الفرص والبرامج</span>
            </QuickActionButton>
            <QuickActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QuickActionIcon>📚</QuickActionIcon>
              <span>استكشف البرامج</span>
            </QuickActionButton>
            <QuickActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QuickActionIcon>🎯</QuickActionIcon>
              <span>حدد أهدافك</span>
            </QuickActionButton>
            <QuickActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <QuickActionIcon>📊</QuickActionIcon>
              <span>تقرير الأداء</span>
            </QuickActionButton>
          </QuickActions>

          {/* Stats Section */}
          <Section variants={itemVariants}>
            <SectionTitle>📊 إحصائياتك</SectionTitle>
            <StatsGrid>
              <StatCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <StatIcon>📚</StatIcon>
                <StatNumber>{finalStats.totalPrograms}</StatNumber>
                <StatLabel>البرامج المسجلة</StatLabel>
              </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>✅</StatIcon>
                  <StatNumber>{finalStats.completedPrograms}</StatNumber>
                  <StatLabel>البرامج المكتملة</StatLabel>
                </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>🏆</StatIcon>
                  <StatNumber>{finalStats.totalAchievements}</StatNumber>
                  <StatLabel>الإنجازات</StatLabel>
                </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>🔥</StatIcon>
                  <StatNumber>{finalStats.currentStreak}</StatNumber>
                  <StatLabel>أيام متتالية</StatLabel>
                </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>⏰</StatIcon>
                  <StatNumber>{finalStats.totalHoursSpent}</StatNumber>
                  <StatLabel>ساعات التعلم</StatLabel>
                </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>🎯</StatIcon>
                  <StatNumber>{finalStats.completionRate}%</StatNumber>
                  <StatLabel>معدل الإنجاز</StatLabel>
                </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>💼</StatIcon>
                  <StatNumber>{finalStats.totalOpportunities || 0}</StatNumber>
                  <StatLabel>الفرص المختارة</StatLabel>
                </StatCard>
                
                <StatCard
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <StatIcon>📝</StatIcon>
                  <StatNumber>{finalStats.appliedOpportunities || 0}</StatNumber>
                  <StatLabel>الطلبات المقدمة</StatLabel>
                </StatCard>
            </StatsGrid>
          </Section>

          {/* Enrolled Programs */}
          <Section variants={itemVariants}>
            <SectionTitle>📖 برامجك النشطة</SectionTitle>
            {finalUserProgress.enrolledPrograms.length > 0 ? (
              <ProgramsGrid>
                {finalUserProgress.enrolledPrograms.map((program: any, index: number) => (
                  <ProgramCard
                    key={program.programId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ProgramTitle>{program.programTitle}</ProgramTitle>
                    <ProgramProgress>
                          <ProgressBar>
                        <ProgressFill progress={program.completionPercentage} />
                          </ProgressBar>
                      <ProgressText>
                        {program.completionPercentage}% مكتمل
                      </ProgressText>
                    </ProgramProgress>
                  </ProgramCard>
                ))}
              </ProgramsGrid>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '15px',
                border: '2px dashed #cbd5e1',
                margin: '1rem 0'
              }}>
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '1.5rem'
                }}>📚</div>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  color: '#1e293b',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>لا يوجد برامج نشطة حاليآ</h3>
                <p style={{ 
                  marginBottom: '1.5rem', 
                  color: '#64748b',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>ابدأ باختيار برامجك الأولى وابدأ رحلة التعلم!</p>
              </div>
            )}
          </Section>

          {/* Selected Opportunities */}
          <Section variants={itemVariants}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <SectionTitle>💼 فرصك المختارة</SectionTitle>
              <button
                onClick={fetchDashboardData}
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🔄 تحديث
              </button>
            </div>
            {dashboardData?.userProgress?.selectedOpportunities?.length > 0 ? (
              <ProgramsGrid>
                {dashboardData.userProgress.selectedOpportunities.map((opportunity: any, index: number) => (
                  <ProgramCard
                    key={opportunity.opportunityId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <ProgramTitle>
                      {opportunity.opportunityId?.title || 
                       opportunity.opportunityTitle || 
                       (typeof opportunity.opportunityId === 'string' ? 'فرصة مختارة' : 'فرصة غير محددة')}
                    </ProgramTitle>
                    <ProgramProgress>
                      <ProgressBar>
                        <ProgressFill progress={opportunity.status === 'applied' ? 50 : 0} />
                      </ProgressBar>
                      <ProgressText>
                        {opportunity.status === 'selected' ? 'مختارة' :
                         opportunity.status === 'applied' ? 'تم التقديم' :
                         opportunity.status === 'accepted' ? 'مقبولة' :
                         opportunity.status === 'rejected' ? 'مرفوضة' : 'ملغاة'}
                      </ProgressText>
                    </ProgramProgress>
                    <div style={{ 
                      marginTop: '1rem', 
                      fontSize: '0.9rem', 
                      opacity: 0.8,
                      color: '#64748b'
                    }}>
                      تاريخ الاختيار: {new Date(opportunity.selectionDate).toLocaleDateString('ar-SA')}
                    </div>
                    {opportunity.notes && (
                      <div style={{ 
                        marginTop: '0.5rem', 
                        fontSize: '0.9rem', 
                        opacity: 0.9,
                        fontStyle: 'italic',
                        color: '#64748b'
                      }}>
                        ملاحظة: {opportunity.notes}
                      </div>
                    )}
                  </ProgramCard>
                ))}
              </ProgramsGrid>
            ) : (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '15px',
                border: '2px dashed #cbd5e1',
                margin: '1rem 0'
              }}>
                <div style={{ 
                  fontSize: '4rem', 
                  marginBottom: '1.5rem'
                }}>💼</div>
                <h3 style={{ 
                  marginBottom: '1rem', 
                  color: '#1e293b',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>لا توجد فرص مختارة حالياً</h3>
                <p style={{ 
                  marginBottom: '1.5rem', 
                  color: '#64748b',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>🎯 ابدأ باختيار الفرص المناسبة لك من صفحة الفرص المتاحة!</p>
                <button
                  onClick={() => window.location.href = '/opportunities'}
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  تصفح الفرص المتاحة
                </button>
              </div>
            )}
          </Section>

          {/* Available Opportunities */}
          <Section variants={itemVariants}>
            <SectionTitle>🎯 الفرص المتاحة</SectionTitle>
            <ProgramsGrid>
              <ProgramCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProgramTitle>فرصة تدريب في شركة تقنية</ProgramTitle>
                <ProgramProgress>
                  <ProgressBar>
                    <ProgressFill progress={0} />
                  </ProgressBar>
                  <ProgressText>متاح للاختيار</ProgressText>
                </ProgramProgress>
                <div style={{ marginTop: '1rem' }}>
                  <EnrollButton
                    onClick={() => handleSelectOpportunity('tech-internship-1', 'أريد التقديم لهذه الفرصة')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    اختر الفرصة
                  </EnrollButton>
                </div>
              </ProgramCard>

              <ProgramCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProgramTitle>منحة دراسية للقيادة</ProgramTitle>
                <ProgramProgress>
                  <ProgressBar>
                    <ProgressFill progress={0} />
                  </ProgressBar>
                  <ProgressText>متاح للاختيار</ProgressText>
                </ProgramProgress>
                <div style={{ marginTop: '1rem' }}>
                  <EnrollButton
                    onClick={() => handleSelectOpportunity('leadership-scholarship-1', 'منحة ممتازة للقيادة')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    اختر الفرصة
                  </EnrollButton>
                </div>
              </ProgramCard>

              <ProgramCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProgramTitle>برنامج ريادة الأعمال</ProgramTitle>
                <ProgramProgress>
                  <ProgressBar>
                    <ProgressFill progress={0} />
                  </ProgressBar>
                  <ProgressText>متاح للاختيار</ProgressText>
                </ProgramProgress>
                <div style={{ marginTop: '1rem' }}>
                  <EnrollButton
                    onClick={() => handleSelectOpportunity('entrepreneurship-program-1', 'برنامج رائع لريادة الأعمال')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    اختر الفرصة
                  </EnrollButton>
                </div>
              </ProgramCard>
            </ProgramsGrid>
          </Section>

          {/* Achievements */}
          <Section variants={itemVariants}>
            <SectionTitle>🏆 إنجازاتك</SectionTitle>
            {finalAchievements && finalAchievements.length > 0 ? (
              <AchievementsGrid>
                {finalAchievements.map((achievement: any, index: number) => (
                  <AchievementCard
                    key={achievement.achievementId}
                    earned={true}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <AchievementIcon>{achievement.icon}</AchievementIcon>
                    <AchievementTitle>{achievement.title}</AchievementTitle>
                    <AchievementDesc>{achievement.description}</AchievementDesc>
                    </AchievementCard>
                ))}
              </AchievementsGrid>
                ) : (
                  <EmptyState>
                لا توجد إنجازات بعد. استمر في التعلم لكسب الإنجازات! 🎯
                  </EmptyState>
                )}
          </Section>

          {/* Recommendations */}
          {finalRecommendations && finalRecommendations.length > 0 && (
            <Section variants={itemVariants}>
              <SectionTitle>💡 توصيات لك</SectionTitle>
              <RecommendationsList>
                {finalRecommendations.map((rec: any, index: number) => (
                  <RecommendationCard
                    key={rec.programId || rec.opportunityId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <RecommendationInfo>
                      <RecommendationTitle>
                        {rec.type === 'program' ? 'برنامج مقترح' : 'فرصة مقترحة'}
                      </RecommendationTitle>
                      <RecommendationReason>{rec.reason}</RecommendationReason>
                    </RecommendationInfo>
                    <EnrollButton
                      onClick={() => {
                        if (rec.type === 'program') {
                          handleEnroll(rec.programId);
                        } else {
                          handleSelectOpportunity(rec.opportunityId);
                        }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {rec.type === 'program' ? 'سجل الآن' : 'اختر الفرصة'}
                    </EnrollButton>
                  </RecommendationCard>
                ))}
              </RecommendationsList>
            </Section>
          )}


        </motion.div>
        </Container>
    </DashboardContainer>
  );
};

export default Dashboard;
 

