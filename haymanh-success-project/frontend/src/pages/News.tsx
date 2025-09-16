import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NewsContainer = styled.div`
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

const NewsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const NewsCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const NewsImage = styled.div`
  height: 200px;
  background: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

const NewsContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const NewsDate = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
`;

const NewsTitle = styled.h3`
  margin: ${({ theme }) => theme.spacing.sm} 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const NewsExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ReadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
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

const News: React.FC = () => {
  const news = [
    {
      id: 1,
      title: 'إطلاق برنامج القيادة الجديد',
      excerpt: 'أطلقنا برنامج القيادة الفعالة الجديد الذي يساعد المشاركين على تطوير مهارات القيادة',
      date: '15 ديسمبر 2024',
      icon: '📢'
    },
    {
      id: 2,
      title: 'نجاح الدفعة الأولى من المشاركين',
      excerpt: 'احتفلنا بتخرج الدفعة الأولى من المشاركين في برنامج تطوير المهارات الشخصية',
      date: '10 ديسمبر 2024',
      icon: '🎓'
    },
    {
      id: 3,
      title: 'شراكة جديدة مع جامعة محلية',
      excerpt: 'وقعنا شراكة استراتيجية مع جامعة محلية لتطوير برامج تدريبية متخصصة',
      date: '5 ديسمبر 2024',
      icon: '🤝'
    },
    {
      id: 4,
      title: 'ورشة عمل مجانية في إدارة الوقت',
      excerpt: 'نظمنا ورشة عمل مجانية حول إدارة الوقت والإنتاجية حضرها أكثر من 100 شخص',
      date: '1 ديسمبر 2024',
      icon: '⏰'
    },
    {
      id: 5,
      title: 'تطوير منصة التعلم الإلكتروني',
      excerpt: 'أطلقنا منصة تعلم إلكترونية جديدة لتسهيل الوصول للبرامج التدريبية',
      date: '25 نوفمبر 2024',
      icon: '💻'
    },
    {
      id: 6,
      title: 'مشاركة في مؤتمر التطوير المهني',
      excerpt: 'شاركنا في مؤتمر التطوير المهني الدولي وعرضنا تجربتنا في تمكين الشباب',
      date: '20 نوفمبر 2024',
      icon: '🌍'
    }
  ];

  return (
    <NewsContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            آخر الأخبار والتحديثات
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            تعرف على آخر أخبار مبادرة هيمنة النجاح والتحديثات في برامجنا التدريبية
          </HeroSubtitle>
        </div>
      </HeroSection>

      <NewsSection>
        <div className="container">
          <NewsGrid>
            {news.map((item, index) => (
              <NewsCard
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <NewsImage>{item.icon}</NewsImage>
                <NewsContent>
                  <NewsDate>{item.date}</NewsDate>
                  <NewsTitle>{item.title}</NewsTitle>
                  <NewsExcerpt>{item.excerpt}</NewsExcerpt>
                  <ReadMoreButton>اقرأ المزيد</ReadMoreButton>
                </NewsContent>
              </NewsCard>
            ))}
          </NewsGrid>
        </div>
      </NewsSection>
    </NewsContainer>
  );
};

export default News;
