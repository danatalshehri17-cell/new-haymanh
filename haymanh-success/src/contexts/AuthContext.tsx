import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
  role: 'user' | 'moderator' | 'admin';
  joinDate: Date;
  totalPoints: number;
  completedCourses: number;
  currentCourses: number;
  achievements: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider= ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // التحقق من وجود مستخدم مسجل دخول
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check authentication status
        const savedUser = localStorage.getItem('haymanh_user');
        const savedToken = localStorage.getItem('haymanh_token');
        
        // Check if user data exists
        if (savedUser && savedToken) {
          // Validate credentials with server
          // استخدام البيانات المحفوظة محليًا مباشرة
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // محاكاة تسجيل الدخول - يمكنك تغيير هذه البيانات حسب الحاجة
      const mockUsers = [
        { email: 'mbadrt04@gmail.com', password: 'Admin123!@#', firstName: 'هيمنة', lastName: 'النجاح', role: 'admin' },
        { email: 'admin@haymanh.com', password: '123456', firstName: 'أحمد', lastName: 'المدير', role: 'admin' },
        { email: 'user@haymanh.com', password: '123456', firstName: 'محمد', lastName: 'المستخدم', role: 'user' },
        { email: 'test@test.com', password: 'test123', firstName: 'سارة', lastName: 'الاختبار', role: 'user' }
      ];
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userForContext: User = {
          id: Math.random().toString(36).substr(2, 9),
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          avatar: user.firstName.charAt(0),
          level: 'مستخدم',
          role: user.role as 'user' | 'moderator' | 'admin',
          joinDate: new Date(),
          totalPoints: Math.floor(Math.random() * 1000),
          completedCourses: Math.floor(Math.random() * 10),
          currentCourses: Math.floor(Math.random() * 5),
          achievements: Math.floor(Math.random() * 20)
        };
        
        setUser(userForContext);
        localStorage.setItem('haymanh_user', JSON.stringify(userForContext));
        localStorage.setItem('haymanh_token', 'mock_token_' + Math.random().toString(36).substr(2, 9));
        
        return true;
      } else {
        throw new Error('بيانات الدخول غير صحيحة');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // محاكاة التسجيل - إنشاء مستخدم جديد
      const userForContext: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName: userData.firstName,
        lastName: userData.lastName,
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        avatar: userData.firstName.charAt(0),
        level: 'مستخدم جديد',
        role: 'user',
        joinDate: new Date(),
        totalPoints: 0,
        completedCourses: 0,
        currentCourses: 0,
        achievements: 0
      };
      
      setUser(userForContext);
      localStorage.setItem('haymanh_user', JSON.stringify(userForContext));
      localStorage.setItem('haymanh_token', 'mock_token_' + Math.random().toString(36).substr(2, 9));
      
      return true;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('haymanh_user');
    localStorage.removeItem('haymanh_token');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('haymanh_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
