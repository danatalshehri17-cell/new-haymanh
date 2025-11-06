import React from 'react';
import styled from 'styled-components';

const AdminActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #c53030;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(229, 62, 62, 0.3);
  }
`;

const SettingsButton = styled.button`
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #2d3748;
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(74, 85, 104, 0.3);
  }
`;

interface AdminButtonsProps {
  onSettings: () => void;
  onLogout: () => void;
}

const AdminButtons= ({ onSettings, onLogout }) => {
  return (
    <AdminActions>
      <SettingsButton onClick={onSettings}>
        ⚙️ الإعدادات
      </SettingsButton>
      <LogoutButton onClick={onLogout}>
        🚪 تسجيل الخروج
      </LogoutButton>
    </AdminActions>
  );
};

export default AdminButtons;
