import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.text};
  color: white;
  padding: ${({ theme }) => theme.spacing.xxxl} 0 ${({ theme }) => theme.spacing.lg};
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  direction: rtl;
`;

const FooterLogo = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  img {
    height: 50px;
    width: auto;
    filter: brightness(0) invert(1);
  }
`;

const FooterTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const FooterLinks = styled.ul`
  list-style: none;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  display: block;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FooterText = styled.p`
  color: ${({ theme }) => theme.colors.background};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-3px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.background};
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterLogo>
              <img src="/logo-with-name.png" alt="هيمنة النجاح" />
            </FooterLogo>
            <FooterTitle>هيمنة النجاح</FooterTitle>
            <FooterText>
              مبادرة رائدة لتمكين الشباب وتحقيق أحلامهم من خلال برامج تدريبية متخصصة
              ومجتمع داعم يساعدهم على الوصول إلى أهدافهم.
            </FooterText>
            <SocialLinks>
              <SocialLink href="#" aria-label="فيسبوك">📘</SocialLink>
              <SocialLink href="#" aria-label="تويتر">🐦</SocialLink>
              <SocialLink href="#" aria-label="لينكد إن">💼</SocialLink>
              <SocialLink href="#" aria-label="إنستغرام">📷</SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>روابط سريعة</FooterTitle>
            <FooterLinks>
              <li><FooterLink to="/">الرئيسية</FooterLink></li>
              <li><FooterLink to="/about">عن المبادرة</FooterLink></li>
              <li><FooterLink to="/programs">البرامج</FooterLink></li>
              <li><FooterLink to="/opportunities">الفرص المتاحة</FooterLink></li>
              <li><FooterLink to="/news">الأخبار</FooterLink></li>
              <li><FooterLink to="/contact">اتصل بنا</FooterLink></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>البرامج</FooterTitle>
            <FooterLinks>
              <li><FooterLink to="/programs">القيادة الفعالة</FooterLink></li>
              <li><FooterLink to="/programs">تطوير المهارات</FooterLink></li>
              <li><FooterLink to="/programs">إدارة الوقت</FooterLink></li>
              <li><FooterLink to="/programs">التخطيط الاستراتيجي</FooterLink></li>
              <li><FooterLink to="/programs">التواصل الفعال</FooterLink></li>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>معلومات التواصل</FooterTitle>
            <FooterText>
              📍 شارع الملك فهد، الرياض<br />
              📧 info@haymanh-success.com<br />
              📞 +966 11 123 4567<br />
              ⏰ الأحد - الخميس: 8:00 ص - 6:00 م
            </FooterText>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <FooterText>
            © 2024 مبادرة هيمنة النجاح. جميع الحقوق محفوظة.
          </FooterText>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

export default Footer;
