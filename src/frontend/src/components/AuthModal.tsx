import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';



// Password Strength Indicator Component
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    const requirements = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /\d/.test(pass),
      special: /[@$!%*?&]/.test(pass)
    };
    
    score += requirements.length ? 1 : 0;
    score += requirements.uppercase ? 1 : 0;
    score += requirements.lowercase ? 1 : 0;
    score += requirements.number ? 1 : 0;
    score += requirements.special ? 1 : 0;
    
    return { score, requirements };
  };

  const { score, requirements } = getPasswordStrength(password);
  
  const getStrengthText = () => {
    if (score === 0) return 'ضعيفة جداً';
    if (score <= 2) return 'ضعيفة';
    if (score <= 3) return 'متوسطة';
    if (score <= 4) return 'جيدة';
    return 'قوية جداً';
  };

  const getStrengthColor = () => {
    if (score === 0) return '#ff4444';
    if (score <= 2) return '#ff8800';
    if (score <= 3) return '#ffaa00';
    if (score <= 4) return '#00aa00';
    return '#00ff00';
  };

  return (
    <PasswordStrengthContainer>
      <PasswordStrengthBar>
        <PasswordStrengthFill 
          strength={score} 
          color={getStrengthColor()}
        />
      </PasswordStrengthBar>
      <PasswordStrengthText color={getStrengthColor()}>
        قوة كلمة المرور: {getStrengthText()}
      </PasswordStrengthText>
      <PasswordRequirements>
        <RequirementItem met={requirements.length}>
          ✓ 8 أحرف على الأقل
        </RequirementItem>
        <RequirementItem met={requirements.uppercase}>
          ✓ حرف كبير (A-Z)
        </RequirementItem>
        <RequirementItem met={requirements.lowercase}>
          ✓ حرف صغير (a-z)
        </RequirementItem>
        <RequirementItem met={requirements.number}>
          ✓ رقم (0-9)
        </RequirementItem>
        <RequirementItem met={requirements.special}>
          ✓ رمز خاص (@$!%*?&)
        </RequirementItem>
      </PasswordRequirements>
    </PasswordStrengthContainer>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange?: (mode: 'login' | 'register') => void;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 10px;
  }
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.large};
  direction: rtl;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 95%;
    padding: ${({ theme }) => theme.spacing.xl};
    margin: 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 100%;
    padding: ${({ theme }) => theme.spacing.lg};
    margin: 10px;
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: 768px) {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }
`;

const ModalTitle = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 1.75rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 1.5rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

const ModalSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 4px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all 0.3s ease;
  direction: rtl;
  min-height: 48px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
    min-height: 44px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    min-height: 40px;
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: ${({ theme }) => theme.spacing.md};
  min-height: 48px;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
    min-height: 44px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    min-height: 40px;
  }
`;

const SwitchMode = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spacing.md};
    padding-top: ${({ theme }) => theme.spacing.md};
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-weight: 600;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.background};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: ${({ theme }) => theme.spacing.xs};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: ${({ theme }) => theme.spacing.xs};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 36px;
    height: 36px;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const Message = styled.div<{ type: 'error' | 'success' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-align: center;
  font-weight: 500;
  
  ${({ type, theme }) => type === 'error' 
    ? `
      background: #FEE2E2;
      color: #DC2626;
      border: 1px solid #FECACA;
    `
    : `
      background: #D1FAE5;
      color: #059669;
      border: 1px solid #A7F3D0;
    `
  }
`;

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  console.log('AuthModal rendered, isOpen:', isOpen, 'mode:', mode);
  console.log('AuthModal props received:', { isOpen, mode });
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModeSwitch = () => {
    const newMode = mode === 'login' ? 'register' : 'login';
    if (onModeChange) {
      onModeChange(newMode);
    }
    // إعادة تعيين النموذج
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (mode === 'login') {
        try {
          const success = await login(formData.email, formData.password);
          if (success) {
            setSuccess('تم تسجيل الدخول بنجاح!');
            setTimeout(() => {
              onClose();
              setSuccess('');
            }, 1500);
          }
        } catch (loginError: any) {
          setError(loginError.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('كلمات المرور غير متطابقة');
          setIsLoading(false);
          return;
        }
        
        try {
          const success = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
          });
          
          if (success) {
            setSuccess('تم الانضمام بنجاح!');
            setTimeout(() => {
              onClose();
              setSuccess('');
            }, 1500);
          }
        } catch (registerError: any) {
          setError(registerError.message || 'حدث خطأ أثناء الانضمام');
        }
      }
    } catch (error) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setIsLoading(false);
    }
  };

  // Remove duplicate variable declaration

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>✕</CloseButton>
            
            <ModalHeader>
              <ModalTitle>
                {mode === 'login' ? 'تسجيل الدخول' : 'انضم إلينا'}
              </ModalTitle>
              <ModalSubtitle>
                {mode === 'login'
                  ? 'أدخل بياناتك للوصول إلى حسابك' 
                  : 'انضم إلى مجتمع هيمنة النجاح'
                }
              </ModalSubtitle>
            </ModalHeader>

            <Form onSubmit={handleSubmit}>
              {error && <Message type="error">{error}</Message>}
              {success && <Message type="success">{success}</Message>}
              
              {mode !== 'login' && (
                <>
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="firstName">الاسم الأول</Label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label htmlFor="lastName">اسم العائلة</Label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>
                </>
              )}

              <FormGroup>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              {mode !== 'login' ? (
                <FormRow>
                  <FormGroup>
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <PasswordStrengthIndicator password={formData.password} />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </FormRow>
              ) : (
                <FormGroup>
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              )}

              <SubmitButton type="submit" disabled={isLoading}>
                {isLoading 
                  ? 'جاري التحميل...' 
                  : (mode === 'login' ? 'تسجيل الدخول' : 'انضم إلينا')
                }
              </SubmitButton>
            </Form>

            <SwitchMode>
              <span>
                {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              </span>
              <br />
              <SwitchButton type="button" onClick={handleModeSwitch}>
                {mode === 'login' ? 'انضم إلينا' : 'تسجيل الدخول'}
              </SwitchButton>
            </SwitchMode>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

// Password Strength Styled Components
const PasswordStrengthContainer = styled.div`
  margin-top: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const PasswordStrengthBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
`;

const PasswordStrengthFill = styled.div<{ strength: number; color: string }>`
  height: 100%;
  width: ${({ strength }) => (strength / 5) * 100}%;
  background: ${({ color }) => color};
  transition: width 0.3s ease;
`;

const PasswordStrengthText = styled.div<{ color: string }>`
  font-size: 12px;
  color: ${({ color }) => color};
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
`;

const PasswordRequirements = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RequirementItem = styled.div<{ met: boolean }>`
  font-size: 11px;
  color: ${({ met, theme }) => met ? '#00aa00' : theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '${({ met }) => met ? '✓' : '○'}';
    color: ${({ met }) => met ? '#00aa00' : '#ccc'};
    font-weight: bold;
  }
`;

export default AuthModal;
