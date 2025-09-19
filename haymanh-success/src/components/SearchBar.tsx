import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

interface SearchFilters {
  category: string;
  level: string;
  duration: string;
  price: string;
}

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  direction: rtl;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const SearchInputGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.3s ease;
  direction: rtl;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const SearchButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const FiltersSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 120px;
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const FilterSelect = styled.select`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  direction: rtl;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const AdvancedFiltersToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-decoration: underline;
  margin-top: ${({ theme }) => theme.spacing.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AdvancedFilters = styled(motion.div)`
  overflow: hidden;
`;

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    level: '',
    duration: '',
    price: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (filterName: keyof SearchFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      level: '',
      duration: '',
      price: '',
    });
    setSearchQuery('');
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInputGroup>
          <SearchInput
            type="text"
            placeholder="ابحث عن البرامج والدورات والفرص المتاحة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton type="submit">
            🔍 بحث
          </SearchButton>
        </SearchInputGroup>

        <AdvancedFiltersToggle
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          {showAdvancedFilters ? 'إخفاء الفلاتر' : 'فلاتر إضافية'}
        </AdvancedFiltersToggle>

        <AnimatePresence>
          {showAdvancedFilters && (
            <AdvancedFilters
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiltersSection>
                <FilterGroup>
                  <FilterLabel>الفئة</FilterLabel>
                  <FilterSelect
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="">جميع الفئات</option>
                    <option value="technology">التكنولوجيا</option>
                    <option value="business">الأعمال</option>
                    <option value="education">التعليم</option>
                    <option value="health">الصحة</option>
                    <option value="arts">الفنون</option>
                  </FilterSelect>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>المستوى</FilterLabel>
                  <FilterSelect
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                  >
                    <option value="">جميع المستويات</option>
                    <option value="beginner">مبتدئ</option>
                    <option value="intermediate">متوسط</option>
                    <option value="advanced">متقدم</option>
                  </FilterSelect>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>المدة</FilterLabel>
                  <FilterSelect
                    value={filters.duration}
                    onChange={(e) => handleFilterChange('duration', e.target.value)}
                  >
                    <option value="">جميع المدد</option>
                    <option value="short">قصيرة (أقل من ساعة)</option>
                    <option value="medium">متوسطة (1-4 ساعات)</option>
                    <option value="long">طويلة (أكثر من 4 ساعات)</option>
                  </FilterSelect>
                </FilterGroup>

                <FilterGroup>
                  <FilterLabel>السعر</FilterLabel>
                  <FilterSelect
                    value={filters.price}
                    onChange={(e) => handleFilterChange('price', e.target.value)}
                  >
                    <option value="">جميع الأسعار</option>
                    <option value="free">مجاني</option>
                    <option value="low">منخفض (أقل من 100 ريال)</option>
                    <option value="medium">متوسط (100-500 ريال)</option>
                    <option value="high">عالي (أكثر من 500 ريال)</option>
                  </FilterSelect>
                </FilterGroup>
              </FiltersSection>

              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginTop: '1rem',
                justifyContent: 'center'
              }}>
                <SearchButton type="button" onClick={clearFilters}>
                  مسح الفلاتر
                </SearchButton>
              </div>
            </AdvancedFilters>
          )}
        </AnimatePresence>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar;
