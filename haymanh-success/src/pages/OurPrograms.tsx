import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  padding-top: 90px;
  direction: rtl;
  background: #f8fafc;

  @media (max-width: 1024px) {
    padding-top: 80px;
  }

  @media (max-width: 768px) {
    padding-top: 72px;
  }

  @media (max-width: 480px) {
    padding-top: 64px;
  }
`;

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 1024px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #4a90e2 0%, #7b68ee 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  border-radius: 0 0 32px 32px;

  @media (max-width: 1024px) {
    padding: 3.5rem 0;
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
    border-radius: 0 0 24px 24px;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 0;
    border-radius: 0 0 18px 18px;
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: 1rem;
  font-weight: 800;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.25rem);
  opacity: 0.92;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.7;

  @media (max-width: 480px) {
    line-height: 1.6;
  }
`;

const Content = styled.section`
  padding: 4rem 0 5rem;

  @media (max-width: 1024px) {
    padding: 3.5rem 0 4rem;
  }

  @media (max-width: 768px) {
    padding: 3rem 0 3.5rem;
  }

  @media (max-width: 480px) {
    padding: 2.5rem 0 3rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.75rem;
  text-align: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
    margin-bottom: 2.5rem;
  }
`;

const StatItem = styled(motion.div)`
  padding: 1.75rem 1.25rem;
  background: white;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(79, 118, 208, 0.12);
  border: 1px solid rgba(74, 144, 226, 0.1);

  @media (max-width: 480px) {
    padding: 1.25rem 1rem;
    border-radius: 14px;
  }
`;

const StatNumber = styled.div`
  font-size: clamp(1.9rem, 4vw, 2.7rem);
  font-weight: 800;
  color: #4a90e2;
  margin-bottom: 0.4rem;
`;

const StatLabel = styled.div`
  font-size: clamp(0.95rem, 2vw, 1.075rem);
  color: #6b7b8c;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2.75rem;
  color: #1f2a36;
  font-size: clamp(1.65rem, 3.5vw, 2.15rem);
  font-weight: 700;

  @media (max-width: 480px) {
    margin-bottom: 2.25rem;
  }
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const ProgramCard = styled(motion.article)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(31, 50, 81, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(79, 118, 208, 0.12);
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 48px rgba(31, 50, 81, 0.12);
    border-color: rgba(74, 144, 226, 0.3);
  }

  @media (max-width: 768px) {
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    border-radius: 14px;
  }
`;

const CardImage = styled.div<{ image: string }>`
  height: 210px;
  background: url(${({ image }) => image}) center/cover;

  @media (max-width: 768px) {
    height: 190px;
  }

  @media (max-width: 480px) {
    height: 170px;
  }
`;

const CardContent = styled.div`
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 1024px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.1rem;
  }
`;

const CardType = styled.span<{ type: string }>`
  background: ${({ type }) => {
    switch (type) {
      case 'camp':
        return '#4a90e2';
      case 'course':
        return '#7b68ee';
      case 'workshop':
        return '#50c878';
      case 'competition':
        return '#f39c12';
      case 'volunteer':
        return '#27ae60';
      default:
        return '#4a90e2';
    }
  }};
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.1rem;

  @media (max-width: 480px) {
    font-size: 0.82rem;
    padding: 0.3rem 0.7rem;
  }
`;

const CardTitle = styled.h4`
  color: #1f2a36;
  margin-bottom: 0.85rem;
  line-height: 1.5;
  font-size: clamp(1.05rem, 2.2vw, 1.3rem);
  font-weight: 700;
`;

const CardDescription = styled.p`
  color: #617187;
  line-height: 1.75;
  margin-bottom: 1.5rem;
  font-size: clamp(0.95rem, 1.9vw, 1.025rem);

  @media (max-width: 480px) {
    margin-bottom: 1.25rem;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.1rem;
  border-top: 1px solid rgba(15, 23, 42, 0.08);

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const PriceTag = styled.div`
  color: #4f5d75;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media (max-width: 600px) {
    justify-content: space-between;
  }
