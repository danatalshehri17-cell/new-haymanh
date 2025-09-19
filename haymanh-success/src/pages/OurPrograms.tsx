import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  padding-top: 80px;
  direction: rtl;
`;

const Header = styled.section`
  background: linear-gradient(135deg, #4A90E2 0%, #7B68EE 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Content = styled.section`
  padding: 4rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
  margin-bottom: 4rem;
`;

const StatItem = styled(motion.div)`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: #4A90E2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1.125rem;
  color: #7F8C8D;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  color: #2C3E50;
  font-size: 2rem;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProgramCard = styled(motion.article)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  border: 2px solid #E8E8E8;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    border-color: #4A90E2;
  }
`;

const CardImage = styled.div<{ image: string }>`
  height: 200px;
  background: url(${({ image }) => image}) center/cover;
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardType = styled.span<{ type: string }>`
  background: ${({ type }) => {
    switch (type) {
      case 'camp': return '#4A90E2';
      case 'course': return '#7B68EE';
      case 'workshop': return '#50C878';
      case 'competition': return '#F39C12';
      case 'volunteer': return '#27AE60';
      default: return '#4A90E2';
    }
  }};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h4`
  color: #2C3E50;
  margin-bottom: 1rem;
  line-height: 1.4;
  font-size: 1.125rem;
`;

const CardDescription = styled.p`
  color: #7F8C8D;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #E8E8E8;
`;

const EnrollButton = styled.button<{ isFree?: boolean }>`
  background: ${({ isFree }) => isFree ? '#27AE60' : '#4A90E2'};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ isFree }) => isFree ? '#50C878' : '#7B68EE'};
    transform: translateY(-2px);
  }
`;

const OurPrograms: React.FC = () => {
  const programs = [
    {
      id: '1',
      title: 'معسكر البرمجة الشامل للمبتدئين',
      description: 'معسكر تدريبي مكثف لمدة أسبوعين لتعلم أساسيات البرمجة وتطوير تطبيقات بسيطة.',
      type: 'camp',
      price: '1200 ريال',
      isFree: false,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800'
    },
    {
      id: '2',
      title: 'دورة تطوير تطبيقات الويب المتقدمة',
      description: 'دورة شاملة لتعلم أحدث تقنيات تطوير الويب مثل React, Node.js.',
      type: 'course',
      price: '299 ريال/شهر',
      isFree: false,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800'
    },
    {
      id: '3',
      title: 'ورشة الذكاء الاصطناعي للمبتدئين',
      description: 'ورشة تفاعلية لتعلم أساسيات الذكاء الاصطناعي والتعلم الآلي.',
      type: 'workshop',
      price: 'مجاني',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800'
    },
    {
      id: '4',
      title: 'مسابقة تطوير التطبيقات الإبداعية',
      description: 'مسابقة سنوية لتطوير تطبيقات مبتكرة مع جوائز قيمة وفرص عمل.',
      type: 'competition',
      price: 'مجاني',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800'
    },
    {
      id: '5',
      title: 'برنامج التطوع في التعليم التقني',
      description: 'فرصة تطوعية لتدريس الطلاب في المدارس الحكومية وتطوير مهاراتهم التقنية.',
      type: 'volunteer',
      price: 'مجاني',
      isFree: true,
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
    }
  ];

  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'camp': return 'معسكر';
      case 'course': return 'دورة';
      case 'workshop': return 'ورشة';
      case 'competition': return 'مسابقة';
      case 'volunteer': return 'تطوع';
      default: return type;
    }
  };

  return (
    <Container>
      <Header>
        <Title>برامجنا</Title>
        <Subtitle>
          اكتشف مجموعة متنوعة من البرامج التدريبية والمعسكرات والفرص المتاحة
          من مبادرة هيمنة النجاح. برامج مجانية ومدفوعة لجميع المستويات
        </Subtitle>
      </Header>

      <Content>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem' }}>
          <StatsGrid>
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <StatNumber>25+</StatNumber>
              <StatLabel>برنامج تدريبي</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StatNumber>1000+</StatNumber>
              <StatLabel>مشارك ناجح</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StatNumber>15</StatNumber>
              <StatLabel>برنامج مجاني</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StatNumber>95%</StatNumber>
              <StatLabel>معدل الرضا</StatLabel>
            </StatItem>
          </StatsGrid>

          <SectionTitle>جميع البرامج المتاحة</SectionTitle>
          <ProgramsGrid>
            {programs.map((program, index) => (
              <ProgramCard
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CardImage image={program.image} />
                <CardContent>
                  <CardType type={program.type}>
                    {getTypeLabel(program.type)}
                  </CardType>
                  
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                  
                  <CardFooter>
                    <div style={{ color: '#7F8C8D', fontSize: '0.875rem' }}>
                      💰 {program.price}
                    </div>
                    
                    <EnrollButton isFree={program.isFree}>
                      {program.isFree ? 'انضم مجاناً' : 'سجل الآن'}
                    </EnrollButton>
                  </CardFooter>
                </CardContent>
              </ProgramCard>
            ))}
          </ProgramsGrid>
        </div>
      </Content>
    </Container>
  );
};

export default OurPrograms;
