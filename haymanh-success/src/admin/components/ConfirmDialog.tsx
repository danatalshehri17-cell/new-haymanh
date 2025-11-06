import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const Dialog = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const DialogHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const DialogTitle = styled.h2`
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const DialogMessage = styled.p`
  color: #4a5568;
  font-size: 1rem;
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: 2rem;
`;

const DialogActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ConfirmButton = styled.button`
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

const CancelButton = styled.button`
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

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog= ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel
}) => {
  return (
    <Overlay onClick={onCancel}>
      <Dialog onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogMessage>{message}</DialogMessage>
        </DialogHeader>
        <DialogActions>
          <CancelButton onClick={onCancel}>
            ❌ {cancelText}
          </CancelButton>
          <ConfirmButton onClick={onConfirm}>
            ✅ {confirmText}
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </Overlay>
  );
};

export default ConfirmDialog;
