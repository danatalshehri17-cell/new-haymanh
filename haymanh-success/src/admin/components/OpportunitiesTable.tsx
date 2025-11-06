import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: right;
  font-weight: 600;
  font-size: 1rem;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &:hover {
    background: #f7fafc;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: top;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.status) {
      case 'open': return '#48bb78';
      case 'closed': return '#ed8936';
      case 'expired': return '#e53e3e';
      default: return '#a0aec0';
    }
  }};
  color: white;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ variant: 'edit' | 'delete' | 'close' | 'expire' }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${props => {
    switch (props.variant) {
      case 'edit':
        return `
          background: #4299e1;
          color: white;
          &:hover { background: #3182ce; }
        `;
      case 'delete':
        return `
          background: #e53e3e;
          color: white;
          &:hover { background: #c53030; }
        `;
      case 'close':
        return `
          background: #ed8936;
          color: white;
          &:hover { background: #dd6b20; }
        `;
      case 'expire':
        return `
          background: #9f7aea;
          color: white;
          &:hover { background: #805ad5; }
        `;
    }
  }}
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #4a5568;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #718096;
`;

const OpportunityTitle = styled.div`
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 0.25rem;
`;

const OpportunityCompany = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 0.25rem;
`;

const OpportunityLocation = styled.div`
  font-size: 0.8rem;
  color: #718096;
`;

const OpportunityDescription = styled.div`
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.5;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

interface OpportunitiesTableProps {
  opportunities: Opportunity[];
  loading: boolean;
  onEdit: (opportunity: Opportunity) => void;
  onDelete: (opportunity: Opportunity) => void;
  onClose: (opportunity: Opportunity) => void;
  onExpire: (opportunity: Opportunity) => void;
}

const OpportunitiesTable= ({
  opportunities,
  loading,
  onEdit,
  onDelete,
  onClose,
  onExpire
}) => {
  if (loading) {
    return (
      <TableContainer>
        <LoadingSpinner>جاري تحميل الفرص...</LoadingSpinner>
      </TableContainer>
    );
  }

  if (opportunities.length === 0) {
    return (
      <TableContainer>
        <EmptyState>
          <h3>لا توجد فرص متاحة</h3>
          <p>يمكنك إضافة فرص جديدة من خلال زر "إضافة فرصة جديدة"</p>
        </EmptyState>
      </TableContainer>
    );
  }

  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <tr>
            <TableHeaderCell>الفرصة</TableHeaderCell>
            <TableHeaderCell>الشركة</TableHeaderCell>
            <TableHeaderCell>الموقع</TableHeaderCell>
            <TableHeaderCell>النوع</TableHeaderCell>
            <TableHeaderCell>الصورة</TableHeaderCell>
            <TableHeaderCell>رابط تكوين الفرق</TableHeaderCell>
            <TableHeaderCell>الحالة</TableHeaderCell>
            <TableHeaderCell>آخر تحديث</TableHeaderCell>
            <TableHeaderCell>الإجراءات</TableHeaderCell>
          </tr>
        </TableHeader>
        <TableBody>
          {opportunities.map((opportunity) => (
            <TableRow key={opportunity._id}>
              <TableCell>
                <OpportunityTitle>{opportunity.title || 'بدون عنوان'}</OpportunityTitle>
                <OpportunityDescription>{opportunity.description || 'بدون وصف'}</OpportunityDescription>
              </TableCell>
              <TableCell>
                <OpportunityCompany>
                  {typeof opportunity.company === 'object' 
                    ? opportunity.company?.name || 'بدون شركة'
                    : opportunity.company || 'بدون شركة'
                  }
                </OpportunityCompany>
              </TableCell>
              <TableCell>
                <OpportunityLocation>
                  {typeof opportunity.location === 'object' 
                    ? opportunity.location?.address || 'بدون موقع'
                    : opportunity.location || 'بدون موقع'
                  }
                </OpportunityLocation>
              </TableCell>
              <TableCell>
                <span>
                  {opportunity.type === 'غير ذلك' && opportunity.customType 
                    ? opportunity.customType 
                    : opportunity.type || 'غير محدد'
                  }
                </span>
              </TableCell>
              <TableCell>
                {opportunity.imageUrl ? (
                  <img 
                    src={opportunity.imageUrl} 
                    alt={opportunity.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span style={{ color: '#a0aec0', fontSize: '0.8rem' }}>لا توجد صورة</span>
                )}
              </TableCell>
              <TableCell>
                {opportunity.teamFormationLink ? (
                  <a 
                    href={opportunity.teamFormationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#667eea', 
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    🔗 رابط تكوين الفرق
                  </a>
                ) : (
                  <span style={{ color: '#a0aec0', fontSize: '0.8rem' }}>لا يوجد رابط</span>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={opportunity.status}>
                  {opportunity.status === 'open' ? 'مفتوحة' : 
                   opportunity.status === 'closed' ? 'مغلقة' : 'منتهية'}
                </StatusBadge>
              </TableCell>
              <TableCell>
                <span>{new Date(opportunity.updatedAt).toLocaleDateString('ar-SA')}</span>
              </TableCell>
              <TableCell>
                <ActionButtons>
                  <ActionButton variant="edit" onClick={() => onEdit(opportunity)}>
                    ✏️ تعديل
                  </ActionButton>
                  {opportunity.status === 'open' && (
                    <>
                      <ActionButton variant="close" onClick={() => onClose(opportunity)}>
                        🔒 إغلاق
                      </ActionButton>
                      <ActionButton variant="expire" onClick={() => onExpire(opportunity)}>
                        ⏰ إنهاء
                      </ActionButton>
                    </>
                  )}
                  <ActionButton variant="delete" onClick={() => onDelete(opportunity)}>
                    🗑️ حذف
                  </ActionButton>
                </ActionButtons>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OpportunitiesTable;
