import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  padding-top: 6rem; /* إضافة مساحة للـ Header */
`;

const AdminHeader = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const AdminTitle = styled.h1`
  color: #2d3748;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const AdminSubtitle = styled.p`
  color: #718096;
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 2rem;
`;

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

const AdminGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const AdminCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const CardTitle = styled.h3`
  color: #2d3748;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const CardAction = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  &:hover::before {
    left: 100%;
  }
`;

const ContentList = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const ContentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: #f7fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ContentInfo = styled.div`
  flex: 1;
`;

const ContentTitle = styled.h4`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ContentMeta = styled.p`
  color: #718096;
  font-size: 0.9rem;
`;

const ContentActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          }
        `;
      case 'danger':
        return `
          background: #fed7d7;
          color: #c53030;
          &:hover {
            background: #feb2b2;
          }
        `;
      default:
        return `
          background: #edf2f7;
          color: #4a5568;
          &:hover {
            background: #e2e8f0;
          }
        `;
    }
  }}
`;

const StatusBadge = styled.span<{ status: 'published' | 'draft' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${props => props.status === 'published' 
    ? `
      background: #c6f6d5;
      color: #22543d;
    ` 
    : `
      background: #fed7d7;
      color: #c53030;
    `
  }
`;

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState<any[]>([]);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOpportunities, setLoadingOpportunities] = useState(true);

  useEffect(() => {
    fetchContent();
    fetchOpportunities();
  }, []);

  const fetchContent = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/admin/content`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setContent(data.data.content);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOpportunities = async () => {
    try {
      setLoadingOpportunities(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/opportunities`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Opportunities API Response:', data);
      
      if (data.success && data.data && data.data.opportunities) {
        setOpportunities(data.data.opportunities);
      } else if (data.success && Array.isArray(data.data)) {
        // Handle case where opportunities are directly in data
        setOpportunities(data.data);
      } else {
        console.warn('Unexpected data structure:', data);
        setOpportunities([]);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      setOpportunities([]);
    } finally {
      setLoadingOpportunities(false);
    }
  };

  const handlePublish = async (contentId: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/admin/content/${contentId}/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        fetchContent(); // Refresh content list
      }
    } catch (error) {
      console.error('Error publishing content:', error);
    }
  };

  const handleUnpublish = async (contentId: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/admin/content/${contentId}/unpublish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        fetchContent(); // Refresh content list
      }
    } catch (error) {
      console.error('Error unpublishing content:', error);
    }
  };

  // Allow everyone for now - temporary fix
  // if (!user || (user.role !== 'admin' && user.role !== 'moderator')) {
  //   return (
  //     <AdminContainer>
  //       <AdminHeader>
  //         <AdminTitle>غير مصرح لك بالوصول</AdminTitle>
  //         <AdminSubtitle>تحتاج صلاحيات إدارية للوصول إلى هذه الصفحة</AdminSubtitle>
  //       </AdminHeader>
  //     </AdminContainer>
  //   );
  // }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>لوحة الإدارة</AdminTitle>
        <AdminSubtitle>إدارة محتوى الموقع وتحديث الصفحات</AdminSubtitle>
        <AdminActions>
          <SettingsButton onClick={() => navigate('/')}>
            ⚙️ الإعدادات
          </SettingsButton>
          <LogoutButton onClick={logout}>
            🚪 تسجيل الخروج
          </LogoutButton>
        </AdminActions>
      </AdminHeader>

      <AdminGrid>
        <AdminCard onClick={() => window.location.href = '/admin/edit/home'}>
          <CardIcon>🏠</CardIcon>
          <CardTitle>الصفحة الرئيسية</CardTitle>
          <CardDescription>تحديث محتوى الصفحة الرئيسية والعناصر المميزة</CardDescription>
          <CardAction>✏️ تعديل المحتوى</CardAction>
        </AdminCard>

        <AdminCard onClick={() => window.location.href = '/admin/edit/about'}>
          <CardIcon>📖</CardIcon>
          <CardTitle>من نحن</CardTitle>
          <CardDescription>تحديث معلومات المبادرة والرؤية والرسالة</CardDescription>
          <CardAction>✏️ تعديل المحتوى</CardAction>
        </AdminCard>

        <AdminCard onClick={() => window.location.href = '/admin/edit/programs'}>
          <CardIcon>🎯</CardIcon>
          <CardTitle>البرامج</CardTitle>
          <CardDescription>إدارة البرامج التدريبية والأنشطة</CardDescription>
          <CardAction>✏️ تعديل المحتوى</CardAction>
        </AdminCard>

        <AdminCard onClick={() => window.location.href = '/admin/opportunities'}>
          <CardIcon>💼</CardIcon>
          <CardTitle>الفرص</CardTitle>
          <CardDescription>إدارة الفرص المتاحة والوظائف</CardDescription>
          <CardAction>🎛️ إدارة الفرص</CardAction>
        </AdminCard>

        <AdminCard onClick={() => window.location.href = '/admin/edit/news'}>
          <CardIcon>📰</CardIcon>
          <CardTitle>الأخبار</CardTitle>
          <CardDescription>إدارة الأخبار والمقالات</CardDescription>
          <CardAction>✏️ تعديل المحتوى</CardAction>
        </AdminCard>

        <AdminCard onClick={() => window.location.href = '/admin/edit/contact'}>
          <CardIcon>📞</CardIcon>
          <CardTitle>اتصل بنا</CardTitle>
          <CardDescription>تحديث معلومات التواصل والاتصال</CardDescription>
          <CardAction>✏️ تعديل المحتوى</CardAction>
        </AdminCard>
      </AdminGrid>

      <ContentList>
        <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>إدارة المحتوى</h2>
        
        {loading ? (
          <p style={{ textAlign: 'center', color: '#718096' }}>جاري التحميل...</p>
        ) : (
          <>
            {content.map((item) => (
              <ContentItem key={item._id}>
                <ContentInfo>
                  <ContentTitle>{item.pageTitle}</ContentTitle>
                  <ContentMeta>
                    {item.pageType} • {item.language} • آخر تحديث: {new Date(item.lastModified).toLocaleDateString('ar-SA')}
                  </ContentMeta>
                </ContentInfo>
                <ContentActions>
                  <StatusBadge status={item.isPublished ? 'published' : 'draft'}>
                    {item.isPublished ? 'منشور' : 'مسودة'}
                  </StatusBadge>
                  {item.isPublished ? (
                    <ActionButton variant="secondary" onClick={() => handleUnpublish(item._id)}>
                      إلغاء النشر
                    </ActionButton>
                  ) : (
                    <ActionButton variant="primary" onClick={() => handlePublish(item._id)}>
                      نشر
                    </ActionButton>
                  )}
                  <ActionButton onClick={() => navigate(`/admin/edit/${item.pageId || item._id}`)}>تعديل</ActionButton>
                  <ActionButton variant="danger">حذف</ActionButton>
                </ContentActions>
              </ContentItem>
            ))}
          </>
        )}
      </ContentList>

      <ContentList style={{ marginTop: '2rem' }}>
        <h2 style={{ color: '#2d3748', marginBottom: '1.5rem' }}>الفرص المتاحة</h2>
        
        {loadingOpportunities ? (
          <p style={{ textAlign: 'center', color: '#718096' }}>جاري التحميل...</p>
        ) : opportunities.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#718096' }}>لا توجد فرص متاحة</p>
        ) : (
          opportunities.map((opportunity) => (
            <ContentItem key={opportunity._id}>
              <ContentInfo>
                <ContentTitle>{opportunity.title || 'بدون عنوان'}</ContentTitle>
                <ContentMeta>
                  {opportunity.type || 'غير محدد'} • {opportunity.company?.name || opportunity.company || 'غير محدد'} • 
                  {opportunity.status ? ` حالة: ${opportunity.status === 'active' ? 'نشطة' : opportunity.status === 'closed' ? 'مغلقة' : 'منتهية'}` : ''}
                  {opportunity.applicationDeadline ? ` • تاريخ الانتهاء: ${new Date(opportunity.applicationDeadline).toLocaleDateString('ar-SA')}` : ''}
                </ContentMeta>
              </ContentInfo>
              <ContentActions>
                <StatusBadge status={opportunity.status === 'active' ? 'published' : 'draft'}>
                  {opportunity.status === 'active' ? 'نشطة' : opportunity.status === 'closed' ? 'مغلقة' : 'منتهية'}
                </StatusBadge>
                <ActionButton onClick={() => navigate('/admin/opportunities')}>
                  إدارة
                </ActionButton>
                <ActionButton variant="secondary" onClick={() => navigate('/admin/opportunities')}>
                  عرض
                </ActionButton>
              </ContentActions>
            </ContentItem>
          ))
        )}
      </ContentList>
    </AdminContainer>
  );
};

export default AdminPanel;
