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

const Footer = () => {
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
              <SocialLink href="https://www.instagram.com/haymant2030_/" target="_blank" rel="noopener noreferrer" aria-label="إنستغرام">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@haymant2030" target="_blank" rel="noopener noreferrer" aria-label="يوتيوب">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://x.com/haymant2030" target="_blank" rel="noopener noreferrer" aria-label="تويتر">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@haymant2030" target="_blank" rel="noopener noreferrer" aria-label="تيك توك">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </SocialLink>
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
              📍 المملكة العربية السعودية<br />
              📧 mbadrt04@gmail.com<br />
              📱 تليغرام: <a href="https://t.me/Haymant2030" target="_blank" rel="noopener noreferrer">@Haymant2030</a><br />
              ⏰ 24 ساعة طوال أيام الأسبوع
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
