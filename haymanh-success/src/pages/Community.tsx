import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CommunityContainer = styled.div`
  padding-top: 80px;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4C1D95 0%, #DC2626 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  text-align: center;
`;

const HeroTitle = styled(motion.h1)`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: 3.5rem;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.9;
  color: ${({ theme }) => theme.colors.textHighlight};
  font-weight: 600;
  line-height: 1.6;
`;

const TabsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  background: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  min-height: 500px;
`;

const PostCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const PostHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostAvatar = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
`;

const PostInfo = styled.div`
  flex: 1;
`;

const PostAuthor = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const PostTime = styled.span`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const PostContent = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const PostText = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin: 0;
`;

const PostActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textLight};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const CommentInput = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CommentTextarea = styled.textarea`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-end;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const CommentItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

const CommentAvatar = styled.div`
  width: 35px;
  height: 35px;
  background: linear-gradient(135deg, #FF6B35 0%, #DC2626 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
`;

const CommentContent = styled.div`
  flex: 1;
`;

const CommentAuthor = styled.h5`
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CommentText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
`;

const CreatePostSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  box-shadow: ${({ theme }) => theme.shadows.small};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const CreatePostTitle = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const CreatePostForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PostInput = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const PostTextarea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes.md};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'أحمد محمد',
      avatar: 'أ',
      time: 'منذ ساعتين',
      title: 'كيف تطور مهاراتك في البرمجة؟',
      content: 'أريد أن أشارك معكم تجربتي في تطوير مهارات البرمجة. ما هي أفضل الطرق التي جربتموها؟',
      likes: 15,
      comments: [
        { id: 1, author: 'فاطمة علي', avatar: 'ف', text: 'أعتقد أن الممارسة المستمرة هي المفتاح الأساسي' },
        { id: 2, author: 'محمد حسن', avatar: 'م', text: 'أوافقك الرأي، وأضيف أن قراءة الكود الجيد مهمة جداً' }
      ]
    },
    {
      id: 2,
      author: 'سارة أحمد',
      avatar: 'س',
      time: 'منذ 4 ساعات',
      title: 'نصائح لريادة الأعمال',
      content: 'أفكر في بدء مشروعي الخاص. هل لديكم نصائح أو تجارب تريدون مشاركتها معي؟',
      likes: 8,
      comments: [
        { id: 3, author: 'أحمد محمد', avatar: 'أ', text: 'ابدأ صغيراً وتعلم من كل خطأ' }
      ]
    }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [newComment, setNewComment] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const post = {
        id: posts.length + 1,
        author: 'أنت',
        avatar: 'أ',
        time: 'الآن',
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '' });
    }
  };

  const handleAddComment = (postId: number) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'أنت',
        avatar: 'أ',
        text: newComment
      };
      
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ));
      setNewComment('');
    }
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'discussions':
        return (
          <>
            <CreatePostSection>
              <CreatePostTitle>ابدأ مناقشة جديدة</CreatePostTitle>
              <CreatePostForm onSubmit={handleCreatePost}>
                <PostInput
                  placeholder="عنوان المناقشة..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <PostTextarea
                  placeholder="اكتب محتوى مناقشتك هنا..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <SubmitButton type="submit">نشر المناقشة</SubmitButton>
              </CreatePostForm>
            </CreatePostSection>

            {posts.map((post) => (
              <PostCard
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <PostHeader>
                  <PostAvatar>{post.avatar}</PostAvatar>
                  <PostInfo>
                    <PostAuthor>{post.author}</PostAuthor>
                    <PostTime>{post.time}</PostTime>
                  </PostInfo>
                </PostHeader>
                
                <PostContent>
                  <PostTitle>{post.title}</PostTitle>
                  <PostText>{post.content}</PostText>
                </PostContent>

                <PostActions>
                  <ActionButton onClick={() => handleLike(post.id)}>
                    👍 {post.likes}
                  </ActionButton>
                  <ActionButton>
                    💬 {post.comments.length} تعليق
                  </ActionButton>
                  <ActionButton>
                    🔗 مشاركة
                  </ActionButton>
                </PostActions>

                <CommentsSection>
                  <CommentInput>
                    <CommentTextarea
                      placeholder="اكتب تعليقك..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <CommentButton onClick={() => handleAddComment(post.id)}>
                      تعليق
                    </CommentButton>
                  </CommentInput>

                  {post.comments.map((comment) => (
                    <CommentItem key={comment.id}>
                      <CommentAvatar>{comment.avatar}</CommentAvatar>
                      <CommentContent>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentText>{comment.text}</CommentText>
                      </CommentContent>
                    </CommentItem>
                  ))}
                </CommentsSection>
              </PostCard>
            ))}
          </>
        );

      case 'events':
        return (
          <>
            <CreatePostSection>
              <CreatePostTitle>أضف فعالية جديدة</CreatePostTitle>
              <CreatePostForm onSubmit={handleCreatePost}>
                <PostInput
                  placeholder="عنوان الفعالية..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <PostTextarea
                  placeholder="وصف الفعالية، التاريخ، الموقع..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <SubmitButton type="submit">إضافة الفعالية</SubmitButton>
              </CreatePostForm>
            </CreatePostSection>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PostHeader>
                <PostAvatar>🎯</PostAvatar>
                <PostInfo>
                  <PostAuthor>مبادرة هيمنة النجاح</PostAuthor>
                  <PostTime>15 يناير 2025</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>ورشة تطوير المهارات القيادية</PostTitle>
                <PostText>ورشة عملية لتعلم أساسيات القيادة الفعالة وإدارة الفرق. ستتعلم كيفية تحفيز فريقك وتحقيق الأهداف المشتركة.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 45
                </ActionButton>
                <ActionButton>
                  💬 12 تعليق
                </ActionButton>
                <ActionButton>
                  📅 سجل الآن
                </ActionButton>
              </PostActions>
            </PostCard>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PostHeader>
                <PostAvatar>👥</PostAvatar>
                <PostInfo>
                  <PostAuthor>مجتمع المطورين</PostAuthor>
                  <PostTime>22 يناير 2025</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>لقاء مجتمعي شهري</PostTitle>
                <PostText>لقاء دوري لأعضاء المجتمع لتبادل الخبرات والتواصل. سنناقش أحدث التقنيات والمشاريع المثيرة.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 32
                </ActionButton>
                <ActionButton>
                  💬 8 تعليقات
                </ActionButton>
                <ActionButton>
                  📅 سجل الآن
                </ActionButton>
              </PostActions>
            </PostCard>
          </>
        );

      case 'resources':
        return (
          <>
            <CreatePostSection>
              <CreatePostTitle>أضف مورد تعليمي</CreatePostTitle>
              <CreatePostForm onSubmit={handleCreatePost}>
                <PostInput
                  placeholder="عنوان المورد..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <PostTextarea
                  placeholder="وصف المورد، الرابط، الفئة..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <SubmitButton type="submit">إضافة المورد</SubmitButton>
              </CreatePostForm>
            </CreatePostSection>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PostHeader>
                <PostAvatar>📚</PostAvatar>
                <PostInfo>
                  <PostAuthor>أحمد محمد</PostAuthor>
                  <PostTime>منذ يومين</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>دورة React المتقدمة</PostTitle>
                <PostText>دورة شاملة لتعلم React.js مع TypeScript. تتضمن مشاريع عملية وأفضل الممارسات في التطوير.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 28
                </ActionButton>
                <ActionButton>
                  💬 5 تعليقات
                </ActionButton>
                <ActionButton>
                  🔗 عرض المورد
                </ActionButton>
              </PostActions>
            </PostCard>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PostHeader>
                <PostAvatar>🎥</PostAvatar>
                <PostInfo>
                  <PostAuthor>فاطمة علي</PostAuthor>
                  <PostTime>منذ 3 أيام</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>سلسلة فيديوهات تطوير الذات</PostTitle>
                <PostText>مجموعة من الفيديوهات القصيرة لمساعدتك على تطوير مهاراتك الشخصية والمهنية.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 41
                </ActionButton>
                <ActionButton>
                  💬 9 تعليقات
                </ActionButton>
                <ActionButton>
                  🔗 عرض المورد
                </ActionButton>
              </PostActions>
            </PostCard>
          </>
        );

      case 'members':
        return (
          <>
            <CreatePostSection>
              <CreatePostTitle>عرض نفسك للمجتمع</CreatePostTitle>
              <CreatePostForm onSubmit={handleCreatePost}>
                <PostInput
                  placeholder="اسمك ومجال تخصصك..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <PostTextarea
                  placeholder="اكتب عن نفسك، خبراتك، اهتماماتك..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <SubmitButton type="submit">عرض نفسي</SubmitButton>
              </CreatePostForm>
            </CreatePostSection>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <PostHeader>
                <PostAvatar>أ</PostAvatar>
                <PostInfo>
                  <PostAuthor>أحمد محمد</PostAuthor>
                  <PostTime>عضو منذ 6 أشهر</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>مطور برمجيات متخصص</PostTitle>
                <PostText>خبرة 8 سنوات في تطوير التطبيقات، متخصص في React و Node.js. أحب مشاركة المعرفة ومساعدة الآخرين.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 67
                </ActionButton>
                <ActionButton>
                  💬 15 تعليق
                </ActionButton>
                <ActionButton>
                  👋 تواصل معي
                </ActionButton>
              </PostActions>
            </PostCard>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <PostHeader>
                <PostAvatar>ف</PostAvatar>
                <PostInfo>
                  <PostAuthor>فاطمة علي</PostAuthor>
                  <PostTime>عضو منذ 4 أشهر</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>مدربة تنمية بشرية</PostTitle>
                <PostText>مساعدة الشباب على اكتشاف قدراتهم وتحقيق أحلامهم. متخصصة في تطوير المهارات القيادية والذكاء العاطفي.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 53
                </ActionButton>
                <ActionButton>
                  💬 11 تعليق
                </ActionButton>
                <ActionButton>
                  👋 تواصل معي
                </ActionButton>
              </PostActions>
            </PostCard>

            <PostCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PostHeader>
                <PostAvatar>م</PostAvatar>
                <PostInfo>
                  <PostAuthor>محمد حسن</PostAuthor>
                  <PostTime>عضو منذ سنة</PostTime>
                </PostInfo>
              </PostHeader>
              
              <PostContent>
                <PostTitle>رجل أعمال ومستشار</PostTitle>
                <PostText>مؤسس عدة مشاريع ناجحة، متخصص في ريادة الأعمال والتسويق الرقمي. أحب مشاركة تجاربي مع الشباب الطموح.</PostText>
              </PostContent>

              <PostActions>
                <ActionButton>
                  👍 89
                </ActionButton>
                <ActionButton>
                  💬 23 تعليق
                </ActionButton>
                <ActionButton>
                  👋 تواصل معي
                </ActionButton>
              </PostActions>
            </PostCard>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <CommunityContainer>
      <HeroSection>
        <div className="container">
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            مجتمع هيمنة النجاح
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            انضم إلى مجتمع من الناجحين والمتحمسين للنجاح، حيث يمكنك المشاركة والتعلم والتواصل
          </HeroSubtitle>
        </div>
      </HeroSection>

      <TabsSection>
        <div className="container">
          <TabsContainer>
            <TabButton
              isActive={activeTab === 'discussions'}
              onClick={() => setActiveTab('discussions')}
            >
              💬 المناقشات
            </TabButton>
            <TabButton
              isActive={activeTab === 'events'}
              onClick={() => setActiveTab('events')}
            >
              🎯 الفعاليات
            </TabButton>
            <TabButton
              isActive={activeTab === 'resources'}
              onClick={() => setActiveTab('resources')}
            >
              📚 الموارد
            </TabButton>
            <TabButton
              isActive={activeTab === 'members'}
              onClick={() => setActiveTab('members')}
            >
              👥 الأعضاء
            </TabButton>
          </TabsContainer>
        </div>
      </TabsSection>

      <ContentSection>
        <div className="container">
          {renderContent()}
        </div>
      </ContentSection>
    </CommunityContainer>
  );
};

export default Community;
