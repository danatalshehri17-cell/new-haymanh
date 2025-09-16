import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationContainer = styled.div`
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 1500;
  max-width: 400px;
  direction: rtl;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

const NotificationItem = styled(motion.div)<{ type: string }>`
  background: ${({ theme, type }) => {
    switch (type) {
      case 'success': return theme.colors.success;
      case 'info': return theme.colors.primary;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      default: return theme.colors.primary;
    }
  }};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const NotificationTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
`;

const NotificationTime = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  opacity: 0.8;
  white-space: nowrap;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.4;
  opacity: 0.9;
`;

const NotificationAction = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius.round};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const NotificationIcon = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const NotificationContent = styled.div`
  margin-right: 40px;
`;

const NotificationSystem: React.FC<NotificationSystemProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  const [visibleNotifications, setVisibleNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setVisibleNotifications(notifications.slice(0, 3));
  }, [notifications]);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }
    if (notification.action) {
      notification.action.onClick();
    }
  };

  const formatTime = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    return timestamp.toLocaleDateString('ar-SA');
  };

  const getNotificationIcon = (type: string): string => {
    switch (type) {
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  if (visibleNotifications.length === 0) return null;

  return (
    <NotificationContainer>
      <AnimatePresence>
        {visibleNotifications.map((notification, index) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: 'spring',
              stiffness: 200
            }}
            onClick={() => handleNotificationClick(notification)}
            style={{ 
              opacity: notification.isRead ? 0.7 : 1,
              filter: notification.isRead ? 'grayscale(0.3)' : 'none'
            }}
          >
            <NotificationIcon>
              {getNotificationIcon(notification.type)}
            </NotificationIcon>
            
            <NotificationContent>
              <NotificationHeader>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationTime>{formatTime(notification.timestamp)}</NotificationTime>
              </NotificationHeader>
              
              <NotificationMessage>{notification.message}</NotificationMessage>
              
              {notification.action && (
                <NotificationAction onClick={(e) => {
                  e.stopPropagation();
                  notification.action!.onClick();
                }}>
                  {notification.action.label}
                </NotificationAction>
              )}
            </NotificationContent>

            <CloseButton
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
            >
              ✕
            </CloseButton>
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationContainer>
  );
};

export default NotificationSystem;
