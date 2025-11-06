import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Type definitions for styled components
interface FilterButtonProps {
  isActive: boolean;
}

interface OpportunityImageProps {
  type: string;
}

interface OpportunityTypeProps {
  type: string;
}

interface AddToSelectedButtonProps {
  isSelected: boolean;
}

interface MessageContainerProps {
  type: 'success' | 'error';
}

const OpportunitiesContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
  color: ${({ theme }) => theme.colors.textHighlight};
  font-weight: 600;
`;

const FilterSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const FilterButton = styled.button<FilterButtonProps>`
  background: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    max-width: 200px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const AdvancedFiltersButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const AdvancedFiltersContainer = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  margin: ${({ theme }) => theme.spacing.lg} auto;
  max-width: 800px;
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const AdvancedFiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterGroupLabel = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: white;
  color: ${({ theme }) => theme.colors.text};
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const OpportunitiesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const OpportunityCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  } 
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const OpportunityImage = styled.div<OpportunityImageProps>`
  height: 200px;
  background: ${({ theme, type }) => {
    switch (type) {
      case 'scholarship': return theme.colors.primary;
      case 'competition': return theme.colors.secondary;
      case 'volunteer': return theme.colors.accent;
      case 'internship': return '#FF6B6B';
      case 'conference': return '#4ECDC4';
      case 'initiative': return '#45B7D1';
      case 'research': return '#9B59B6';
      case 'startup': return '#E67E22';
      case 'job_fair': return '#E74C3C';
      case 'camp': return '#FF8C00';
      case 'hackathon': return '#9C27B0';
      case 'incubator': return '#2ECC71';
      default: return theme.colors.primary;
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.display};
`;

const OpportunityContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const OpportunityType = styled.span<OpportunityTypeProps>`
  background: ${({ theme, type }) => {
    switch (type) {
      case 'scholarship': return theme.colors.primary;
      case 'competition': return theme.colors.secondary;
      case 'volunteer': return theme.colors.accent;
      case 'internship': return '#FF6B6B';
      case 'conference': return '#4ECDC4';
      case 'initiative': return '#45B7D1';
      case 'research': return '#9B59B6';
      case 'startup': return '#E67E22';
      case 'camp': return '#FF8C00';
      case 'hackathon': return '#9C27B0';
      case 'incubator': return '#2ECC71';
      case 'job_fair': return '#E74C3C';
      default: return theme.colors.primary;
    }
  }};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const OpportunityTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const OpportunityDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const OpportunityButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const AddToSelectedButton = styled.button<AddToSelectedButtonProps>`
  background: ${({ theme, isSelected }) => 
    isSelected ? '#10B981' : '#F59E0B'};
  color: white;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &:hover {
    background: ${({ theme, isSelected }) => 
      isSelected ? '#059669' : '#D97706'};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const OpportunityDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const StatItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 500;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DetailRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  align-items: center;
  
  &:not(:first-child) {
    margin-top: ${({ theme }) => theme.spacing.sm};
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const DetailIcon = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const DetailText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const MessageContainer = styled(motion.div)<MessageContainerProps>`
  position: fixed;
  top: 100px;
  right: 20px;
  background: ${({ type }) => type === 'success' ? '#10B981' : '#EF4444'};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: 1000;
  font-weight: 600;
  max-width: 350px;
  border-left: 4px solid ${({ type }) => type === 'success' ? '#059669' : '#DC2626'};
`;

const Opportunities = () => {
  const { isAuthenticated } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');
  const [ageGroup, setAgeGroup] = useState('all');
  const [attendanceType, setAttendanceType] = useState('all');
  const [costType, setCostType] = useState('all');
  const [durationType, setDurationType] = useState('all');
  const [locationType, setLocationType] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedOpportunities, setSelectedOpportunities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [apiOpportunities, setApiOpportunities] = useState<any[]>([]);

  // جلب الفرص من API
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoadingOpportunities(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        const response = await fetch(`${apiUrl}/api/opportunities`);
        if (response.ok) {
          const data = await response.json();
          console.log('Opportunities data:', data.data.opportunities);
          setApiOpportunities(data.data.opportunities || []);
        }
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setIsLoadingOpportunities(false);
      }
    };
    
    fetchOpportunities();
  }, []);

  // مراقبة حالة المصادقة
  useEffect(() => {
    if (isAuthenticated) {
      console.log('✅ User authenticated');
    }
  }, [isAuthenticated]);

  // جلب الفرص المختارة من الداشبورد
  useEffect(() => {
    const fetchSelectedOpportunities = async () => {
      if (!isAuthenticated) return;
      
      try {
        const token = localStorage.getItem('haymanh_token');
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
            const response = await fetch(`${apiUrl}/api/dashboard`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const selected = new Set<string>();
          
          // استخدام data.data بدلاً من data مباشرة
          const dashboardData = data.data || data;
          
          if (dashboardData.userProgress?.selectedOpportunities) {
            dashboardData.userProgress.selectedOpportunities.forEach((opp: any) => {
              // opportunityId يمكن أن يكون string مباشرة أو object مع _id
              const oppId = typeof opp.opportunityId === 'string' 
                ? opp.opportunityId 
                : opp.opportunityId?._id;
              
                if (oppId && typeof oppId === 'string' && oppId.length === 24) {
                  selected.add(oppId);
              }
            });
          }
          
          setSelectedOpportunities(selected);
        }
      } catch (error) {
        console.error('Error fetching selected opportunities:', error);
      }
    };

    fetchSelectedOpportunities();
  }, [isAuthenticated]);

  const filters = [
    { id: 'all', label: 'جميع الفرص' },
    { id: 'scholarship', label: 'المنح الدراسية' },
    { id: 'competition', label: 'المسابقات والهاكاثونات' },
    { id: 'volunteer', label: 'الفرص التطوعية' },
    { id: 'internship', label: 'الوظائف التدريبية' },
    { id: 'conference', label: 'المؤتمرات والورش' },
    { id: 'initiative', label: 'المبادرات' },
    { id: 'research', label: 'فرص البحث' },
    { id: 'startup', label: 'دعم المشاريع والحاضنات' },
    { id: 'camp', label: 'المعسكرات' },
    { id: 'job_fair', label: 'معارض التوظيف' }
  ];

  const ageGroups = [
    { id: 'all', label: 'جميع الأعمار' },
    { id: 'students', label: 'طلاب' },
    { id: 'graduates', label: 'خريجين' },
    { id: 'professionals', label: 'محترفين' },
    { id: 'youth', label: 'شباب' }
  ];

  const attendanceTypes = [
    { id: 'all', label: 'جميع الأنواع' },
    { id: 'in-person', label: 'حضوري' },
    { id: 'online', label: 'عن بعد' },
    { id: 'hybrid', label: 'مختلط' }
  ];

  const costTypes = [
    { id: 'all', label: 'جميع التكاليف' },
    { id: 'free', label: 'مجاني' },
    { id: 'paid', label: 'مدفوع' },
    { id: 'scholarship', label: 'منحة' }
  ];

  const durationTypes = [
    { id: 'all', label: 'جميع المدد' },
    { id: 'short', label: 'قصيرة (أيام)' },
    { id: 'medium', label: 'متوسطة (أسابيع)' },
    { id: 'long', label: 'طويلة (أشهر)' },
    { id: 'ongoing', label: 'مستمر' }
  ];

  const locationTypes = [
    { id: 'all', label: 'جميع المواقع' },
    { id: 'riyadh', label: 'الرياض' },
    { id: 'jeddah', label: 'جدة' },
    { id: 'dammam', label: 'الدمام' },
    { id: 'online', label: 'أونلاين' },
    { id: 'nationwide', label: 'جميع أنحاء المملكة' }
  ];

  // إضافة الصور للفرص من API
  const apiOpportunitiesWithImages = apiOpportunities.map(opp => {
    // تحديد الصورة حسب نوع الفرصة
    let imagePath = '/images/معرض التوضيف.jpeg'; // صورة افتراضية
    
    // تحديد الصورة حسب عنوان الفرصة أو نوعها
    if (opp.title && opp.title.includes('هاكاثون الطاقة')) {
      imagePath = '/images/هاكاثون الطاقة (طاقتثون) 2025 .jpeg';
      // إضافة البيانات الحقيقية لهاكاثون الطاقة
      opp.duration = 'غير محدد';
      opp.location = { 
        address: 'السعودية',
        country: 'السعودية',
        type: 'onsite'
      };
      opp.benefits = ['ورش عمل تقنية', 'مسابقات تقنية', 'تطوير حلول ابتكارية'];
      opp.requirements = {
        skills: ['الابتكار', 'البحث العلمي', 'ريادة الأعمال'],
        education: ['أي مستوى تعليمي'],
        experience: ['لا توجد متطلبات مسبقة']
      };
      opp.tags = ['الطاقة المستدامة', 'الابتكار', 'ريادة الأعمال', 'البحث العلمي'];
      opp.description = 'مسابقة تجمع رواد الأعمال والباحثين لتطوير حلول ابتكارية تعزز استدامة الطاقة من خلال ورش عمل ومسابقات تقنية. تهدف المسابقة إلى دعم الابتكار في مجال الطاقة النظيفة والمستدامة، وتوفر فرصاً للتعلم والتطوير المهني في مجال التقنيات الخضراء والطاقة المتجددة.';
      opp.applicationUrl = 'https://taqa.org.sa/energy-hackathon';
      opp.price = 'مجاناً';
      opp.company = { name: 'جمعية الطاقة للتنمية المستدامة' };
      opp.organization = 'جمعية الطاقة للتنمية المستدامة';
      opp.targetAudience = 'الباحثين السعوديين، رواد الأعمال';
    } else if (opp.title && opp.title.includes('جائزة مايدة')) {
      imagePath = '/images/جائزج مايدة.jpeg';
      // إضافة البيانات الحقيقية لجائزة مايدة
      opp.duration = 'غير محدد';
      opp.location = { 
        address: 'جامعة دار الحكمة - جدة',
        country: 'السعودية',
        type: 'onsite'
      };
      opp.benefits = ['المركز الأول: 90,000 ريال', 'المركز الثاني: 70,000 ريال', 'المركز الثالث: 40,000 ريال'];
      opp.requirements = {
        skills: ['الابتكار', 'البحث العلمي', 'العمل الجماعي'],
        education: ['طالبة في مرحلة البكالوريوس والماجستير'],
        experience: ['لا توجد متطلبات مسبقة']
      };
      opp.tags = ['تحسين جودة الحياة لكبار السن والمكفوفين', 'إحياء اللغة العربية بحلول رقمية مبتكرة', 'تطوير كفاءة العاملين بقطاع السياحة الدينية'];
      opp.description = 'تحدي يجمع طالبات الجامعات لاستكشاف وتوظيف الابتكارات الجامعية. الفريق من 3 إلى 5 أعضاء. يحق التقديم لجميع طالبات الجامعات السعودية.';
      opp.applicationUrl = 'https://dar-alhekma.dyam.dev/';
      opp.applicationDeadline = '2025-09-25T00:00:00.000Z';
      opp.price = 'مجاناً';
      opp.company = { name: 'جائزة مايدة' };
      opp.organization = 'جائزة مايدة';
      opp.targetAudience = 'طالبات الجامعات السعودية';
    } else if (opp.title && opp.title.includes('معسكر بيدر')) {
      imagePath = '/images/معسكر بيدر.jpeg';
      // إضافة البيانات الحقيقية لمعسكر بيدر
      opp.duration = '28 سبتمبر – 2 أكتوبر 2025';
      opp.location = { 
        address: 'الرياض، المملكة العربية السعودية',
        country: 'السعودية',
        type: 'onsite'
      };
      opp.benefits = [
        'الدعم والتوجيه',
        'تطوير الأفكار', 
        'شبكة علاقات',
        'فرص استثمارية'
      ];
      opp.requirements = {
        skills: ['ريادة الأعمال', 'الابتكار', 'التطوير'],
        education: ['أي مستوى تعليمي'],
        experience: ['لا توجد متطلبات مسبقة']
      };
      opp.tags = [
        'التكنولوجيا الحيوية',
        'الرعاية الصحية',
        'الصحة الرقمية', 
        'المسار العام'
      ];
      opp.description = 'في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بَيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح.';
      opp.applicationUrl = 'https://healthes.sa/معسكر-بيدر/';
      opp.applicationDeadline = '2025-09-18T00:00:00.000Z';
      opp.startDate = '2025-09-28T00:00:00.000Z';
      opp.price = 'مجاناً';
      opp.company = { name: 'بيدر' };
      opp.organization = 'بيدر';
      opp.targetAudience = 'رواد الأعمال، الشركات الناشئة، المتخصصون والمبتكرون';
    } else if (opp.title && opp.title.includes('برنامج ريادة الأعمال لتطوير الألعاب')) {
      imagePath = '/images/برنامج تطوير الالعاب في اليابان.jpeg';
      // إضافة البيانات الحقيقية لبرنامج تطوير الألعاب
      opp.duration = '3 أسابيع - اليابان';
      opp.location = { address: 'اليابان' };
      opp.price = 'مجاناً';
      opp.benefits = [
        'رفع المهارات العملية لمطوري الألعاب', 
        'فرص للتواصل وبناء شبكة علاقات', 
        'دعم لاحق عبر GAME BACA',
        'تجربة تدريبية في اليابان',
        'شهادات معتمدة'
      ];
      opp.requirements = {
        skills: ['البرمجة', 'تطوير الألعاب', 'ريادة الأعمال'],
        education: ['بكالوريوس كحد أدنى'],
        experience: ['إجادة اللغة الإنجليزية', 'جواز سفر ساري المفعول']
      };
      opp.tags = ['تطوير الألعاب', 'اليابان', 'ريادة الأعمال', 'الأكاديمية السعودية الرقمية'];
      opp.description = '🚀 فرصة ذهبية لعشاق تطوير الألعاب! أعلنت الأكاديمية السعودية الرقمية SDA عن إطلاق: ✨ برنامج ريادة الأعمال لتطوير الألعاب – في اليابان 🇯🇵✨ برنامج مكثف يهدف إلى تطوير قدرات مطوري الألعاب السعوديين عبر تجربة تدريبية متكاملة في اليابان، لتمكينهم من المنافسة في السوقين المحلي والدولي.';
      opp.applicationUrl = 'http://sda.edu.sa/ar/program/398';
      opp.language = 'الإنجليزية';
      opp.targetAudience = 'مطوري الألعاب السعوديين، رواد الأعمال، المطورين';
    } else if (opp.title && opp.title.includes('Intersec Saudi Arabia')) {
      imagePath = '/images/Intersec Saudi Arabia 2025.jpeg';
      // إضافة البيانات الحقيقية لمؤتمر Intersec
      opp.duration = '29 سبتمبر إلى 1 أكتوبر 2025';
      opp.location = { 
        address: 'مركز الرياض الدولي للمؤتمرات والمعارض (RICEC)، الرياض',
        country: 'السعودية',
        type: 'onsite'
      };
      opp.benefits = [
        'التواصل مع أكثر من 370 عارض من 35 دولة',
        'مؤتمرات معتمدة من CPD',
        'استكشاف أحدث الابتكارات في الأمن والسلامة',
        'فرص للتواصل مع قادة الصناعة',
        'ورش عمل متخصصة',
        'شهادات معتمدة'
      ];
      opp.requirements = {
        skills: ['الأمن والسلامة', 'الأمن السيبراني', 'الحماية من الحرائق'],
        education: ['أي مستوى تعليمي'],
        experience: ['اهتمام بمجال الأمن والسلامة']
      };
      opp.tags = [
        'الأمن التجاري والمحيطي',
        'الأمن الداخلي والشرطة', 
        'الأمن السيبراني',
        'الحرائق والإنقاذ',
        'السلامة والصحة'
      ];
      opp.description = 'انطلق في عالم الابتكار الأمني مع Intersec Saudi Arabia 2025! المعرض والمؤتمر الرائد في المملكة لاستكشاف أحدث الحلول في مجالات الأمن والسلامة.';
      opp.applicationUrl = 'https://intersec-ksa.ae.messefrankfurt.com/ksa/en.html';
      opp.price = 'مجاناً';
      opp.company = { name: 'Intersec' };
      opp.organization = 'Intersec';
      opp.targetAudience = 'قادة الصناعة، الخبراء، المسؤولين الحكوميين';
    } else if (opp.title && opp.title.includes('حاضنة الذكاء الاصطناعي')) {
      imagePath = '/images/حاضنة الذكاء الاصطناعي.jpeg';
      // إضافة البيانات الحقيقية لحاضنة الذكاء الاصطناعي
      opp.duration = 'غير محدد';
      opp.location = { 
        address: 'منشآت مركز الابتكار – الرياض / الخبر',
        country: 'السعودية',
        type: 'onsite'
      };
     opp.benefits = [
       'تمويل المشاريع',
       'استشارات تقنية',
       'شبكة علاقات',
       'دعم تطوير الأفكار',
       'مساحة عمل مجانية',
       'تدريب متخصص في الذكاء الاصطناعي',
       'فرص استثمارية',
       'دعم تسويقي',
       'برامج إرشادية',
       'ورش عمل متخصصة',
       'دعم تقني متقدم'
     ];
      opp.requirements = {
        skills: ['الذكاء الاصطناعي', 'البرمجة', 'ريادة الأعمال'],
        education: ['أي مستوى تعليمي'],
        experience: ['فكرة مشروع في الذكاء الاصطناعي']
      };
      opp.tags = [
        'الذكاء الاصطناعي',
        'الحاضنة',
        'التمويل',
        'الابتكار'
      ];
      opp.description = 'حاضنة متخصصة في دعم مشاريع الذكاء الاصطناعي للمبدعين من عمر 15 وفوق، توفر الدعم التقني والاستشارات والتمويل.';
      opp.applicationUrl = 'https://innovationcenter.monshaat.gov.sa/incubation-form';
      opp.applicationDeadline = '2025-10-01T00:00:00.000Z';
      opp.price = 'مجاناً';
      opp.company = { name: 'منشآت' };
      opp.organization = 'منشآت';
      opp.targetAudience = 'المبدعين من عمر 15 وفوق، رواد الأعمال، المطورين، الباحثين، الطلاب';
    } else if (opp.title && opp.title.includes('برنامج موهبة للالتحاق بالجامعات المرموقة')) {
      imagePath = '/images/برنامج موهبة التميز.jpeg';
      // إضافة البيانات الحقيقية لبرنامج موهبة التميز
      opp.duration = 'غير محدد';
      opp.location = { address: 'غير محدد' };
      opp.benefits = [
        'تأهيل للجامعات الأمريكية المرموقة',
        'تدريب متكامل',
        'دعم أكاديمي',
        'إعداد للاختبارات الدولية',
        'متابعة شخصية'
      ];
      opp.requirements = {
        skills: ['الرياضيات', 'العلوم', 'الحاسب الآلي'],
        education: ['الصف الثاني ثانوي'],
        experience: ['نسبة 90% كحد أدنى', 'اختبار SAT 1000+ أو TOEFL iBT 80 أو IELTS 6.5']
      };
      opp.tags = ['موهبة', 'التميز', 'الجامعات الأمريكية', 'التدريب'];
      opp.description = 'برنامج تدريبي متكامل لتأهيل وإعداد أفضل الطلبة الراغبين في الدراسة في الجامعات الأمريكية المرموقة المصنفة من ضمن أفضل 50 جامعة على مستوى العالم.';
      opp.applicationUrl = 'https://www.mawhiba.sa/discover-mawhiba/programs/mawhiba-program-for-admission-to-prestigious-universities/mawhiba-program-for-admission-to-prestigious-universities-excellence/';
      opp.price = 'مساهمة مالية بعد القبول';
      opp.company = { name: 'موهبة' };
      opp.organization = 'موهبة';
      opp.targetAudience = 'طلبة الصف الثاني ثانوي';
    } else if (opp.title && opp.title.includes('ماراثون الأفكار')) {
      imagePath = '/images/ماراثون الافكار ايداثون.jpeg';
      // إضافة البيانات الحقيقية لماراثون الأفكار أيدياثون
      opp.duration = 'غير محدد';
      opp.location = { 
        address: 'منطقة جازان',
        country: 'السعودية',
        type: 'onsite'
      };
      opp.benefits = [
        'المركز الأول: 10,000 ريال',
        'المركز الثاني: 7,000 ريال',
        'المركز الثالث: 5,000 ريال',
        'تطوير المشاريع المجتمعية',
        'دعم وتوجيه'
      ];
      opp.requirements = {
        skills: ['ريادة الأعمال', 'المشاريع المجتمعية'],
        education: ['أي مستوى تعليمي'],
        experience: ['سكان محافظات منطقة جازان', 'قادر على تكوين فريق عمل']
      };
      opp.tags = ['ماراثون', 'الأفكار', 'جازان', 'المشاريع المجتمعية'];
      opp.description = 'ماراثون الأفكار أيدياثون 2025 - مسابقة للمشاريع المجتمعية في منطقة جازان تستهدف المبدعين من عمر 15-35 سنة.';
      opp.applicationUrl = 'https://incubatorbedar.org/config.php';
      opp.applicationDeadline = '2025-09-15T00:00:00.000Z';
      opp.price = 'مجاناً';
      opp.company = { name: 'بيدر' };
      opp.organization = 'بيدر';
      opp.targetAudience = 'ذكور وإناث من 15-35 سنة';
    } else if (opp.title && opp.title.includes('معرض التوظيف')) {
      imagePath = '/images/معرض التوضيف.jpeg';
      // إضافة البيانات الحقيقية لمعرض التوظيف
      opp.duration = 'يوم واحد';
      opp.location = { 
        address: 'مركز المعارض بالجامعة مبنى (54)',
        country: 'السعودية',
        type: 'onsite'
      };
      opp.benefits = [
        'فرص وظيفية متنوعة',
        'التواصل المباشر مع الشركات',
        'ورش عمل للتطوير المهني',
        'استشارات مهنية',
        'شبكة علاقات مهنية'
      ];
      opp.requirements = {
        skills: ['أي تخصص'],
        education: ['بكالوريوس أو ماجستير'],
        experience: ['خريجين أو طلاب في السنة الأخيرة']
      };
      opp.tags = ['توظيف', 'معرض', 'جامعة الملك فهد', 'وظائف'];
      opp.description = 'تنظم جامعة الملك فهد للبترول والمعادن معرض التوظيف 2025 تحت رعاية سعادة رئيس الجامعة الدكتور / محمد بن محسن السقاف.\n\nنفتح الآفاق، ونبني المستقبل.';
      opp.applicationUrl = 'https://events.kfupm.edu.sa/event/258/';
      opp.applicationDeadline = '2025-09-10T00:00:00.000Z';
      opp.price = 'مجاناً';
      opp.company = { name: 'جامعة الملك فهد للبترول والمعادن' };
      opp.organization = 'جامعة الملك فهد للبترول والمعادن';
      opp.targetAudience = 'الخريجين والطلاب في السنة الأخيرة';
    } else if (opp.type === 'job') imagePath = '/images/معرض التوضيف.jpeg';
    else if (opp.type === 'scholarship') imagePath = '/images/برنامج موهبة التميز.jpeg';
    else if (opp.type === 'competition') imagePath = '/images/جائزج مايدة.jpeg'; // صورة افتراضية للمسابقات
    else if (opp.type === 'hackathon') imagePath = '/images/هاكاثون الطاقة (طاقتثون) 2025 .jpeg';
    else if (opp.type === 'internship') imagePath = '/images/برنامج تطوير الالعاب في اليابان.jpeg';
    else if (opp.type === 'conference') imagePath = '/images/Intersec Saudi Arabia 2025.jpeg';
    else if (opp.type === 'initiative') imagePath = '/images/حاضنة الذكاء الاصطناعي.jpeg';
    else if (opp.type === 'research') imagePath = '/images/البحث العلمي تطبيقات الذكاء الاصطناعي.jpeg';
    else if (opp.type === 'startup') imagePath = '/images/حاضنة الذكاء الاصطناعي.jpeg';
    else if (opp.type === 'incubator') imagePath = '/images/حاضنة الذكاء الاصطناعي.jpeg';
    else if (opp.type === 'camp') imagePath = '/images/معسكر بيدر.jpeg';
    else if (opp.type === 'job_fair') imagePath = '/images/معرض التوضيف.jpeg';
    
    return {
      ...opp,
      image: imagePath
    };
  });

  // استخدام الفرص من API فقط (بدون تكرار)
  const allOpportunities = apiOpportunitiesWithImages;

  // تطبيق جميع الفلاتر
  const filteredOpportunities = allOpportunities.filter(opp => {
    let typeMatch;
    if (activeFilter === 'all') {
      typeMatch = true;
    } else if (activeFilter === 'competition') {
      typeMatch = opp.type === 'competition' || opp.type === 'hackathon';
    } else if (activeFilter === 'startup') {
      typeMatch = opp.type === 'startup' || opp.type === 'incubator';
    } else if (activeFilter === 'conference') {
      typeMatch = opp.type === 'conference' || opp.type === 'job_fair';
    } else {
      typeMatch = opp.type === activeFilter;
    }
    
    // تطبيق الفلاتر المتقدمة فقط إذا كانت الخصائص موجودة
    const ageMatch = ageGroup === 'all' || !opp.ageGroup || opp.ageGroup === ageGroup;
    const attendanceMatch = attendanceType === 'all' || !opp.attendanceType || opp.attendanceType === attendanceType;
    const costMatch = costType === 'all' || !opp.costType || opp.costType === costType;
    const durationMatch = durationType === 'all' || !opp.durationType || opp.durationType === durationType;
    const locationMatch = locationType === 'all' || !opp.locationType || opp.locationType === locationType;
    
    return typeMatch && ageMatch && attendanceMatch && costMatch && durationMatch && locationMatch;
  });

  const clearAllFilters = () => {
    setActiveFilter('all');
    setAgeGroup('all');
    setAttendanceType('all');
    setCostType('all');
    setDurationType('all');
    setLocationType('all');
  };

  // const getActiveFiltersCount = () => {
  //   let count = 0;
  //   if (activeFilter !== 'all') count++;
  //   if (ageGroup !== 'all') count++;
  //   if (attendanceType !== 'all') count++;
  //   if (costType !== 'all') count++;
  //   if (durationType !== 'all') count++;
  //   if (locationType !== 'all') count++;
  //   return count;
  // };

  const handleAddToSelected = async (opportunityId: string) => {
    
    if (!isAuthenticated) {
      setMessage({ type: 'error', text: '🔒 يجب تسجيل الدخول أولاً لإضافة الفرص المختارة' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setLoading(opportunityId);
    try {
      const token = localStorage.getItem('haymanh_token');
      
      // استخدام _id مباشرة من البيانات الحقيقية
      const backendId = opportunityId;
      
      // التحقق من حالة الفرصة الحالية
      const isCurrentlySelected = selectedOpportunities.has(opportunityId);
      
      let response;
      if (isCurrentlySelected) {
        // إزالة الفرصة من المختارة
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        response = await fetch(`${apiUrl}/api/dashboard/selected-opportunities/${backendId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // إضافة الفرصة للمختارة
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
        response = await fetch(`${apiUrl}/api/dashboard/select-opportunity`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ opportunityId: backendId })
        });
      }

      if (response.ok) {
        const responseData = await response.json();
        
        if (isCurrentlySelected) {
          setSelectedOpportunities(prev => {
            const newSet = new Set(prev);
            newSet.delete(opportunityId);
            return newSet;
          });
          setMessage({ type: 'success', text: '✅ تم إزالة الفرصة من القائمة المختارة!' });
        } else {
          setSelectedOpportunities(prev => new Set(Array.from(prev).concat(opportunityId)));
          setMessage({ type: 'success', text: '🎉 تم إضافة الفرصة للقائمة المختارة بنجاح! يمكنك مراجعتها في الداشبورد.' });
        }
        setTimeout(() => setMessage(null), 4000);
        
        // تحديث تلقائي للفرص المختارة
        setTimeout(async () => {
          try {
            const token = localStorage.getItem('haymanh_token');
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
            const response = await fetch(`${apiUrl}/api/dashboard`, {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              const data = await response.json();
              const selected = new Set<string>();
              
              // استخدام data.data بدلاً من data مباشرة
              const dashboardData = data.data || data;
              
              if (dashboardData.userProgress?.selectedOpportunities) {
                dashboardData.userProgress.selectedOpportunities.forEach((opp: any) => {
                  // opportunityId يمكن أن يكون string مباشرة أو object مع _id
                  const oppId = typeof opp.opportunityId === 'string' 
                    ? opp.opportunityId 
                    : opp.opportunityId?._id;
                  
                    if (oppId && typeof oppId === 'string' && oppId.length === 24) {
                      selected.add(oppId);
                  }
                });
              }
              
              setSelectedOpportunities(selected);
            }
          } catch (error) {
            console.error('Error refreshing selected opportunities:', error);
          }
        }, 1000);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: `❌ حدث خطأ في العملية: ${errorData.message || 'خطأ غير معروف'}` });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error: any) {
      console.error('Error adding opportunity:', error);
      setMessage({ type: 'error', text: `🌐 حدث خطأ في الاتصال بالخادم: ${error?.message || 'خطأ غير معروف'}` });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setLoading(null);
    }
  };

  return (
    <OpportunitiesContainer>
      {message && (
        <MessageContainer
          type={message.type}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <div style={{ marginBottom: message.type === 'success' && message.text.includes('الداشبورد') ? '10px' : '0' }}>
            {message.text}
          </div>
          {message.type === 'success' && message.text.includes('الداشبورد') && (
            <button
              onClick={() => window.location.href = '/dashboard'}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                width: '100%'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              عرض الداشبورد
            </button>
          )}
        </MessageContainer>
      )}
      
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            الفرص المتاحة
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            اكتشف مجموعة متنوعة من المنح الدراسية والمسابقات الأكاديمية
            والفرص التطوعية والوظائف التدريبية والمؤتمرات والمبادرات
          </HeroSubtitle>
        </div>
      </HeroSection>

      <StatsSection>
        <div className="container">
          <StatsGrid>
            <StatItem>
              <StatNumber>{filteredOpportunities.length}+</StatNumber>
              <StatLabel>فرصة متاحة</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>9</StatNumber>
              <StatLabel>نوع من الفرص</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>100000+</StatNumber>
              <StatLabel>مستفيد</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>95%</StatNumber>
              <StatLabel>معدل الرضا</StatLabel>
            </StatItem>
          </StatsGrid>
        </div>
      </StatsSection>

      <FilterSection>
        <div className="container">
          <FilterContainer>
            {filters.map((filter) => (
              <FilterButton
                key={filter.id}
                isActive={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </FilterButton>
            ))}
          </FilterContainer>
          
          <AdvancedFiltersButton onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            {showAdvancedFilters ? 'إخفاء الفلاتر' : 'فلاتر إضافية'}
          </AdvancedFiltersButton>
          
          {showAdvancedFilters && (
            <AdvancedFiltersContainer
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AdvancedFiltersGrid>
                <FilterGroup>
                  <FilterGroupLabel>الفئة العمرية</FilterGroupLabel>
                  <FilterSelect
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                  >
                    {ageGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>نوع الحضور</FilterGroupLabel>
                  <FilterSelect
                    value={attendanceType}
                    onChange={(e) => setAttendanceType(e.target.value)}
                  >
                    {attendanceTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>نوع التكلفة</FilterGroupLabel>
                  <FilterSelect
                    value={costType}
                    onChange={(e) => setCostType(e.target.value)}
                  >
                    {costTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>المدة</FilterGroupLabel>
                  <FilterSelect
                    value={durationType}
                    onChange={(e) => setDurationType(e.target.value)}
                  >
                    {durationTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>الموقع</FilterGroupLabel>
                  <FilterSelect
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                  >
                    {locationTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
              </AdvancedFiltersGrid>
            </AdvancedFiltersContainer>
          )}
        </div>
      </FilterSection>

      <OpportunitiesSection>
        <div className="container">
          {isLoadingOpportunities ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem', 
              color: '#6B7280',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #E5E7EB',
                borderTop: '4px solid #1E3A8A',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <h3>جاري تحميل الفرص...</h3>
              <p>يرجى الانتظار بينما نجلب أحدث الفرص المتاحة</p>
            </div>
          ) : filteredOpportunities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
              <h3>لا توجد فرص تطابق الفلاتر المحددة</h3>
              <p>جرب تغيير الفلاتر أو مسح جميع الفلاتر</p>
              <button
                onClick={clearAllFilters}
                style={{
                  background: '#1E3A8A',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  marginTop: '1rem'
                }}
              >
                عرض جميع الفرص
              </button>
            </div>
          ) : (
            <OpportunitiesGrid>
              {filteredOpportunities.map((opportunity, index) => (
                <OpportunityCard
                  key={opportunity._id || opportunity.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <OpportunityImage type={typeof opportunity.type === 'string' ? opportunity.type : 'job'}>
                    {opportunity.image ? (
                      <img 
                        src={opportunity.image} 
                        alt={opportunity.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      // أيقونات احتياطية حسب نوع الفرصة
                      opportunity.type === 'job' ? '💼' :
                      opportunity.type === 'scholarship' ? '🎓' :
                      opportunity.type === 'competition' ? '🏆' :
                      opportunity.type === 'hackathon' ? '⚡' :
                      opportunity.type === 'internship' ? '🔧' :
                      opportunity.type === 'conference' ? '🎤' :
                      opportunity.type === 'initiative' ? '🌟' :
                      opportunity.type === 'research' ? '🔬' :
                      opportunity.type === 'startup' ? '🚀' :
                      opportunity.type === 'incubator' ? '🤖' :
                      opportunity.type === 'camp' ? '🏕️' :
                      opportunity.type === 'job_fair' ? '📋' : '💼'
                    )}
                  </OpportunityImage>
                  <OpportunityContent>
                    <OpportunityType type={typeof opportunity.type === 'string' ? opportunity.type : 'job'}>
                      {opportunity.type === 'scholarship' ? 'منحة دراسية' : 
                       opportunity.type === 'competition' ? 'مسابقة أكاديمية' : 
                       opportunity.type === 'volunteer' ? 'فرصة تطوعية' :
                       opportunity.type === 'internship' ? 'وظيفة تدريبية' :
                       opportunity.type === 'conference' ? 'مؤتمر/ورشة' :
                       opportunity.type === 'initiative' ? 'مبادرة' : 
                       opportunity.type === 'research' ? 'فرصة بحث' :
                       opportunity.type === 'startup' ? 'دعم مشاريع' :
                       opportunity.type === 'camp' ? 'معسكر' :
                       opportunity.type === 'hackathon' ? 'هاكاثون' :
                       opportunity.type === 'job_fair' ? 'معرض توظيف' :
                       opportunity.type === 'incubator' ? 'حاضنة' : 'فرصة'}
                    </OpportunityType>
                    <OpportunityTitle>{opportunity.title}</OpportunityTitle>
                    <OpportunityDescription>{opportunity.description}</OpportunityDescription>
                    
                    <OpportunityDetails>
                      <DetailItem>
                        <DetailIcon>⏱️</DetailIcon>
                        <DetailText>{opportunity.duration}</DetailText>
                      </DetailItem>
                      <DetailItem>
                        <DetailIcon>📍</DetailIcon>
                        <DetailText>
                          {typeof opportunity.location === 'object' 
                              ? opportunity.location.address || opportunity.location.city || 'الرياض'
                              : opportunity.location || 'الرياض'}
                        </DetailText>
                      </DetailItem>
                      <DetailItem>
                        <DetailIcon>💰</DetailIcon>
                        <DetailText>{opportunity.price}</DetailText>
                      </DetailItem>
                      {opportunity.benefits && (
                      <DetailItem>
                          <DetailIcon>✨</DetailIcon>
                          <DetailText>الفوائد: {Array.isArray(opportunity.benefits) ? opportunity.benefits.join('، ') : opportunity.benefits}</DetailText>
                      </DetailItem>
                      )}
                      {opportunity.tracks && (
                      <DetailItem>
                          <DetailIcon>🎯</DetailIcon>
                          <DetailText>المسارات: {Array.isArray(opportunity.tracks) ? opportunity.tracks.join('، ') : opportunity.tracks}</DetailText>
                      </DetailItem>
                      )}
                      {opportunity.applicationDeadline && (
                        <DetailItem>
                          <DetailIcon>⏰</DetailIcon>
                          <DetailText>
                            ينتهي التسجيل: {opportunity.applicationDeadline 
                              ? new Date(opportunity.applicationDeadline).toLocaleDateString('en-US')
                              : opportunity.applicationDeadline
                            }
                          </DetailText>
                        </DetailItem>
                      )}
                      {opportunity.targetAudience && (
                        <DetailItem>
                          <DetailIcon>👥</DetailIcon>
                          <DetailText>الفئات المستهدفة: {opportunity.targetAudience}</DetailText>
                        </DetailItem>
                      )}
                      {(opportunity.organization || opportunity.company?.name) && (
                        <DetailItem>
                          <DetailIcon>🏢</DetailIcon>
           <DetailText>المنطقة: {opportunity.title && opportunity.title.includes('جائزة مايدة') ? 'جدة' :
              opportunity.title && opportunity.title.includes('هاكاثون الطاقة') ? 'غير محدد' :
              opportunity.title && opportunity.title.includes('معسكر بيدر') ? 'الرياض' :
              opportunity.title && opportunity.title.includes('Intersec') ? 'الرياض' :
              opportunity.title && opportunity.title.includes('حاضنة الذكاء الاصطناعي') ? 'الرياض / الخبر' :
              opportunity.title && opportunity.title.includes('معرض التوظيف') ? 'الظهران' :
              opportunity.title && opportunity.title.includes('برنامج موهبة') ? 'الرياض' :
              opportunity.title && opportunity.title.includes('ماراثون الأفكار') ? 'جازان' : 'غير محدد'}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.focusAreas && (
                        <DetailItem>
                          <DetailIcon>🎯</DetailIcon>
                          <DetailText>مجالات التركيز: {opportunity.focusAreas.join('، ')}</DetailText>
                        </DetailItem>
                      )}
                      {opportunity.prizes && (
                        <DetailItem>
                          <DetailIcon>🏆</DetailIcon>
                          <DetailText>الجوائز: {opportunity.prizes}</DetailText>
                        </DetailItem>
                      )}
                    </OpportunityDetails>
                    
                    {(opportunity as any).isClosed ? (
                      <OpportunityButton 
                        style={{ 
                          backgroundColor: '#6B7280', 
                          cursor: 'not-allowed',
                          opacity: 0.7
                        }}
                        disabled
                      >
                        مغلق
                      </OpportunityButton>
                    ) : (
                      <OpportunityButton 
                        onClick={() => {
                          if (opportunity.applicationUrl || opportunity.registrationLink) {
                            window.open(opportunity.applicationUrl || opportunity.registrationLink, '_blank');
                          }
                        }}
                      >
                        سجل الآن
                      </OpportunityButton>
                    )}
                    {/* زر تكوين الفرق - يظهر لجميع الفرص عدا برنامج التميز */}
                    {!(opportunity.title && (opportunity.title.includes('برنامج موهبة للالتحاق بالجامعات المرموقة') || opportunity.title.includes('Intersec Saudi Arabia') || opportunity.title.includes('حاضنة الذكاء الاصطناعي') || opportunity.title.includes('برنامج ريادة الأعمال لتطوير الألعاب') || opportunity.title.includes('معرض التوظيف'))) && (
                      <OpportunityButton 
                        style={{ backgroundColor: '#28a745', marginTop: '10px' }}
                        onClick={() => {
                          // روابط تكوين الفرق حسب نوع الفرصة
                          const teamLinks: { [key: string]: string } = {
                            'job': 'https://chat.whatsapp.com/InPWOkSb2sB0PH3MqBTtMC?mode=ems_share_c',
                            'scholarship': 'https://chat.whatsapp.com/FzGPht9ZB1aJoigmpFWq06?mode=ems_copy_c',
                            'competition': 'https://chat.whatsapp.com/IJFuagaaRdq1SKvXgMd4of?mode=ems_copy_c',
                            'hackathon': 'https://chat.whatsapp.com/LvmLdzDQEUxC3jrbwfFzA8?mode=ems_copy_c',
                            'internship': 'https://chat.whatsapp.com/InPWOkSb2sB0PH3MqBTtMC?mode=ems_share_c',
                            'conference': 'https://chat.whatsapp.com/FzGPht9ZB1aJoigmpFWq06?mode=ems_copy_c',
                            'initiative': 'https://chat.whatsapp.com/IJFuagaaRdq1SKvXgMd4of?mode=ems_copy_c',
                            'research': 'https://chat.whatsapp.com/LvmLdzDQEUxC3jrbwfFzA8?mode=ems_copy_c',
                            'startup': 'https://chat.whatsapp.com/InPWOkSb2sB0PH3MqBTtMC?mode=ems_share_c',
                            'incubator': 'https://chat.whatsapp.com/FzGPht9ZB1aJoigmpFWq06?mode=ems_copy_c',
                            'camp': 'https://chat.whatsapp.com/InPWOkSb2sB0PH3MqBTtMC?mode=ems_share_c',
                            'job_fair': 'https://chat.whatsapp.com/LvmLdzDQEUxC3jrbwfFzA8?mode=ems_copy_c'
                          };
                          
                          const teamLink = teamLinks[opportunity.type as string] || teamLinks['job'];
                          window.open(teamLink, '_blank');
                        }}
                      >
                        تكوين الفرق
                      </OpportunityButton>
                    )}
                    <AddToSelectedButton
                      isSelected={selectedOpportunities.has(opportunity._id || opportunity.id)}
                      onClick={() => handleAddToSelected(opportunity._id || opportunity.id)}
                      disabled={loading === (opportunity._id || opportunity.id)}
                    >
                      {loading === (opportunity._id || opportunity.id)
                        ? 'جاري الإضافة...' 
                        : selectedOpportunities.has(opportunity._id || opportunity.id) 
                          ? 'تمت الإضافة بنجاح' 
                          : 'أضف للفرص المختارة'
                      }
                    </AddToSelectedButton>
                  </OpportunityContent>
                </OpportunityCard>
              ))}
            </OpportunitiesGrid>
          )}
        </div>
      </OpportunitiesSection>
    </OpportunitiesContainer>
  );
};

export default Opportunities;
