import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';

interface UserSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const SettingsModal = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.large};
`;

const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SettingsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;

const SettingsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const LanguageButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.surface : theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const ThemeButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ThemeButton = styled.button<{ active: boolean }>`
  background: ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => active ? theme.colors.surface : theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const ToggleSwitch = styled.input.attrs({ type: 'checkbox' })`
  position: relative;
  width: 50px;
  height: 24px;
  appearance: none;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:checked {
    background: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  &:checked::before {
    transform: translateX(26px);
  }
`;

const SelectInput = styled.select`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResetButton = styled.button`
  background: ${({ theme }) => theme.colors.error};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 14px;
  margin-top: ${({ theme }) => theme.spacing.xl};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const UserSettings: React.FC<UserSettingsProps> = ({ isOpen, onClose }) => {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { settings, updateSetting, resetSettings } = useSettings();
  const { isAuthenticated } = useAuth();

  const handleLanguageChange = (newLanguage: 'ar' | 'en') => {
    setLanguage(newLanguage);
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  const handleNotificationChange = (enabled: boolean) => {
    updateSetting('notifications', enabled);
    if (enabled && 'Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('تم تفعيل الإشعارات', {
            body: 'ستتلقى الآن إشعارات من الموقع',
            icon: '/logo192.png'
          });
        }
      });
    }
  };

  const handleEmailUpdatesChange = (enabled: boolean) => {
    updateSetting('emailUpdates', enabled);
    if (enabled) {
      // يمكن إضافة منطق إرسال البريد الإلكتروني هنا
      console.log('تم تفعيل تحديثات البريد الإلكتروني');
    }
  };

  const handleAutoSaveChange = (enabled: boolean) => {
    updateSetting('autoSave', enabled);
    if (enabled) {
      // يمكن إضافة منطق الحفظ التلقائي هنا
      console.log('تم تفعيل الحفظ التلقائي');
    }
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    updateSetting('fontSize', size);
    // سيتم تطبيق حجم الخط تلقائياً عبر CSS custom properties
  };

  const handleAnimationsChange = (enabled: boolean) => {
    updateSetting('animations', enabled);
    if (!enabled) {
      // إيقاف جميع الرسوم المتحركة
      document.body.style.setProperty('--animation-duration', '0s');
      document.body.style.setProperty('--transition-duration', '0s');
    } else {
      // إعادة تفعيل الرسوم المتحركة
      document.body.style.removeProperty('--animation-duration');
      document.body.style.removeProperty('--transition-duration');
    }
  };

  const handleResetSettings = () => {
    // إعادة تعيين الإعدادات العامة
    resetSettings();
    
    // إعادة تعيين اللغة للعربية
    setLanguage('ar');
    
    // إعادة تعيين الثيم للفاتح
    setTheme('light');
    
    // إعادة تعيين الرسوم المتحركة
    document.body.style.removeProperty('--animation-duration');
    document.body.style.removeProperty('--transition-duration');
  };

  return (
    <SettingsOverlay isOpen={isOpen} onClick={onClose}>
      <SettingsModal onClick={(e) => e.stopPropagation()}>
        <SettingsHeader>
          <SettingsTitle>{t('settings')}</SettingsTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </SettingsHeader>

        <SettingsSection>
          <SectionTitle>{t('language')}</SectionTitle>
          <SettingItem>
            <SettingLabel>{t('selectLanguage')}</SettingLabel>
            <LanguageButtons>
              <LanguageButton
                active={language === 'ar'}
                onClick={() => handleLanguageChange('ar')}
              >
                العربية
              </LanguageButton>
              <LanguageButton
                active={language === 'en'}
                onClick={() => handleLanguageChange('en')}
              >
                English
              </LanguageButton>
            </LanguageButtons>
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>{t('theme')}</SectionTitle>
          <SettingItem>
            <SettingLabel>{t('selectTheme')}</SettingLabel>
            <ThemeButtons>
              <ThemeButton
                active={theme === 'light'}
                onClick={() => handleThemeChange('light')}
              >
                {t('light')}
              </ThemeButton>
              <ThemeButton
                active={theme === 'dark'}
                onClick={() => handleThemeChange('dark')}
              >
                {t('dark')}
              </ThemeButton>
            </ThemeButtons>
          </SettingItem>
        </SettingsSection>

        {isAuthenticated && (
          <SettingsSection>
            <SectionTitle>{t('notifications')}</SectionTitle>
            <SettingItem>
              <SettingLabel>{t('enableNotifications')}</SettingLabel>
              <ToggleSwitch
                checked={settings.notifications}
                onChange={(e) => handleNotificationChange(e.target.checked)}
              />
            </SettingItem>
            <SettingItem>
              <SettingLabel>{t('emailUpdates')}</SettingLabel>
              <ToggleSwitch
                checked={settings.emailUpdates}
                onChange={(e) => handleEmailUpdatesChange(e.target.checked)}
              />
            </SettingItem>
          </SettingsSection>
        )}

        {!isAuthenticated && (
          <SettingsSection>
            <SectionTitle>الإعدادات الشخصية</SectionTitle>
            <div style={{ 
              padding: '16px', 
              background: '#f0f9ff', 
              borderRadius: '8px', 
              textAlign: 'center',
              color: '#0369a1'
            }}>
              <p>🔐 سجل دخولك للوصول إلى الإعدادات الشخصية مثل الإشعارات وتحديثات البريد الإلكتروني</p>
            </div>
          </SettingsSection>
        )}

        <SettingsSection>
          <SectionTitle>{t('accessibility')}</SectionTitle>
          <SettingItem>
            <SettingLabel>{t('fontSize')}</SettingLabel>
            <SelectInput
              value={settings.fontSize}
              onChange={(e) => handleFontSizeChange(e.target.value as 'small' | 'medium' | 'large')}
            >
              <option value="small">{t('small')}</option>
              <option value="medium">{t('medium')}</option>
              <option value="large">{t('large')}</option>
            </SelectInput>
          </SettingItem>
          <SettingItem>
            <SettingLabel>{t('animations')}</SettingLabel>
            <ToggleSwitch
              checked={settings.animations}
              onChange={(e) => handleAnimationsChange(e.target.checked)}
            />
          </SettingItem>
        </SettingsSection>

        <SettingsSection>
          <SectionTitle>{t('general')}</SectionTitle>
          <SettingItem>
            <SettingLabel>{t('autoSave')}</SettingLabel>
            <ToggleSwitch
              checked={settings.autoSave}
              onChange={(e) => handleAutoSaveChange(e.target.checked)}
            />
          </SettingItem>
        </SettingsSection>

        <ResetButton onClick={handleResetSettings}>
          {t('resetSettings')}
        </ResetButton>
      </SettingsModal>
    </SettingsOverlay>
  );
};

export default UserSettings;
