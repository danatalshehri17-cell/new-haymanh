// Admin Utility Functions

export interface PageConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export const adminPages: PageConfig[] = [
  {
    id: 'home',
    title: 'الصفحة الرئيسية',
    description: 'تحديث محتوى الصفحة الرئيسية والعناصر المميزة',
    icon: '🏠',
    path: '/admin/edit/home'
  },
  {
    id: 'about',
    title: 'من نحن',
    description: 'تحديث معلومات المبادرة والرؤية والرسالة',
    icon: '📖',
    path: '/admin/edit/about'
  },
  {
    id: 'programs',
    title: 'البرامج',
    description: 'إدارة البرامج التدريبية والأنشطة',
    icon: '🎯',
    path: '/admin/edit/programs'
  },
  {
    id: 'opportunities',
    title: 'الفرص',
    description: 'إدارة الفرص المتاحة والوظائف',
    icon: '💼',
    path: '/admin/edit/opportunities'
  },
  {
    id: 'news',
    title: 'الأخبار',
    description: 'إدارة الأخبار والمقالات',
    icon: '📰',
    path: '/admin/edit/news'
  },
  {
    id: 'contact',
    title: 'اتصل بنا',
    description: 'تحديث معلومات التواصل والاتصال',
    icon: '📞',
    path: '/admin/edit/contact'
  }
];

export const isAdminUser = (email: string, role?: string): boolean => {
  return email === 'mbadrt04@gmail.com' || role === 'admin';
};

export const getAdminRedirectUrl = (): string => {
  return '/admin';
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
