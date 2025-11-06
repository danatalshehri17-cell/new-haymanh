import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AdminContainer, AdminHeader, AdminTitle, AdminSubtitle, AdminGrid } from '../styles/AdminStyles';
import ConfirmDialog from '../components/ConfirmDialog';
import AddEditOpportunityForm from '../components/AddEditOpportunityForm';
import OpportunitiesTable from '../components/OpportunitiesTable';

const ManagementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }
`;

const BackButton = styled.button`
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #2d3748;
    transform: translateY(-2px);
  }
`;

interface Opportunity {
  _id: string;
  title: string;
  description: string;
  company: string | { name: string; logo?: string; website?: string; description?: string };
  location: string | { address: string; type?: string; country?: string };
  type: string;
  customType?: string;
  status: 'open' | 'closed' | 'expired';
  requirements: string[];
  benefits: string[];
  applicationDeadline: string;
  salary?: string;
  experience?: string;
  imageUrl?: string;
  allowTeamFormation?: boolean;
  teamFormationLink?: string;
  createdAt: string;
  updatedAt: string;
}

const OpportunitiesManagement = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState<'delete' | 'close' | 'expire'>('delete');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/api/opportunities', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log('Opportunities API Response:', data);
      if (data.success) {
        const opportunities = data.data.opportunities || [];
        console.log('Raw opportunities:', opportunities);
        // التأكد من أن البيانات صحيحة
        const validOpportunities = opportunities.filter((opp: any) => 
          opp && typeof opp === 'object' && opp._id
        );
        console.log('Valid opportunities:', validOpportunities);
        setOpportunities(validOpportunities);
      }
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOpportunity = () => {
    setEditingOpportunity(null);
    setShowAddForm(true);
  };

  const handleEditOpportunity = (opportunity: Opportunity) => {
    setEditingOpportunity(opportunity);
    setShowAddForm(true);
  };

  const handleDeleteOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setActionType('delete');
    setShowConfirmDialog(true);
  };

  const handleCloseOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setActionType('close');
    setShowConfirmDialog(true);
  };

  const handleExpireOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity);
    setActionType('expire');
    setShowConfirmDialog(true);
  };

  const confirmAction = async () => {
    if (!selectedOpportunity) return;

    try {
      let response;
      const url = `http://localhost:5001/api/opportunities/${selectedOpportunity._id}`;

      switch (actionType) {
        case 'delete':
          response = await fetch(url, { method: 'DELETE' });
          break;
        case 'close':
          response = await fetch(url, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'closed' })
          });
          break;
        case 'expire':
          response = await fetch(url, { 
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'expired' })
          });
          break;
      }

      if (response?.ok) {
        await fetchOpportunities();
        alert(`تم ${actionType === 'delete' ? 'حذف' : actionType === 'close' ? 'إغلاق' : 'إنهاء'} الفرصة بنجاح`);
      }
    } catch (error) {
      console.error('Error performing action:', error);
      alert('حدث خطأ أثناء تنفيذ العملية');
    } finally {
      setShowConfirmDialog(false);
      setSelectedOpportunity(null);
    }
  };

  const getConfirmMessage = () => {
    if (!selectedOpportunity) return '';
    
    switch (actionType) {
      case 'delete':
        return `هل أنت متأكد من حذف الفرصة "${selectedOpportunity.title}"؟\n\nهذا الإجراء لا يمكن التراجع عنه.`;
      case 'close':
        return `هل أنت متأكد من إغلاق الفرصة "${selectedOpportunity.title}"؟\n\nلن يتمكن المستخدمون من التقديم على هذه الفرصة.`;
      case 'expire':
        return `هل أنت متأكد من إنهاء الفرصة "${selectedOpportunity.title}"؟\n\nستظهر هذه الفرصة كمنتهية الصلاحية.`;
      default:
        return '';
    }
  };

  const getConfirmButtonText = () => {
    switch (actionType) {
      case 'delete':
        return 'حذف الفرصة';
      case 'close':
        return 'إغلاق الفرصة';
      case 'expire':
        return 'إنهاء الفرصة';
      default:
        return 'تأكيد';
    }
  };

  if (showAddForm) {
    return (
      <AddEditOpportunityForm
        opportunity={editingOpportunity}
        onSave={() => {
          setShowAddForm(false);
          setEditingOpportunity(null);
          fetchOpportunities();
        }}
        onCancel={() => {
          setShowAddForm(false);
          setEditingOpportunity(null);
        }}
      />
    );
  }

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>إدارة الفرص</AdminTitle>
        <AdminSubtitle>إضافة وتعديل وحذف الفرص المتاحة</AdminSubtitle>
        {user?.email === 'mbadrt04@gmail.com' && (
          <ActionButtons>
            <BackButton onClick={() => navigate('/admin')}>
              ← العودة للوحة الإدارة
            </BackButton>
            <AddButton onClick={handleAddOpportunity}>
              ➕ إضافة فرصة جديدة
            </AddButton>
          </ActionButtons>
        )}
      </AdminHeader>

      <ManagementContainer>
        <OpportunitiesTable
          opportunities={opportunities}
          loading={loading}
          onEdit={handleEditOpportunity}
          onDelete={handleDeleteOpportunity}
          onClose={handleCloseOpportunity}
          onExpire={handleExpireOpportunity}
        />
      </ManagementContainer>

      {showConfirmDialog && (
        <ConfirmDialog
          title="تأكيد العملية"
          message={getConfirmMessage()}
          confirmText={getConfirmButtonText()}
          cancelText="إلغاء"
          onConfirm={confirmAction}
          onCancel={() => {
            setShowConfirmDialog(false);
            setSelectedOpportunity(null);
          }}
        />
      )}
    </AdminContainer>
  );
};

export default OpportunitiesManagement;
