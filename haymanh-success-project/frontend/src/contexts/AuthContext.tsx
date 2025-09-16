import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  avatar: string;
  level: string;
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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
          try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
            const response = await fetch(`${apiUrl}/api/auth/me`, {
              headers: {
                'Authorization': `Bearer ${savedToken}`,
                'Content-Type': 'application/json',
              },
            });
            console.log('📡 Validation response status:', response.status);

            if (response.ok) {
              const userData = JSON.parse(savedUser);
              setUser(userData);
              console.log('✅ Token validation successful, user logged in');
            } else {
              // التوكن غير صالح، إزالة البيانات المحفوظة
              localStorage.removeItem('haymanh_user');
              localStorage.removeItem('haymanh_token');
              console.log('❌ Token validation failed, removed from localStorage');
            }
          } catch (error) {
            // خطأ في الاتصال، استخدام البيانات المحفوظة محليًا
            const userData = JSON.parse(savedUser);
            setUser(userData);
            console.log('⚠️ Network error, using cached user data');
          }
        } else {
          console.log('❌ No saved credentials found');
        }
      } catch (error) {
        console.error('💥 Error checking auth status:', error);
      } finally {
        setIsLoading(false);
        console.log('🏁 Auth check completed');
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      const data = await response.json();
      console.log('📦 Response data:', data);
      
      if (response.ok && data.success) {
        console.log('✅ Login successful!', data);
        const userData = data.data.user;
        const userForContext: User = {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          avatar: userData.avatar || userData.firstName.charAt(0),
          level: 'مستخدم',
          joinDate: new Date(),
          totalPoints: 0, // يمكن إضافة هذا لاحقًا
          completedCourses: 0, // يمكن إضافة هذا لاحقًا
          currentCourses: 0, // يمكن إضافة هذا لاحقًا
          achievements: 0 // يمكن إضافة هذا لاحقًا
        };
        
        console.log('👤 Setting user context:', userForContext);
        setUser(userForContext);
        
        console.log('💾 Saving to localStorage...');
        localStorage.setItem('haymanh_user', JSON.stringify(userForContext));
        localStorage.setItem('haymanh_token', data.data.token);
        
        console.log('🔑 Token saved:', data.data.token);
        console.log('👤 User saved:', userForContext);
        console.log('✅ Login process completed successfully');
        return true;
      } else {
        console.log('❌ Login failed:', data.message);
        throw new Error(data.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      if (error instanceof Error) {
        console.error('💥 Error details:', error.message);
        console.error('💥 Error stack:', error.stack);
      }
      throw error; // Re-throw the error to be handled by the component
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // إرسال طلب التسجيل للـ backend
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        console.log('Registration successful!', data);
        const newUserData = data.data.user;
        const userForContext: User = {
          id: newUserData.id,
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          name: `${newUserData.firstName} ${newUserData.lastName}`,
          email: newUserData.email,
          avatar: newUserData.avatar || newUserData.firstName.charAt(0),
          level: 'مبتدئ',
          joinDate: new Date(),
          totalPoints: 0,
          completedCourses: 0,
          currentCourses: 0,
          achievements: 0
        };
        
        setUser(userForContext);
        localStorage.setItem('haymanh_user', JSON.stringify(userForContext));
        localStorage.setItem('haymanh_token', data.data.token);
        console.log('Register - Token saved:', data.data.token);
        console.log('Register - User saved:', userForContext);
        return true;
      } else {
        console.log('Registration failed:', data.message);
        // Store error message for display
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map((error: any) => error.message).join('، ');
          throw new Error(errorMessages);
        } else {
          throw new Error(data.message || 'حدث خطأ أثناء إنشاء الحساب');
        }
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error; // Re-throw the error to be handled by the component
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
