import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from '../components/AuthModal';

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const endTime = startTime + duration * 1000;
      
      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * value);
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, value, duration]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      <span style={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
        {count}{suffix}
      </span>
    </motion.div>
  );
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut"
    }
  }
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const rotateAnimation = {
  animate: {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear" as const
    }
  }
};

const bounceAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const HomeContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled(motion.section)`
  background: linear-gradient(135deg, #4C1D95 0%, #DC2626 100%);
  color: white;
  padding: 0;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(20px) rotate(-1deg); }
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const HeroTopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    text-align: center;
  }
`;

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeroCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeroRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeroLogo = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  img {
    height: 200px;
    width: auto;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
    transition: all 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1) rotate(5deg);
    filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.4));
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: 700;
  line-height: 1.2;
  color: white;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
  color: white;
  font-weight: 400;
  max-width: 500px;
  text-align: center;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  button {
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  }
`;



const PrimaryButton = styled(Link)`
  background: linear-gradient(135deg, #FF6B35 0%, #DC2626 100%);
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: 12px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);

  &:hover {
    background: linear-gradient(135deg, #FF8A50 0%, #EF4444 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  }
`;

const SecondaryButton = styled(Link)`
  background: linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%);
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: 12px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(76, 29, 149, 0.3);

  &:hover {
    background: linear-gradient(135deg, #5B21B6 0%, #8B5CF6 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(76, 29, 149, 0.4);
  }
`;

const LoginButton = styled.button`
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: 12px;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);

  &:hover {
    background: linear-gradient(135deg, #34D399 0%, #10B981 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  }
`;

const ContentCard = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%);
  padding: ${({ theme }) => theme.spacing.xxl};
  border-radius: 20px;
  text-align: center;
  border: 2px solid rgba(255, 107, 53, 0.3);
  backdrop-filter: blur(15px);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 280px;
  max-height: 320px;
  margin: 0;
  box-shadow: 0 8px 32px rgba(255, 107, 53, 0.2);

  &:hover {
    transform: translateY(-8px);
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.25) 0%, rgba(220, 38, 38, 0.25) 100%);
    border-color: rgba(255, 107, 53, 0.5);
    box-shadow: 0 12px 40px rgba(255, 107, 53, 0.3);
  }
`;

const CardIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: white;
  font-weight: 600;
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.6;
`;

const BottomCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 20px;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 180px;
  max-height: 220px;
  margin: 0;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const BottomCardIcon = styled.div`
  font-size: 3rem;
  flex-shrink: 0;
`;

const BottomCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const BottomCardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: white;
  font-weight: 600;
  margin: 0;
`;

const BottomCardDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
  margin: 0;
`;

const BottomCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 100%;
  margin: 0;
  width: 100%;
  padding: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const FeaturesSection = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: white;
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: -1;
  }
`;

const StatIcon = styled(motion.div)`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 800;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    z-index: -1;
    animation: pulse 2s ease-in-out infinite;
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.5;
    }
    50% { 
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.8;
    }
  }
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: #E0E7FF;
  font-weight: 500;
`;

const PartnersSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background: linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%);
  color: white;
`;

const PartnersSectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  color: white;
  font-weight: 700;
`;

const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const PartnerCard = styled(motion.div)`
  background: linear-gradient(135deg, #4C1D95 0%, #DC2626 100%);
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const PartnerLogo = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #059669 0%, #10B981 100%);
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  font-size: 2.5rem;
  color: white;
`;

const PartnerName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: white;
  font-weight: 600;
`;

const PartnerDescription = styled.p`
  color: #E0E7FF;
  line-height: 1.6;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const OpportunitiesPreviewSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const OpportunitiesPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const OpportunityPreviewCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const OpportunityPreviewIcon = styled.div<{ type: string }>`
  width: 80px;
  height: 80px;
  background: ${({ theme, type }) => {
    switch (type) {
      case 'course': return theme.colors.primary;
      case 'competition': return theme.colors.secondary;
      case 'volunteer': return theme.colors.accent;
      default: return theme.colors.primary;
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: white;
`;

const OpportunityPreviewTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const OpportunityPreviewDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ViewAllButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const NewsletterSection = styled.section`
  background: linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%);
  padding: 80px 0;
  text-align: center;
`;

const NewsletterContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const NewsletterDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const NewsletterForm = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 25px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(76, 29, 149, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const NewsletterButton = styled.button`
  background: linear-gradient(135deg, #4C1D95 0%, #DC2626 100%);
  color: white;
  padding: 16px 32px;
  border: none;
  border-radius: 25px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(76, 29, 149, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NewsletterNote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
  font-style: italic;
`;

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubscribe = async () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert(t('emailRequired'));
      return;
    }
    
    try {
      // هنا يمكن إضافة منطق إرسال البريد الإلكتروني للباك اند
      alert(t('newsletterSuccess'));
      setNewsletterEmail('');
    } catch (error) {
      alert(t('newsletterError'));
    }
  };

  console.log('Home component rendered, isAuthenticated:', isAuthenticated);

  useEffect(() => {
    console.log('showAuthModal changed to:', showAuthModal);
  }, [showAuthModal]);

  const handleLoginClick = () => {
    console.log('Login button clicked!');
    setAuthMode('login');
    setShowAuthModal(true);
    console.log('showAuthModal set to:', true);
    console.log('About to set showAuthModal to true');
  };

  const features = [
    {
      icon: '🎯',
      title: t('clearVision'),
      description: t('clearVisionDesc')
    },
    {
      icon: '🚀',
      title: t('skillDevelopment'),
      description: t('skillDevelopmentDesc')
    },
    {
      icon: '🤝',
      title: t('communitySupport'),
      description: t('communitySupportDesc')
    },
    {
      icon: '📈',
      title: t('guaranteedResults'),
      description: t('guaranteedResultsDesc')
    }
  ];

  const stats = [
    { number: t('studentsCount'), label: t('studentsLabel') },
    { number: t('programsCount'), label: t('programsLabel') },
    { number: t('successRate'), label: t('successRateLabel') },
    { number: '24/7', label: t('supportLabel') }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <div className="container">
          <HeroContent>
            <HeroTopSection>
              <HeroLeft>
                <ContentCard
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <CardIcon>🎯</CardIcon>
                  <CardTitle>{t('clearVision')}</CardTitle>
                  <CardDescription>{t('clearVisionDesc')}</CardDescription>
                </ContentCard>
              </HeroLeft>
              
              <HeroCenter>
                <HeroLogo
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <img src="/logo-only.png" alt={t('heroTitle')} />
                </HeroLogo>
                
                <HeroTitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {t('heroTitle')}
                </HeroTitle>
              </HeroCenter>
              
              <HeroRight>
                <ContentCard
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <CardIcon>🚀</CardIcon>
                  <CardTitle>{t('skillDevelopment')}</CardTitle>
                  <CardDescription>{t('skillDevelopmentDesc')}</CardDescription>
                </ContentCard>
              </HeroRight>
            </HeroTopSection>
            
            <HeroSubtitle
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {t('heroDescription')}
            </HeroSubtitle>
            
            <HeroButtons
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {!isAuthenticated ? (
                <>
                  <PrimaryButton to="/programs">{t('programs')}</PrimaryButton>
                  <LoginButton onClick={handleLoginClick}>{t('register')}</LoginButton>
                </>
              ) : (
                <PrimaryButton to="/dashboard">{t('dashboard')}</PrimaryButton>
              )}
            </HeroButtons>
          </HeroContent>
        </div>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <SectionTitle>لماذا تختار مبادرة هيمنة النجاح؟</SectionTitle>
          <FeaturesGrid>
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>رؤية واضحة</FeatureTitle>
              <FeatureDescription>نساعدك في تحديد أهدافك ووضع خطة واضحة لتحقيق النجاح</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>🚀</FeatureIcon>
              <FeatureTitle>تطوير المهارات</FeatureTitle>
              <FeatureDescription>برامج تدريبية متخصصة لتنمية قدراتك ومهاراتك</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>🤝</FeatureIcon>
              <FeatureTitle>{t('communitySupport')}</FeatureTitle>
              <FeatureDescription>{t('communitySupportDesc')}</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>📈</FeatureIcon>
              <FeatureTitle>{t('guaranteedResults')}</FeatureTitle>
              <FeatureDescription>{t('guaranteedResultsDesc')}</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>🏆</FeatureIcon>
              <FeatureTitle>{t('certifiedCertificates')}</FeatureTitle>
              <FeatureDescription>{t('certifiedCertificatesDesc')}</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <FeatureIcon>💡</FeatureIcon>
              <FeatureTitle>{t('qualityContent')}</FeatureTitle>
              <FeatureDescription>{t('qualityContentDesc')}</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <StatsSection>
        <div className="container">
          <StatsGrid>
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <StatIcon
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                👥
              </StatIcon>
              <StatNumber>
                <AnimatedCounter value={1000} suffix="+" duration={2} />
              </StatNumber>
              <StatLabel>{t('studentsLabel')}</StatLabel>
            </StatItem>
            
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <StatIcon
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                📚
              </StatIcon>
              <StatNumber>
                <AnimatedCounter value={50} suffix="+" duration={1.5} />
              </StatNumber>
              <StatLabel>{t('programsLabel')}</StatLabel>
            </StatItem>
            
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <StatIcon
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                ⭐
              </StatIcon>
              <StatNumber>
                <AnimatedCounter value={95} suffix="%" duration={1.5} />
              </StatNumber>
              <StatLabel>{t('successRateLabel')}</StatLabel>
            </StatItem>
            
            <StatItem
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <StatIcon
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🕐
              </StatIcon>
              <StatNumber>
                <AnimatedCounter value={24} suffix="/7" duration={1} />
              </StatNumber>
              <StatLabel>{t('supportLabel')}</StatLabel>
            </StatItem>
          </StatsGrid>
        </div>
      </StatsSection>

      <NewsletterSection>
        <div className="container">
          <SectionTitle>{t('newsletterTitle')}</SectionTitle>
          <NewsletterContent>
            <NewsletterDescription>
              {t('newsletterSubtitle')}
            </NewsletterDescription>
            <NewsletterForm>
              <NewsletterInput 
                type="email" 
                placeholder={t('newsletterPlaceholder')}
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <NewsletterButton onClick={handleNewsletterSubscribe}>
                {t('newsletterButton')}
              </NewsletterButton>
            </NewsletterForm>
            <NewsletterNote>
              * {t('newsletterNote')}
            </NewsletterNote>
          </NewsletterContent>
        </div>
      </NewsletterSection>

      <PartnersSection>
        <div className="container">
          <PartnersSectionTitle>{t('partnersTitle')}</PartnersSectionTitle>
          <PartnersGrid>
            <PartnerCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <PartnerLogo>
                <img 
                  src="/logopartener.jpg" 
                  alt="جمعية وطن طموح" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    objectPosition: 'center center',
                    borderRadius: '50%'
                  }}
                />
              </PartnerLogo>
              <PartnerName>{t('partnerName')}</PartnerName>
              <PartnerDescription>{t('partnerDescription')}</PartnerDescription>
            </PartnerCard>
          </PartnersGrid>
        </div>
      </PartnersSection>

      <OpportunitiesPreviewSection>
        <div className="container">
          <SectionTitle>{t('opportunitiesPreviewTitle')}</SectionTitle>
          <OpportunitiesPreviewGrid>
            <OpportunityPreviewCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <OpportunityPreviewIcon type="course">🎓</OpportunityPreviewIcon>
              <OpportunityPreviewTitle>{t('coursesPreviewTitle')}</OpportunityPreviewTitle>
              <OpportunityPreviewDescription>
                {t('coursesPreviewDesc')}
              </OpportunityPreviewDescription>
            </OpportunityPreviewCard>

            <OpportunityPreviewCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <OpportunityPreviewIcon type="competition">🏆</OpportunityPreviewIcon>
              <OpportunityPreviewTitle>{t('competitionsPreviewTitle')}</OpportunityPreviewTitle>
              <OpportunityPreviewDescription>
                {t('competitionsPreviewDesc')}
              </OpportunityPreviewDescription>
            </OpportunityPreviewCard>

            <OpportunityPreviewCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <OpportunityPreviewIcon type="volunteer">🤝</OpportunityPreviewIcon>
              <OpportunityPreviewTitle>{t('volunteerPreviewTitle')}</OpportunityPreviewTitle>
              <OpportunityPreviewDescription>
                {t('volunteerPreviewDesc')}
              </OpportunityPreviewDescription>
            </OpportunityPreviewCard>
          </OpportunitiesPreviewGrid>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <ViewAllButton to="/opportunities">{t('viewAllOpportunities')}</ViewAllButton>
          </div>
        </div>
      </OpportunitiesPreviewSection>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          console.log('Closing modal, setting showAuthModal to false');
          setShowAuthModal(false);
        }}
        mode={authMode}
        onModeChange={(mode) => {
          console.log('Mode changed to:', mode);
          setAuthMode(mode);
        }}
      />
    </HomeContainer>
  );
};

export default Home;