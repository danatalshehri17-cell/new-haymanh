const lightTheme = {
  colors: {
    primary: '#1E3A8A',      // الأزرق الملكي
    secondary: '#E11D48',    // الأحمر الطاقي
    accent: '#FBBF24',       // الأصفر الذهبي
    background: '#FFFFFF',    // الأبيض
    surface: '#FFFFFF',       // الأبيض
    text: '#000000',         // أسود للنصوص
    textLight: '#6B7280',    // رمادي للنصوص الثانوية
    textSecondary: '#6B7280', // رمادي للنصوص الثانوية
    textHighlight: '#E11D48', // الأحمر الطاقي للنصوص المهمة
    border: '#E5E7EB',       // الرمادي الهادئ للحدود
    success: '#10B981',      // أخضر نجاح
    warning: '#F59E0B',      // برتقالي تحذير
    error: '#E11D48',        // الأحمر الطاقي للأخطاء
  },
  fonts: {
    primary: "'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    secondary: "'Tajawal', 'Arial', sans-serif",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xxl: '1.5rem',
    xxxl: '2rem',
    display: '3rem',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
  },
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 8px rgba(0,0,0,0.1)',
    large: '0 8px 16px rgba(0,0,0,0.1)',
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    round: '50%',
  },
};

const darkTheme = {
  ...lightTheme,
  colors: {
    primary: '#3B82F6',      // أزرق فاتح للمود الداكن
    secondary: '#EF4444',    // أحمر فاتح للمود الداكن
    accent: '#FCD34D',       // أصفر فاتح للمود الداكن
    background: '#0F172A',    // خلفية داكنة
    surface: '#1E293B',       // سطح داكن
    text: '#F1F5F9',         // نص فاتح
    textLight: '#94A3B8',    // نص ثانوي فاتح
    textSecondary: '#94A3B8', // نص ثانوي فاتح
    textHighlight: '#EF4444', // نص مهم فاتح
    border: '#334155',       // حدود داكنة
    success: '#22C55E',      // أخضر فاتح
    warning: '#F59E0B',      // برتقالي فاتح
    error: '#EF4444',        // أحمر فاتح
  },
};

export const theme = lightTheme;
export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type Theme = typeof lightTheme;