`;

const EnrollButton = styled.button<{ isFree?: boolean }>`
  background: ${({ isFree }) => (isFree ? '#27ae60' : '#4a90e2')};
  color: white;
  padding: 0.65rem 1.4rem;
  border: none;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  box-shadow: 0 12px 20px rgba(74, 144, 226, 0.18);

  &:hover {
    background: ${({ isFree }) => (isFree ? '#2ecc71' : '#6c63ff')};
    transform: translateY(-2px);
    box-shadow: 0 15px 26px rgba(74, 144, 226, 0.22);
  }

  @media (max-width: 600px) {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 12px;
  }
`;

const programsData = [
  {
    id: '1',
    title: 'معسكر البرمجة الشامل للمبتدئين',
    description:
      'معسكر تدريبي مكثف لمدة أسبوعين لتعلم أساسيات البرمجة وتطوير تطبيقات بسيطة.',
    type: 'camp',
    price: '1200 ريال',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800',
  },
  {
    id: '2',
    title: 'دورة تطوير تطبيقات الويب المتقدمة',
    description: 'دورة شاملة لتعلم أحدث تقنيات تطوير الويب مثل React, Node.js.',
    type: 'course',
    price: '299 ريال/شهر',
    isFree: false,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
  },
  {
    id: '3',
    title: 'ورشة الذكاء الاصطناعي للمبتدئين',
    description: 'ورشة تفاعلية لتعلم أساسيات الذكاء الاصطناعي والتعلم الآلي.',
    type: 'workshop',
    price: 'مجاني',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
  },
  {
    id: '4',
    title: 'مسابقة تطوير التطبيقات الإبداعية',
    description: 'مسابقة سنوية لتطوير تطبيقات مبتكرة مع جوائز قيمة وفرص عمل.',
    type: 'competition',
    price: 'مجاني',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
  },
  {
    id: '5',
    title: 'برنامج التطوع في التعليم التقني',
    description: 'فرصة تطوعية لتدريس الطلاب في المدارس الحكومية وتطوير مهاراتهم التقنية.',
    type: 'volunteer',
    price: 'مجاني',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  },
];

const getTypeLabel = (type: string): string => {
  switch (type) {
    case 'camp':
      return 'معسكر';
    case 'course':
      return 'دورة';
    case 'workshop':
      return 'ورشة';
    case 'competition':
      return 'مسابقة';
    case 'volunteer':
      return 'تطوع';
    default:
      return type;
  }
};

const OurPrograms = () => {
  return (
    <Container>
      <Hero>
        <Inner>
          <Title>برامجنا</Title>
          <Subtitle>
            اكتشف مجموعة متنوعة من البرامج التدريبية والمعسكرات والفرص المتاحة من مبادرة هيمنة النجاح.
            برامج مجانية ومدفوعة لجميع المستويات مع متابعة وإرشاد مستمر.
          </Subtitle>
        </Inner>
      </Hero>

      <Content>
        <Inner>
          <StatsGrid>
            <StatItem
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <StatNumber>25+</StatNumber>
              <StatLabel>برنامج تدريبي</StatLabel>
            </StatItem>

            <StatItem
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StatNumber>100000+</StatNumber>
              <StatLabel>مشارك ناجح</StatLabel>
            </StatItem>

            <StatItem
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StatNumber>15</StatNumber>
              <StatLabel>برنامج مجاني</StatLabel>
            </StatItem>

            <StatItem
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StatNumber>95%</StatNumber>
              <StatLabel>معدل الرضا</StatLabel>
            </StatItem>
          </StatsGrid>

          <SectionTitle>جميع البرامج المتاحة</SectionTitle>

          <ProgramsGrid>
            {programsData.map((program, index) => (
              <ProgramCard
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                viewport={{ once: true }}
              >
                <CardImage image={program.image} />
                <CardContent>
                  <CardType type={program.type}>{getTypeLabel(program.type)}</CardType>
                  <CardTitle>{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                  <CardFooter>
                    <PriceTag>
                      <span role="img" aria-label="سعر">
                        💰
                      </span>
                      {program.price}
                    </PriceTag>
                    <EnrollButton isFree={program.isFree}>
                      {program.isFree ? 'انضم مجاناً' : 'سجل الآن'}
                    </EnrollButton>
                  </CardFooter>
                </CardContent>
              </ProgramCard>
            ))}
          </ProgramsGrid>
        </Inner>
      </Content>
    </Container>
  );
};

export default OurPrograms;
