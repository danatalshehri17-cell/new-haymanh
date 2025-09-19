import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ProgramsContainer = styled.div`
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

const ProgramsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const ProgramsGrid = styled.div`
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

const ProgramCard = styled(motion.div)`
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

const ProgramImage = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.display};
`;

const ProgramContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ProgramTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const ProgramDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgramButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
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

const FilterButton = styled.button<{ isActive: boolean }>`
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

const Programs: React.FC = () => {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [levelFilter, setLevelFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [ageGroupFilter, setAgeGroupFilter] = useState('all');

  const filters = [
    { id: 'all', label: t('allPrograms') },
    { id: 'leadership', label: t('leadership') },
    { id: 'technology', label: t('technology') },
    { id: 'business', label: t('business') },
    { id: 'education', label: t('education') },
    { id: 'skills', label: t('skills') }
  ];

  const levels = [
    { id: 'all', label: t('allLevels') },
    { id: 'beginner', label: t('beginner') },
    { id: 'intermediate', label: t('intermediate') },
    { id: 'advanced', label: t('advanced') }
  ];

  const durations = [
    { id: 'all', label: t('allDurations') },
    { id: 'short', label: t('shortDuration') },
    { id: 'medium', label: t('mediumDuration') },
    { id: 'long', label: t('longDuration') }
  ];

  const prices = [
    { id: 'all', label: t('allPrices') },
    { id: 'free', label: t('free') },
    { id: 'paid', label: t('paid') },
    { id: 'partial', label: t('partial') }
  ];

  const categories = [
    { id: 'all', label: t('allCategories') },
    { id: 'professional', label: t('professional') },
    { id: 'personal', label: t('personal') },
    { id: 'academic', label: t('academic') },
    { id: 'creative', label: t('creative') }
  ];

  const attendanceTypes = [
    { id: 'all', label: t('allTypes') },
    { id: 'in-person', label: t('offline') },
    { id: 'online', label: t('online') },
    { id: 'hybrid', label: t('hybrid') }
  ];

  const ageGroups = [
    { id: 'all', label: t('allAges') },
    { id: 'students', label: t('students') },
    { id: 'graduates', label: t('professionals') },
    { id: 'professionals', label: t('professionals') },
    { id: 'youth', label: t('general') }
  ];

  const programs = [
    {
      id: 1,
      title: 'برنامج "تقدُّم" - صيفك نقطة انطلاقك!',
      description: 'برنامج صيفي مميز من مبادرة هيمنة، صُمم خصيصًا لتطوير وصقل مهارات الشباب المبدعين في مختلف المجالات. يركز البرنامج على أهم المهارات التي تحتاجها لتبرز وتثبت نفسك: التقديم، الإلقاء، والخطابة.',
      icon: '🌤️',
      image: '/images/takadum-program.jpeg',
      category: 'skills',
      level: 'beginner',
      duration: 'medium',
      price: 'free',
      attendance: 'online',
      ageGroup: 'youth',
      isClosed: true
    },
    {
      id: 2,
      title: 'برنامج "كتّاب المستقبل"',
      description: 'نتيجة تعاون مميز بين رؤية هيمنة النجاح وإبداع بين السطور، صُمم خصيصًا لكل عاشق للكلمة، وطموح نحو مستقبل أدبي مشرق! بنرافقك خطوة بخطوة: من أول فكرة تخطر ببالك إلى نص جاهز للنشر والمشاركة.',
      icon: '✍️',
      image: '/images/future-writers-program.png',
      category: 'creative',
      level: 'beginner',
      duration: 'medium',
      price: 'free',
      attendance: 'online',
      ageGroup: 'youth',
      isClosed: true
    },
    {
      id: 3,
      title: 'ورشة "استكشاف الفضاء: التحديات، التقنيات، المستقبل"',
      description: 'تعال نعيش معاً رحلة بين الكواكب والنجوم، نتعرف على أسرار الفضاء، ونتحدّث عن كيف تغيّر التقنية والذكاء الاصطناعي هذا العالم الكبير! ورشة تفاعلية للطلاب المهتمين بالفضاء والتقنية.',
      icon: '🚀',
      images: ['/images/space-exploration-1.jpeg', '/images/space-exploration-2.jpeg'],
      category: 'education',
      level: 'beginner',
      duration: 'short',
      price: 'free',
      attendance: 'online',
      ageGroup: 'students',
      isClosed: true,
      isCompleted: true,
      date: '26 يوليو 2025',
      durationMinutes: '60 دقيقة',
      targetAudience: 'طلاب المرحلتين المتوسطة والثانوية المهتمين بالفضاء والتقنية',
      sponsors: 'لافيندر | هيمنة النجاح | سهم | ميرا',
      benefits: ['شهادة حضور', 'فرص للمشاركة في مسابقات فضائية', 'أفكار ملهمة للمستقبل', 'تجارب تخلّي خيالك أكبر من حدود الأرض']
    },
    {
      id: 4,
      title: 'ورشة "الذكاء الاصطناعي في البحث العلمي"',
      description: 'ورشة تفاعلية متخصصة بتعلمك كيف تستخدم الذكاء الاصطناعي في البحث العلمي بشكل احترافي. ستتعلم كيفية اختيار الموضوع المناسب، جمع وتحليل المعلومات بطرق متقدمة، وكشف السرقة الأدبية باستخدام أحدث الأدوات التقنية. الورشة تشمل لقاء حواري مميز مع خبراء في المجال.',
      icon: '🤖',
      image: '/images/ai-research-workshop.jpeg',
      category: 'education',
      level: 'intermediate',
      duration: 'short',
      price: 'free',
      attendance: 'online',
      ageGroup: 'students',
      isClosed: true,
      isCompleted: true,
      date: '25 يونيو',
      time: '7:30 - 8:30 مساءً',
      durationMinutes: '60 دقيقة',
      targetAudience: 'الطلاب الجامعيين المهتمين بالبحث العلمي',
      benefits: ['شهادة حضور معتمدة', 'تعلم استخدام الذكاء الاصطناعي في البحث العلمي', 'لقاء حواري تفاعلي مع خبراء', 'تطوير مهارات البحث العلمي المتقدمة', 'نماذج عملية للتطبيق', 'أدوات تقنية حديثة لكشف السرقة الأدبية', 'استراتيجيات جمع وتحليل البيانات']
    },
    {
      id: 5,
      title: 'ورشة "من فكرة إلى ابتكار"',
      description: 'هل فكرتِ يومًا ان عندك فكرة بسيطة ممكن تتحول لمشروع علمي مبدع؟ في هالورشة راح نكتشف سوا كيف تبدأ الفكرة ووش الخطوات اللي تخليها مشروع يشارك في مسابقات وطنية مثل الأولمبياد الوطني للإبداع العلمي! الورشة تفاعلية فيها أمثلة وتجارب واقعية وأساليب تساعدك تطورين فكرتك بأسلوب علمي وابتكاري. ستتعلمين كيفية تحويل أفكارك البسيطة إلى مشاريع علمية.',
      icon: '✨',
      image: '/images/innovation-workshop.jpeg',
      category: 'innovation',
      level: 'beginner',
      duration: 'short',
      price: 'free',
      attendance: 'online',
      ageGroup: 'students',
      isClosed: true,
      isCompleted: true,
      date: '20 يونيو 2025',
      time: '7 - 8 مساءً',
      durationMinutes: '60 دقيقة',
      targetAudience: 'طالبات المرحلتين المتوسطة والثانوية',
      benefits: ['شهادة حضور', 'تعلم تحويل الأفكار إلى مشاريع علمية', 'أمثلة وتجارب واقعية', 'أساليب المشاركة في المسابقات الوطنية']
    },
    {
      id: 6,
      title: 'ورشة "رحلة الهاكاثون"',
      description: 'هل أنتم مستعدون للانطلاق في رحلة الهاكاثون؟ في هذه الورشة سنغطي أفضل طرق الاستعداد للمشاركة الفعّالة، وكيفية عرض الأفكار والحلول بشكل مؤثر بالإضافة إلى تنظيم الأدوار وتوزيع المهام بشكل احترافي لزيادة فرص النجاح. مع أعضاء قد التحقوا في عدة هاكاثونات وحققوا نتائج مذهلة، سيشاركونكم خبراتهم التي ستساهم في نجاحكم في الهاكاثونات القادمة.',
      icon: '🚀',
      image: '/images/hackathon-journey.jpeg',
      category: 'technology',
      level: 'intermediate',
      duration: 'short',
      price: 'free',
      attendance: 'online',
      ageGroup: 'students',
      isClosed: true,
      isCompleted: true,
      date: '13 أغسطس 2025',
      time: '6 مساءً',
      durationMinutes: '60 دقيقة',
      targetAudience: 'المهتمين بالمشاركة في الهاكاثونات',
      benefits: ['شهادة حضور', 'تعلم الاستعداد للهاكاثونات', 'مهارات عرض الأفكار والحلول', 'تنظيم الأدوار وتوزيع المهام', 'خبرات من أعضاء محترفين']
    }
  ];

  return (
    <ProgramsContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('programsTitle')}
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('programsSubtitle')}
          </HeroSubtitle>
        </div>
      </HeroSection>

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
                  <FilterGroupLabel>المستوى</FilterGroupLabel>
                  <FilterSelect
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                  >
                    {levels.map((level) => (
                      <option key={level.id} value={level.id}>
                        {level.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>المدة</FilterGroupLabel>
                  <FilterSelect
                    value={durationFilter}
                    onChange={(e) => setDurationFilter(e.target.value)}
                  >
                    {durations.map((duration) => (
                      <option key={duration.id} value={duration.id}>
                        {duration.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>السعر</FilterGroupLabel>
                  <FilterSelect
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    {prices.map((price) => (
                      <option key={price.id} value={price.id}>
                        {price.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>الفئة</FilterGroupLabel>
                  <FilterSelect
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>نوع الحضور</FilterGroupLabel>
                  <FilterSelect
                    value={attendanceFilter}
                    onChange={(e) => setAttendanceFilter(e.target.value)}
                  >
                    {attendanceTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
                
                <FilterGroup>
                  <FilterGroupLabel>الفئة العمرية</FilterGroupLabel>
                  <FilterSelect
                    value={ageGroupFilter}
                    onChange={(e) => setAgeGroupFilter(e.target.value)}
                  >
                    {ageGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.label}
                      </option>
                    ))}
                  </FilterSelect>
                </FilterGroup>
              </AdvancedFiltersGrid>
            </AdvancedFiltersContainer>
          )}
        </div>
      </FilterSection>

      <ProgramsSection>
        <div className="container">
          <ProgramsGrid>
            {programs.map((program, index) => (
              <ProgramCard
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProgramImage>
                  {(program as any).images ? (
                    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
                      {(program as any).images.map((imageSrc: string, index: number) => (
                        <img 
                          key={index}
                          src={imageSrc} 
                          alt={`${program.title} - صورة ${index + 1}`}
                          style={{ 
                            width: '50%', 
                            height: '100%', 
                            objectFit: 'cover', 
                            borderRadius: index === 0 ? '8px 0 0 8px' : '0 8px 8px 0',
                            flex: 1
                          }}
                        />
                      ))}
                    </div>
                  ) : program.image ? (
                    <img 
                      src={program.image} 
                      alt={program.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    program.icon
                  )}
                </ProgramImage>
                <ProgramContent>
                  <ProgramTitle>{program.title}</ProgramTitle>
                  <ProgramDescription>{program.description}</ProgramDescription>
                  {(program as any).isCompleted ? (
                    <ProgramButton 
                      style={{ 
                        backgroundColor: '#10B981', 
                        cursor: 'not-allowed',
                        opacity: 0.8
                      }}
                      disabled
                    >
                      منتهي
                    </ProgramButton>
                  ) : program.isClosed ? (
                    <ProgramButton 
                      style={{ 
                        backgroundColor: '#6B7280', 
                        cursor: 'not-allowed',
                        opacity: 0.7
                      }}
                      disabled
                    >
                      مغلق
                    </ProgramButton>
                  ) : (
                    <ProgramButton>سجل الآن</ProgramButton>
                  )}
                </ProgramContent>
              </ProgramCard>
            ))}
          </ProgramsGrid>
        </div>
      </ProgramsSection>
    </ProgramsContainer>
  );
};

export default Programs;
