import React from 'react';
import styled from 'styled-components';

interface LanguageSwitcherProps {
  currentLanguage: 'ar' | 'en';
  onLanguageChange: (language: 'ar' | 'en') => void;
}

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 20px;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? 'white' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  currentLanguage, 
  onLanguageChange 
}) => {
  return (
    <LanguageContainer>
      <LanguageButton
        active={currentLanguage === 'ar'}
        onClick={() => onLanguageChange('ar')}
      >
        العربية
      </LanguageButton>
      <LanguageButton
        active={currentLanguage === 'en'}
        onClick={() => onLanguageChange('en')}
      >
        English
      </LanguageButton>
    </LanguageContainer>
  );
};

export default LanguageSwitcher;
