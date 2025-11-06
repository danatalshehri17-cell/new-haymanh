import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const EditorContainer = styled.div`
  min-height: 100vh;
  background: #f7fafc;
  padding: 2rem;
`;

const EditorHeader = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const EditorTitle = styled.h1`
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const EditorSubtitle = styled.p`
  color: #718096;
  font-size: 1rem;
`;

const EditorGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
`;

const EditorMain = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const EditorSidebar = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

const SectionCard = styled.div`
  border: 2px dashed #e2e8f0;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    background: #f7fafc;
  }
`;

const SectionTitle = styled.h3`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SectionDescription = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: #4a5568;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 0.5rem;

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

const SectionList = styled.div`
  margin-top: 2rem;
`;

const SectionItem = styled.div`
  background: #f7fafc;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #e2e8f0;
`;

const ContentEditor = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/pages/${pageId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  }, [pageId]);

  useEffect(() => {
    if (pageId) {
      fetchContent();
    }
  }, [pageId, fetchContent]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/content/${content._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
      });
      const data = await response.json();
      if (data.success) {
        alert('تم حفظ المحتوى بنجاح');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('خطأ في حفظ المحتوى');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await fetch(`/api/admin/content/${content._id}/publish`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        alert('تم نشر المحتوى بنجاح');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error publishing content:', error);
      alert('خطأ في نشر المحتوى');
    }
  };

  const addSection = (sectionType: string) => {
    const newSection = {
      sectionId: `section_${Date.now()}`,
      sectionType,
      title: '',
      content: '',
      images: [],
      links: [],
      metadata: {},
      order: content.sections.length,
      isActive: true
    };

    setContent({
      ...content,
      sections: [...content.sections, newSection]
    });
  };

  const updateSection = (sectionId: string, updates: any) => {
    setContent({
      ...content,
      sections: content.sections.map((section: any) =>
        section.sectionId === sectionId ? { ...section, ...updates } : section
      )
    });
  };

  const removeSection = (sectionId: string) => {
    setContent({
      ...content,
      sections: content.sections.filter((section: any) => section.sectionId !== sectionId)
    });
  };

  if (loading) {
    return (
      <EditorContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>جاري التحميل...</p>
        </div>
      </EditorContainer>
    );
  }

  if (!content) {
    return (
      <EditorContainer>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>المحتوى غير موجود</p>
        </div>
      </EditorContainer>
    );
  }

  return (
    <EditorContainer>
      <EditorHeader>
        <EditorTitle>تحرير المحتوى: {content.pageTitle}</EditorTitle>
        <EditorSubtitle>تحديث وإدارة محتوى الصفحة</EditorSubtitle>
      </EditorHeader>

      <EditorGrid>
        <EditorMain>
          <FormGroup>
            <Label>عنوان الصفحة</Label>
            <Input
              value={content.pageTitle}
              onChange={(e) => setContent({ ...content, pageTitle: e.target.value })}
              placeholder="أدخل عنوان الصفحة"
            />
          </FormGroup>

          <FormGroup>
            <Label>نوع الصفحة</Label>
            <Select
              value={content.pageType}
              onChange={(e) => setContent({ ...content, pageType: e.target.value })}
            >
              <option value="home">الصفحة الرئيسية</option>
              <option value="about">من نحن</option>
              <option value="programs">البرامج</option>
              <option value="opportunities">الفرص</option>
              <option value="news">الأخبار</option>
              <option value="contact">اتصل بنا</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>اللغة</Label>
            <Select
              value={content.language}
              onChange={(e) => setContent({ ...content, language: e.target.value })}
            >
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </Select>
          </FormGroup>

          <SectionList>
            <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>أقسام المحتوى</h3>
            
            {content.sections.map((section: any, index: number) => (
              <SectionItem key={section.sectionId}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ color: '#2d3748', margin: 0 }}>قسم {index + 1}: {section.sectionType}</h4>
                  <Button variant="danger" onClick={() => removeSection(section.sectionId)}>
                    حذف
                  </Button>
                </div>
                
                <FormGroup>
                  <Label>عنوان القسم</Label>
                  <Input
                    value={section.title || ''}
                    onChange={(e) => updateSection(section.sectionId, { title: e.target.value })}
                    placeholder="عنوان القسم"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>محتوى القسم</Label>
                  <TextArea
                    value={section.content || ''}
                    onChange={(e) => updateSection(section.sectionId, { content: e.target.value })}
                    placeholder="محتوى القسم"
                  />
                </FormGroup>
              </SectionItem>
            ))}
          </SectionList>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'جاري الحفظ...' : 'حفظ'}
            </Button>
            <Button variant="primary" onClick={handlePublish}>
              نشر المحتوى
            </Button>
            <Button variant="secondary" onClick={() => navigate('/admin')}>
              العودة
            </Button>
          </div>
        </EditorMain>

        <EditorSidebar>
          <h3 style={{ color: '#2d3748', marginBottom: '1rem' }}>إضافة قسم جديد</h3>
          
          <SectionCard onClick={() => addSection('hero')}>
            <SectionTitle>قسم البطل</SectionTitle>
            <SectionDescription>عنوان رئيسي وصورة مميزة</SectionDescription>
          </SectionCard>

          <SectionCard onClick={() => addSection('text')}>
            <SectionTitle>نص</SectionTitle>
            <SectionDescription>فقرة نصية عادية</SectionDescription>
          </SectionCard>

          <SectionCard onClick={() => addSection('cards')}>
            <SectionTitle>بطاقات</SectionTitle>
            <SectionDescription>عرض المحتوى في بطاقات</SectionDescription>
          </SectionCard>

          <SectionCard onClick={() => addSection('list')}>
            <SectionTitle>قائمة</SectionTitle>
            <SectionDescription>قائمة منظمة</SectionDescription>
          </SectionCard>

          <SectionCard onClick={() => addSection('gallery')}>
            <SectionTitle>معرض صور</SectionTitle>
            <SectionDescription>مجموعة من الصور</SectionDescription>
          </SectionCard>

          <SectionCard onClick={() => addSection('testimonials')}>
            <SectionTitle>شهادات</SectionTitle>
            <SectionDescription>شهادات المستخدمين</SectionDescription>
          </SectionCard>
        </EditorSidebar>
      </EditorGrid>
    </EditorContainer>
  );
};

export default ContentEditor;
