import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const LoginCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const LoginTitle = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const LoginSubtitle = styled.p`
  color: #718096;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const QuickLoginButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const AdminInfo = styled.div`
  background: #f7fafc;
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1rem;
  border-left: 4px solid #667eea;
`;

const AdminText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  margin: 0;
`;

const QuickLogin = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleQuickLogin = async () => {
    setLoading(true);
    try {
      // تسجيل دخول سريع بإيميل المبادرة
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'mbadrt04@gmail.com',
          password: 'Admin123!@#'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // تسجيل الدخول في الـ context
        await login('mbadrt04@gmail.com', 'Admin123!@#');
        
        // الانتقال مباشرة إلى لوحة الإدارة
        navigate('/admin');
      } else {
        alert('خطأ في تسجيل الدخول: ' + data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>تسجيل دخول سريع</LoginTitle>
        <LoginSubtitle>للوصول إلى لوحة الإدارة</LoginSubtitle>
        
        <QuickLoginButton onClick={handleQuickLogin} disabled={loading}>
          {loading ? 'جاري تسجيل الدخول...' : '🚀 دخول سريع للوحة الإدارة'}
        </QuickLoginButton>

        <AdminInfo>
          <AdminText>
            <strong>إيميل المبادرة:</strong> mbadrt04@gmail.com<br/>
            <strong>الصلاحيات:</strong> إدارة كاملة للمحتوى
          </AdminText>
        </AdminInfo>
      </LoginCard>
    </LoginContainer>
  );
};

export default QuickLogin;
