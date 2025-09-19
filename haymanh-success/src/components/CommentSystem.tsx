import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
}

interface CommentSystemProps {
  comments: Comment[];
  onAddComment: (content: string, parentId?: string) => void;
  onLikeComment: (commentId: string) => void;
}

const CommentContainer = styled.div`
  direction: rtl;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const CommentSectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CommentForm = styled.form`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: inherit;
  resize: vertical;
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

const CommentFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const CommentButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CommentItem = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 2px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

const AuthorInfo = styled.div`
  text-align: right;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CommentTime = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const CommentContent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CommentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const ActionButton = styled.button<{ isActive?: boolean }>`
  background: none;
  border: none;
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.textLight};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ReplyForm = styled.form<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ReplyInput = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: inherit;
  resize: vertical;
  transition: all 0.3s ease;
  direction: rtl;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ReplyActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }
`;

const ReplyButton = styled(CommentButton)`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const RepliesContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.xl};
  padding-right: ${({ theme }) => theme.spacing.lg};
  border-right: 2px solid ${({ theme }) => theme.colors.border};
`;

const CommentSystem: React.FC<CommentSystemProps> = ({
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const handleSubmitReply = (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onAddComment(replyContent.trim(), parentId);
      setReplyContent('');
      setReplyTo(null);
    }
  };

  const handleReply = (commentId: string) => {
    setReplyTo(replyTo === commentId ? null : commentId);
    setReplyContent('');
  };

  const formatTime = (timestamp: Date): string => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    if (days < 7) return `منذ ${days} يوم`;
    return timestamp.toLocaleDateString('ar-SA');
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <CommentItem
      key={comment.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CommentHeader>
        <CommentAuthor>
          <AuthorAvatar>{comment.author.avatar}</AuthorAvatar>
          <AuthorInfo>
            <AuthorName>{comment.author.name}</AuthorName>
            <CommentTime>{formatTime(comment.timestamp)}</CommentTime>
          </AuthorInfo>
        </CommentAuthor>
      </CommentHeader>

      <CommentContent>{comment.content}</CommentContent>

      <CommentActions>
        <ActionButton
          onClick={() => onLikeComment(comment.id)}
          isActive={comment.isLiked}
        >
          {comment.isLiked ? '❤️' : '🤍'} {comment.likes}
        </ActionButton>
        
        {!isReply && (
          <ActionButton onClick={() => handleReply(comment.id)}>
            💬 رد
          </ActionButton>
        )}
      </CommentActions>

      {!isReply && (
        <ReplyForm isVisible={replyTo === comment.id}>
          <ReplyInput
            placeholder="اكتب ردك هنا..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <ReplyActions>
            <CancelButton onClick={() => setReplyTo(null)}>
              إلغاء
            </CancelButton>
            <ReplyButton
              type="submit"
              onClick={(e) => handleSubmitReply(e, comment.id)}
              disabled={!replyContent.trim()}
            >
              إرسال الرد
            </ReplyButton>
          </ReplyActions>
        </ReplyForm>
      )}

      {comment.replies.length > 0 && !isReply && (
        <RepliesContainer>
          {comment.replies.map((reply) => renderComment(reply, true))}
        </RepliesContainer>
      )}
    </CommentItem>
  );

  return (
    <CommentContainer>
      <CommentSectionTitle>
        💬 التعليقات ({comments.length})
      </CommentSectionTitle>

      <CommentForm onSubmit={handleSubmitComment}>
        <CommentInput
          placeholder="اكتب تعليقك هنا..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <CommentFormFooter>
          <CommentButton
            type="submit"
            disabled={!newComment.trim()}
          >
            إرسال التعليق
          </CommentButton>
        </CommentFormFooter>
      </CommentForm>

      <CommentList>
        <AnimatePresence>
          {comments.map((comment) => renderComment(comment))}
        </AnimatePresence>
      </CommentList>
    </CommentContainer>
  );
};

export default CommentSystem;
