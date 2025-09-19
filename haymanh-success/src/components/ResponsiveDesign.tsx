import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { motion } from 'framer-motion';

interface ResponsiveDesignProps {
  children: React.ReactNode;
}

const ResponsiveContainer = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
`;

const ResponsiveGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(${({ columns }) => Math.min(columns, 3)}, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(${({ columns }) => Math.min(columns, 2)}, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const ResponsiveFlex = styled.div<{ 
  direction?: 'row' | 'column';
  gap?: string;
  align?: string;
  justify?: string;
}>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  gap: ${({ gap, theme }) => gap || theme.spacing.md};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: ${({ direction }) => 
      direction === 'row' ? 'column' : direction || 'column'};
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const ResponsiveText = styled.div<{ 
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display';
  mobileSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'display';
}>`
  font-size: ${({ theme, size }) => theme.fontSizes[size]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme, mobileSize, size }) => 
      mobileSize ? theme.fontSizes[mobileSize] : theme.fontSizes[size]};
  }
`;

const ResponsiveSpacing = styled.div<{ 
  padding?: string;
  margin?: string;
  mobilePadding?: string;
  mobileMargin?: string;
}>`
  padding: ${({ padding, theme }) => padding || theme.spacing.md};
  margin: ${({ margin, theme }) => margin || theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ mobilePadding, padding, theme }) => 
      mobilePadding || padding || theme.spacing.sm};
    margin: ${({ mobileMargin, margin, theme }) => 
      mobileMargin || margin || theme.spacing.sm};
  }
`;

const ResponsiveImage = styled.img<{ 
  maxWidth?: string;
  mobileMaxWidth?: string;
}>`
  max-width: ${({ maxWidth }) => maxWidth || '100%'};
  height: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: ${({ mobileMaxWidth, maxWidth }) => 
      mobileMaxWidth || maxWidth || '100%'};
  }
`;

const ResponsiveButton = styled.button<{ 
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  padding: ${({ theme, size }) => {
    switch (size) {
      case 'small': return `${theme.spacing.sm} ${theme.spacing.md}`;
      case 'large': return `${theme.spacing.lg} ${theme.spacing.xxl}`;
      default: return `${theme.spacing.md} ${theme.spacing.lg}`;
    }
  }};
  font-size: ${({ theme, size }) => {
    switch (size) {
      case 'small': return theme.fontSizes.sm;
      case 'large': return theme.fontSizes.lg;
      default: return theme.fontSizes.md;
    }
  }};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
    padding: ${({ theme, size }) => {
      switch (size) {
        case 'small': return `${theme.spacing.xs} ${theme.spacing.sm}`;
        case 'large': return `${theme.spacing.md} ${theme.spacing.xl}`;
        default: return `${theme.spacing.sm} ${theme.spacing.md}`;
      }
    }};
  }
`;

const ResponsiveCard = styled.div<{ 
  padding?: string;
  mobilePadding?: string;
}>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  padding: ${({ padding, theme }) => padding || theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ mobilePadding, padding, theme }) => 
      mobilePadding || padding || theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
  }
`;

const ResponsiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const ResponsiveNavigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.surface};
    flex-direction: column;
    padding: ${({ theme }) => theme.spacing.lg};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    z-index: 1000;
  }
`;

const ResponsiveSidebar = styled.aside<{ isOpen: boolean }>`
  width: 300px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 2px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
  transition: transform 0.3s ease;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
  }
`;

const ResponsiveOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
`;

const ResponsiveDesign: React.FC<ResponsiveDesignProps> = ({ children }) => {
  // const [isMobile, setIsMobile] = useState(false);
  // const [isTablet, setIsTablet] = useState(false);
  // const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      // const width = window.innerWidth;
      // setIsMobile(width < 768);
      // setIsTablet(width >= 768 && width < 1024);
      // setIsDesktop(width >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <ResponsiveContainer>
      {children}
    </ResponsiveContainer>
  );
};

// Export individual components for use in other files
export {
  ResponsiveGrid,
  ResponsiveFlex,
  ResponsiveText,
  ResponsiveSpacing,
  ResponsiveImage,
  ResponsiveButton,
  ResponsiveCard,
  ResponsiveTable,
  ResponsiveNavigation,
  ResponsiveSidebar,
  ResponsiveOverlay,
  ResponsiveDesign
};
