import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const AboutContainer = styled.div`
  padding-top: 80px;
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.background} 0%, 
    ${({ theme }) => theme.colors.surface} 100%);
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textHighlight};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 600;
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxxl};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const GridReverse = styled(Grid)`
  direction: ltr;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    direction: rtl;
  }
`;

const Content = styled.div`
  direction: rtl;
`;

const ContentTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const ContentText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ImageContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ValuesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ValueCard = styled(motion.div)`
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

const ValueIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  color: white;
`;

const ValueTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const TeamSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const TeamGrid = styled.div`
  display: flex;
  overflow-x: visible;
  overflow-y: visible;
  white-space: nowrap;
  animation: scroll 20s linear infinite;
  width: 100%;
  
  &:hover {
    animation-play-state: paused;
  }
  
  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const TeamCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.small};
  transition: all 0.3s ease;
  flex-shrink: 0;
  width: 320px;
  min-width: 320px;
  height: auto;
  min-height: 400px;
  margin-right: 2rem;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  @media (max-width: 768px) {
    width: 280px;
    min-width: 280px;
    min-height: 350px;
    margin-right: 1.5rem;
  }
`;

const TeamImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
`;

const TeamInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  height: auto;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TeamName = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const TeamRole = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const TeamBio = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.6;
  margin-top: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  direction: rtl;
  max-width: 100%;
  word-wrap: break-word;
  overflow: visible;
  white-space: pre-line;
  height: auto;
`;

const OpportunitiesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const OpportunitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const OpportunityCard = styled(motion.div)`
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

const OpportunityIcon = styled.div<{ type: string }>`
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

const OpportunityTitle = styled.h4`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const OpportunityDescription = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ViewMoreButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const About: React.FC = () => {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: '🎯',
      title: t('excellence'),
      description: t('excellenceDesc')
    },
    {
      icon: '🤝',
      title: t('communityValue'),
      description: t('communityDesc')
    },
    {
      icon: '💡',
      title: t('innovation'),
      description: t('innovationDesc')
    },
    {
      icon: '🌟',
      title: t('integrity'),
      description: t('integrityDesc')
    }
  ];

  const team = [
    {
      name: t('ceoName'),
      role: t('ceoRole'),
      bio: t('ceoBio')
    },
    {
      name: t('academicLeaderName'),
      role: t('academicLeaderRole'),
      bio: t('academicLeaderBio')
    },
    {
      name: t('programManagerName'),
      role: t('programManagerRole'),
      bio: t('programManagerBio')
    },
    {
      name: t('trainerName'),
      role: t('trainerRole'),
      bio: t('trainerBio')
    },
    {
      name: t('designerName'),
      role: t('designerRole'),
      bio: t('designerBio')
    }
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t('aboutTitle')}
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('aboutSubtitle')}
          </HeroSubtitle>
        </div>
      </HeroSection>

      <ContentSection>
        <div className="container">
          <Grid>
            <Content>
              <ContentTitle>{t('vision')}</ContentTitle>
              <ContentText>
                {t('visionText')}
              </ContentText>
              <ContentText>
                {t('visionText2')}
              </ContentText>
            </Content>
            <ImageContainer>
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop" 
                alt="رؤيتنا - تمكين الشباب" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </ImageContainer>
          </Grid>

          <GridReverse>
            <ImageContainer>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop" 
                alt="رسالتنا - تطوير المهارات" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </ImageContainer>
            <Content>
              <ContentTitle>{t('mission')}</ContentTitle>
              <ContentText>
                {t('missionText')}
              </ContentText>
              <ContentText>
                {t('missionText2')}
              </ContentText>
            </Content>
          </GridReverse>

          <Grid>
            <Content>
              <ContentTitle>{t('goals')}</ContentTitle>
              <ContentText>
                • {t('goal1')}
              </ContentText>
              <ContentText>
                • {t('goal2')}
              </ContentText>
              <ContentText>
                • {t('goal3')}
              </ContentText>
              <ContentText>
                • {t('goal4')}
              </ContentText>
            </Content>
            <ImageContainer>
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                alt="أهدافنا - بناء المستقبل" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </ImageContainer>
          </Grid>
        </div>
      </ContentSection>

      <ValuesSection>
        <div className="container">
          <SectionTitle>{t('valuesTitle')}</SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueIcon>{value.icon}</ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </div>
      </ValuesSection>

      <TeamSection>
        <div className="container">
          <SectionTitle>{t('teamTitle')}</SectionTitle>
          <TeamGrid>
            {/* First set of team members */}
            {team.map((member, index) => (
              <TeamCard
                key={`first-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamImage>👤</TeamImage>
                <TeamInfo>
                  <TeamName>{member.name}</TeamName>
                  <TeamRole>{member.role}</TeamRole>
                  <TeamBio>{member.bio}</TeamBio>
                </TeamInfo>
              </TeamCard>
            ))}
            
            {/* Duplicate set for continuous scrolling */}
            {team.map((member, index) => (
              <TeamCard
                key={`second-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index + team.length) * 0.1 }}
                viewport={{ once: true }}
              >
                <TeamImage>👤</TeamImage>
                <TeamInfo>
                  <TeamName>{member.name}</TeamName>
                  <TeamRole>{member.role}</TeamRole>
                  <TeamBio>{member.bio}</TeamBio>
                </TeamInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </div>
      </TeamSection>

      <OpportunitiesSection>
        <div className="container">
          <SectionTitle>{t('opportunitiesTitle')}</SectionTitle>
          <OpportunitiesGrid>
            <OpportunityCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <OpportunityIcon type="course">🎓</OpportunityIcon>
              <OpportunityTitle>{t('coursesTitle')}</OpportunityTitle>
              <OpportunityDescription>
                {t('coursesDesc')}
              </OpportunityDescription>
            </OpportunityCard>

            <OpportunityCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <OpportunityIcon type="competition">🏆</OpportunityIcon>
              <OpportunityTitle>{t('competitionsTitle')}</OpportunityTitle>
              <OpportunityDescription>
                {t('competitionsDesc')}
              </OpportunityDescription>
            </OpportunityCard>

            <OpportunityCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <OpportunityIcon type="volunteer">🤝</OpportunityIcon>
              <OpportunityTitle>{t('volunteerTitle')}</OpportunityTitle>
              <OpportunityDescription>
                {t('volunteerDesc')}
              </OpportunityDescription>
            </OpportunityCard>
          </OpportunitiesGrid>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <ViewMoreButton to="/opportunities">{t('viewAllOpportunities')}</ViewMoreButton>
          </div>
        </div>
      </OpportunitiesSection>
    </AboutContainer>
  );
};

export default About;
