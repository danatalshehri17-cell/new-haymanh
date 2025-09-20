import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Theme
const theme = {
  colors: {
    primary: '#1E3A8A',
    secondary: '#10B981',
    accent: '#F59E0B',
    text: '#1F2937',
    background: '#F9FAFB'
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px'
  },
  shadows: {
    small: '0 1px 3px rgba(0,0,0,0.12)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 25px rgba(0,0,0,0.15)'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
};

// Styled Components
const OpportunitiesContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-top: 2rem;
`;

const OpportunitiesSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
  font-family: 'Cairo', sans-serif;
`;

const OpportunitiesFixed: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isLoadingOpportunities, setIsLoadingOpportunities] = useState(true);
  const [apiOpportunities, setApiOpportunities] = useState<any[]>([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  // جلب الفرص من API
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoadingOpportunities(true);
        const response = await fetch('https://new-haymanh.onrender.com/api/opportunities');
        if (response.ok) {
          const data = await response.json();
          console.log('Opportunities data:', data.data.opportunities);
          setApiOpportunities(data.data.opportunities || []);
        }
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      } finally {
        setIsLoadingOpportunities(false);
      }
    };
    
    fetchOpportunities();
  }, []);

  const handleAddToSelected = async (opportunityId: string) => {
    if (!isAuthenticated) {
      console.log('يرجى تسجيل الدخول أولاً');
      return;
    }
    
    setLoading(opportunityId);
    
    try {
      const token = localStorage.getItem('haymanh_token');
      const response = await fetch('https://new-haymanh.onrender.com/api/dashboard/opportunities', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ opportunityId })
      });

      if (response.ok) {
        setSelectedOpportunities(prev => new Set([...prev, opportunityId]));
        console.log('تم إضافة الفرصة بنجاح!');
      } else {
        console.log('حدث خطأ في إضافة الفرصة');
      }
    } catch (error) {
      console.error('Error adding opportunity:', error);
      console.log('حدث خطأ في إضافة الفرصة');
    } finally {
      setLoading(null);
    }
  };

  if (isLoadingOpportunities) {
    return (
      <ThemeProvider theme={theme}>
        <OpportunitiesContainer>
          <OpportunitiesSection>
            <div className="container">
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem', 
                color: '#6B7280',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '4px solid #E5E7EB',
                  borderTop: '4px solid #1E3A8A',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <h3>جاري تحميل الفرص...</h3>
                <p>يرجى الانتظار بينما نجلب أحدث الفرص المتاحة</p>
              </div>
            </div>
          </OpportunitiesSection>
        </OpportunitiesContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <OpportunitiesContainer>
        <OpportunitiesSection>
          <div className="container">
            <SectionTitle
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              الفرص المتاحة
            </SectionTitle>

            {apiOpportunities.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6B7280' }}>
                <h3>لا توجد فرص متاحة حالياً</h3>
                <p>تحقق مرة أخرى لاحقاً</p>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
                gap: '1.5rem' 
              }}>
                {apiOpportunities.map((opportunity, index) => {
                  // تنظيف البيانات بشكل آمن
                  const safeData = {
                    id: opportunity._id || opportunity.id || `opp-${index}`,
                    type: String(opportunity.type || 'فرصة'),
                    title: String(opportunity.title || 'فرصة متاحة'),
                    description: String(opportunity.description || 'وصف الفرصة').substring(0, 200),
                    location: typeof opportunity.location === 'object' 
                      ? String(opportunity.location?.city || opportunity.location?.address || 'الرياض')
                      : String(opportunity.location || 'الرياض'),
                    duration: String(opportunity.duration || 'غير محدد'),
                    company: String(opportunity.company?.name || 'غير محدد')
                  };

                  return (
                    <motion.div
                      key={safeData.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0',
                        transition: 'transform 0.2s ease',
                        cursor: 'pointer'
                      }}
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* شارة النوع */}
                      <div style={{
                        background: '#1E3A8A',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '1rem',
                        display: 'inline-block'
                      }}>
                        {safeData.type}
                      </div>
                      
                      {/* العنوان */}
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        marginBottom: '0.75rem',
                        color: '#1a202c',
                        lineHeight: '1.4'
                      }}>
                        {safeData.title}
                      </h3>
                      
                      {/* الوصف */}
                      <p style={{
                        color: '#4a5568',
                        marginBottom: '1rem',
                        lineHeight: '1.6',
                        fontSize: '0.95rem'
                      }}>
                        {safeData.description}...
                      </p>
                      
                      {/* التفاصيل */}
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>📍</span>
                          <span>{safeData.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>⏱️</span>
                          <span>{safeData.duration}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span>🏢</span>
                          <span>{safeData.company}</span>
                        </div>
                      </div>
                      
                      {/* زر الإضافة */}
                      <button
                        style={{
                          background: selectedOpportunities.has(safeData.id) ? '#10B981' : '#1E3A8A',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '8px',
                          cursor: loading === safeData.id ? 'not-allowed' : 'pointer',
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          width: '100%',
                          transition: 'background-color 0.2s',
                          opacity: loading === safeData.id ? 0.7 : 1
                        }}
                        onClick={() => handleAddToSelected(safeData.id)}
                        disabled={selectedOpportunities.has(safeData.id) || loading === safeData.id}
                      >
                        {loading === safeData.id 
                          ? 'جاري الإضافة...'
                          : selectedOpportunities.has(safeData.id) 
                            ? '✓ تمت الإضافة بنجاح' 
                            : 'أضف للفرص المختارة'
                        }
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </OpportunitiesSection>
      </OpportunitiesContainer>
    </ThemeProvider>
  );
};

export default OpportunitiesFixed;
