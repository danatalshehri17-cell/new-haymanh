import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Styled Components
const SelectorContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%);
  padding: 4rem 0 2rem 0;
  direction: rtl;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Header = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(30, 58, 138, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1E3A8A;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6B7280;
  font-family: 'Tajawal', sans-serif;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 0.5rem;
  backdrop-filter: blur(10px);
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${props => props.active 
    ? 'linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%)' 
    : 'transparent'};
  color: ${props => props.active ? 'white' : '#1E3A8A'};
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  
  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #1E3A8A 0%, #E11D48 100%)' 
      : 'rgba(255, 255, 255, 0.2)'};
  }
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const Card = styled(motion.div)`
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

const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: 'Cairo', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  opacity: 0.95;
  font-family: 'Tajawal', sans-serif;
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  background: ${props => props.variant === 'secondary' 
    ? 'rgba(255, 255, 255, 0.2)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.variant === 'secondary' ? 'white' : '#1E3A8A'};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Cairo', sans-serif;
  z-index: 1;
  width: 100%;
  
  &:hover {
    background: ${props => props.variant === 'secondary' 
      ? 'rgba(255, 255, 255, 0.3)' 
      : 'white'};
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

const MessageContainer = styled(motion.div)<{ type: 'success' | 'error' }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${props => props.type === 'success' ? '#10B981' : '#EF4444'};
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-family: 'Cairo', sans-serif;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  z-index: 1000;
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

const OpportunitySelector: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'opportunities' | 'programs'>('opportunities');
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch opportunities
      const opportunitiesResponse = await fetch('http://localhost:5001/api/opportunities?limit=20');
      if (opportunitiesResponse.ok) {
        const opportunitiesData = await opportunitiesResponse.json();
        setOpportunities(opportunitiesData.data.opportunities || []);
      } else {
        // Fallback to default data if API fails
        setOpportunities([
          {
            _id: '68bc1b352b92501548d37f08',
            title: 'مطور ويب مبتدئ',
            description: 'فرصة تدريب ممتازة في تطوير الويب',
            shortDescription: 'فرصة تدريب في تطوير الويب',
            company: { name: 'شركة التقنية المتقدمة' },
            location: { type: 'remote', city: 'الرياض' },
            type: 'internship',
            category: 'technology'
          }
        ]);
      }

      // Fetch programs
      const programsResponse = await fetch('http://localhost:5001/api/programs?limit=20');
      if (programsResponse.ok) {
        const programsData = await programsResponse.json();
        setPrograms(programsData.data.programs || []);
      } else {
        // Fallback to default data if API fails
        setPrograms([
          {
            _id: 'program-1',
            title: 'برنامج القيادة الأساسي',
            description: 'برنامج شامل لتعلم أساسيات القيادة',
            shortDescription: 'برنامج القيادة الأساسي',
            duration: { value: 4, unit: 'weeks' },
            price: { amount: 0, currency: 'free' },
            category: 'training',
            level: 'beginner'
          },
          {
            _id: 'program-2',
            title: 'دورة التطوير المهني',
            description: 'دورة متقدمة في التطوير المهني',
            shortDescription: 'دورة التطوير المهني',
            duration: { value: 6, unit: 'weeks' },
            price: { amount: 500, currency: 'SAR' },
            category: 'course',
            level: 'intermediate'
          },
          {
            _id: 'program-3',
            title: 'ورشة ريادة الأعمال',
            description: 'ورشة عملية لريادة الأعمال',
            shortDescription: 'ورشة ريادة الأعمال',
            duration: { value: 2, unit: 'weeks' },
            price: { amount: 0, currency: 'free' },
            category: 'workshop',
            level: 'beginner'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Set default data on error
      setOpportunities([
        {
          _id: 'tech-internship-1',
          title: 'فرصة تدريب في شركة تقنية',
          description: 'فرصة تدريب ممتازة في شركة تقنية رائدة',
          shortDescription: 'فرصة تدريب في شركة تقنية رائدة',
          company: { name: 'شركة التقنية المتقدمة' },
          location: { type: 'remote', city: 'الرياض' },
          type: 'internship',
          category: 'technology'
        }
      ]);
      setPrograms([
        {
          _id: 'program-1',
          title: 'برنامج القيادة الأساسي',
          description: 'برنامج شامل لتعلم أساسيات القيادة',
          shortDescription: 'برنامج القيادة الأساسي',
          duration: { value: 4, unit: 'weeks' },
          price: { amount: 0, currency: 'free' },
          category: 'training',
          level: 'beginner'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = async (itemId: string, type: 'opportunity' | 'program') => {
    try {
      const token = localStorage.getItem('haymanh_token');
      
      if (type === 'opportunity') {
        const response = await fetch('http://localhost:5001/api/dashboard/select-opportunity', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ opportunityId: itemId })
        });

        if (response.ok) {
          setSelectedItems(prev => new Set([...Array.from(prev), itemId]));
          setMessage({ type: 'success', text: 'تم اختيار الفرصة بنجاح!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'حدث خطأ في اختيار الفرصة' });
          setTimeout(() => setMessage(null), 3000);
        }
      } else {
        const response = await fetch('http://localhost:5001/api/dashboard/enroll', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ programId: itemId })
        });

        if (response.ok) {
          setSelectedItems(prev => new Set([...Array.from(prev), itemId]));
          setMessage({ type: 'success', text: 'تم التسجيل في البرنامج بنجاح!' });
          setTimeout(() => setMessage(null), 3000);
        } else {
          setMessage({ type: 'error', text: 'حدث خطأ في التسجيل في البرنامج' });
          setTimeout(() => setMessage(null), 3000);
        }
      }
    } catch (error) {
      console.error('Error selecting item:', error);
      setMessage({ type: 'error', text: 'حدث خطأ في الاتصال بالخادم' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (loading) {
    return (
      <SelectorContainer>
        <LoadingSpinner>جاري تحميل البيانات...</LoadingSpinner>
      </SelectorContainer>
    );
  }

  return (
    <SelectorContainer>
      {message && (
        <MessageContainer
          type={message.type}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {message.text}
        </MessageContainer>
      )}
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <Header variants={itemVariants}>
            <Title>اختر فرصك وبرامجك</Title>
            <Subtitle>استكشف الفرص المتاحة والبرامج التدريبية واختر ما يناسبك</Subtitle>
          </Header>

          {/* Tabs */}
          <TabsContainer>
            <Tab 
              active={activeTab === 'opportunities'} 
              onClick={() => setActiveTab('opportunities')}
            >
              الفرص المتاحة
            </Tab>
            <Tab 
              active={activeTab === 'programs'} 
              onClick={() => setActiveTab('programs')}
            >
              البرامج التدريبية
            </Tab>
          </TabsContainer>

          {/* Opportunities Tab */}
          {activeTab === 'opportunities' && (
            <Section variants={itemVariants}>
              <SectionTitle>💼 الفرص المتاحة</SectionTitle>
              {opportunities.length > 0 ? (
                <Grid>
                  {opportunities.map((opportunity: any, index: number) => (
                    <Card
                      key={opportunity._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <CardTitle>{opportunity.title}</CardTitle>
                      <CardDescription>
                        {opportunity.shortDescription || opportunity.description?.substring(0, 150) + '...'}
                      </CardDescription>
                      <CardMeta>
                        <MetaItem>
                          <span>🏢</span>
                          <span>{opportunity.company?.name || 'غير محدد'}</span>
                        </MetaItem>
                        <MetaItem>
                          <span>📍</span>
                          <span>{opportunity.location?.type === 'remote' ? 'عن بُعد' : opportunity.location?.city || 'غير محدد'}</span>
                        </MetaItem>
                      </CardMeta>
                      <ActionButton
                        onClick={() => handleSelectItem(opportunity._id, 'opportunity')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={selectedItems.has(opportunity._id)}
                      >
                        {selectedItems.has(opportunity._id) ? 'تم الاختيار' : 'اختر الفرصة'}
                      </ActionButton>
                    </Card>
                  ))}
                </Grid>
              ) : (
                <EmptyState>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>💼</div>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b', fontSize: '1.5rem', fontWeight: '700' }}>
                    لا توجد فرص متاحة حالياً
                  </h3>
                  <p style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    سيتم إضافة فرص جديدة قريباً
                  </p>
                </EmptyState>
              )}
            </Section>
          )}

          {/* Programs Tab */}
          {activeTab === 'programs' && (
            <Section variants={itemVariants}>
              <SectionTitle>📚 البرامج التدريبية</SectionTitle>
              {programs.length > 0 ? (
                <Grid>
                  {programs.map((program: any, index: number) => (
                    <Card
                      key={program._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <CardTitle>{program.title}</CardTitle>
                      <CardDescription>
                        {program.shortDescription || program.description?.substring(0, 150) + '...'}
                      </CardDescription>
                      <CardMeta>
                        <MetaItem>
                          <span>📅</span>
                          <span>{program.duration?.value} {program.duration?.unit}</span>
                        </MetaItem>
                        <MetaItem>
                          <span>💰</span>
                          <span>{program.price?.currency === 'free' ? 'مجاني' : `${program.price?.amount} ${program.price?.currency}`}</span>
                        </MetaItem>
                      </CardMeta>
                      <ActionButton
                        onClick={() => handleSelectItem(program._id, 'program')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={selectedItems.has(program._id)}
                      >
                        {selectedItems.has(program._id) ? 'تم التسجيل' : 'سجل في البرنامج'}
                      </ActionButton>
                    </Card>
                  ))}
                </Grid>
              ) : (
                <EmptyState>
                  <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📚</div>
                  <h3 style={{ marginBottom: '1rem', color: '#1e293b', fontSize: '1.5rem', fontWeight: '700' }}>
                    لا توجد برامج متاحة حالياً
                  </h3>
                  <p style={{ marginBottom: '1.5rem', color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                    سيتم إضافة برامج جديدة قريباً
                  </p>
                </EmptyState>
              )}
            </Section>
          )}
        </motion.div>
      </Container>
    </SelectorContainer>
  );
};

export default OpportunitySelector;
