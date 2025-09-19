import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import AuthModal from './AuthModal';
import UserSettings from './UserSettings';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.small};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  direction: rtl;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  position: relative;

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    flex-wrap: nowrap;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  
  img {
    height: 40px;
    width: auto;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.05);
  }

  @media (max-width: 1024px) {
    img {
      height: 35px;
    }
  }

  @media (max-width: 768px) {
    img {
      height: 32px;
    }
  }

  @media (max-width: 480px) {
    img {
      height: 28px;
    }
  }
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
  justify-content: center;

  @media (max-width: 1024px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    gap: ${({ theme }) => theme.spacing.sm};
    z-index: 999;
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  transition: all 0.3s ease;
  position: relative;
  white-space: nowrap;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: 1rem;
    width: 100%;
    text-align: center;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin: 2px 0;
    
    &::after {
      display: none;
    }
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: 0.95rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ isActive }) => (isActive ? '100%' : '0')};
    height: 2px;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;

  @media (max-width: 1024px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    gap: ${({ theme }) => theme.spacing.xs};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xs};
    gap: 4px;
  }
`;

const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.75rem;
  cursor: pointer;
`;

const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

const SettingsButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 16px;
  margin: 0 8px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-1px);
  }
`;

const LogoutButton = styled.button`
  background: rgba(220, 38, 38, 0.8);
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.75rem;

  &:hover {
    background: rgba(220, 38, 38, 1);
    transform: translateY(-1px);
  }
`;

const LoginButton = styled.button`
  background: #4A90E2;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #357ABD;
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 6px 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 4px 8px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: 768px) {
    display: block;
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: 6px;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const navItems = [
    { path: '/', label: t('home') },
    { path: '/about', label: t('about') },
    { path: '/programs', label: t('programs') },
    { path: '/opportunities', label: t('opportunities') },
    { path: '/community', label: t('community') },
    { path: '/news', label: t('news') },
    { path: '/blog', label: t('blog') },
    { path: '/contact', label: t('contact') },
  ];

  return (
    <HeaderContainer>
      <div className="container">
        <Nav>
          <Logo to="/">
            <img src="/logo-with-name.png" alt="هيمنة النجاح" />
          </Logo>

          <NavLinks isOpen={isMenuOpen}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                isActive={location.pathname === item.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </NavLinks>

          <RightSection>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" isActive={location.pathname === '/dashboard'}>
                  {t('dashboard')}
                </NavLink>
                <UserMenu>
                  <UserAvatar>{user?.avatar}</UserAvatar>
                  <UserName>{user?.name}</UserName>
                  <SettingsButton onClick={() => setShowSettings(true)}>
                    ⚙️
                  </SettingsButton>
                  <LogoutButton onClick={logout}>{t('logout')}</LogoutButton>
                </UserMenu>
              </>
            ) : (
              <LoginButton onClick={handleLoginClick}>
                {t('register')}
              </LoginButton>
            )}
            
            <MobileMenuButton onClick={toggleMenu}>
              {isMenuOpen ? '✕' : '☰'}
            </MobileMenuButton>
          </RightSection>
        </Nav>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
      
      <UserSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </HeaderContainer>
  );
};

export default Header;
