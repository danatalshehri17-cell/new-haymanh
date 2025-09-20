import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishDate: Date;
  readTime: number;
  image: string;
  likes: number;
  comments: number;
  isFeatured?: boolean;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

const BlogContainer = styled.div`
  padding-top: 80px;
  direction: rtl;
`;

const BlogHeader = styled.section`
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.primary} 0%, 
    ${({ theme }) => theme.colors.secondary} 100%);
  color: white;
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
  text-align: center;
`;

const BlogTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.display};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: 800;
`;

const BlogSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const SearchSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const BlogContent = styled.section`
  padding: ${({ theme }) => theme.spacing.xxxl} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`;

const FeaturedPost = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.large};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const FeaturedImage = styled.div<{ image: string }>`
  height: 400px;
  background: url(${({ image }) => image}) center/cover;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
  }
`;

const FeaturedContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const FeaturedBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeaturedTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.3;
`;

const FeaturedExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const FeaturedMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const AuthorInfo = styled.div`
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
`;

const AuthorDetails = styled.div`
  text-align: right;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const AuthorRole = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
`;

const BlogCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const CardImage = styled.div<{ image: string }>`
  height: 200px;
  background: url(${({ image }) => image}) center/cover;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardCategory = styled.span`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.4;
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

const CardExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const CardStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState({
    category: '',
    level: '',
    duration: '',
    price: '',
  });

  const featuredPost: BlogPost = {
    id: '1',
    title: 'قصة تأسيس مبادرة هيمنة النجاح: كيف بدأنا رحلة تمكين الشباب',
    excerpt: 'اكتشف القصة الملهمة وراء تأسيس مبادرة هيمنة النجاح، وكيف تحولت فكرة بسيطة إلى مشروع وطني يهدف لتمكين الشباب وتحقيق أحلامهم.',
    content: 'محتوى المقال الكامل...',
    author: {
      name: 'محمد عصام حسن',
      avatar: 'م',
      role: 'الرئيس التنفيذي'
    },
    category: 'قصص النجاح',
    tags: ['مبادرة', 'تمكين الشباب', 'قصص نجاح'],
    publishDate: new Date('2024-01-15'),
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
    likes: 245,
    comments: 18,
    isFeatured: true
  };

  const blogPosts: BlogPost[] = [
    {
      id: '2',
      title: 'كيف تبدأ رحلتك في عالم البرمجة: دليل شامل للمبتدئين',
      excerpt: 'اكتشف الخطوات الأساسية لبدء رحلتك في عالم البرمجة مع برامج مبادرة هيمنة النجاح. دليل شامل يغطي كل ما تحتاج معرفته.',
      content: 'محتوى المقال...',
      author: {
        name: 'سارة أحمد',
        avatar: 'س',
        role: 'مدربة في مبادرة هيمنة النجاح'
      },
      category: 'التعلم التقني',
      tags: ['برمجة', 'مبتدئين', 'تعليم'],
      publishDate: new Date('2024-01-10'),
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800',
      likes: 189,
      comments: 12
    },
    {
      id: '3',
      title: 'قصة نجاح: من طالب إلى مطور محترف في 6 أشهر',
      excerpt: 'تعرف على قصة أحمد الذي انضم لمبادرة هيمنة النجاح وتحول من طالب مبتدئ إلى مطور محترف في وقت قياسي.',
      content: 'محتوى المقال...',
      author: {
        name: 'أحمد حسن',
        avatar: 'أ',
        role: 'خريج مبادرة هيمنة النجاح'
      },
      category: 'قصص النجاح',
      tags: ['نجاح', 'تعلم', 'تطوير'],
      publishDate: new Date('2024-01-08'),
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      likes: 312,
      comments: 25
    },
    {
      id: '4',
      title: 'أفضل الممارسات لبناء مشروعك التقني الأول',
      excerpt: 'نصائح عملية ومفيدة من خبراء مبادرة هيمنة النجاح لبناء مشروعك التقني الأول، من الفكرة إلى النشر.',
      content: 'محتوى المقال...',
      author: {
        name: 'فاطمة محمد',
        avatar: 'ف',
        role: 'مدربة في مبادرة هيمنة النجاح'
      },
      category: 'نصائح عملية',
      tags: ['مشاريع', 'نصائح', 'تقنية'],
      publishDate: new Date('2024-01-05'),
      readTime: 7,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800',
      likes: 156,
      comments: 9
    }
  ];

  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query);
    setSearchFilters(filters);
    // هنا يمكن إضافة منطق البحث الفعلي
    console.log('Search:', query, filters);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <BlogContainer>
      <BlogHeader>
        <Container>
                  <BlogTitle>مدونتنا</BlogTitle>
        <BlogSubtitle style={{ color: '#DC2626' }}>
          اكتشف أحدث المقالات والنصائح من مبادرة هيمنة النجاح. مقالات تعليمية، قصص نجاح، ونصائح عملية لتحقيق أحلامك
        </BlogSubtitle>
        </Container>
      </BlogHeader>

      <SearchSection>
        <Container>
          <SearchBar onSearch={handleSearch} />
        </Container>
      </SearchSection>

      <BlogContent>
        <Container>
          <FeaturedPost
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FeaturedImage image={featuredPost.image} />
            <FeaturedContent>
              <FeaturedBadge>مقال مميز</FeaturedBadge>
              <FeaturedTitle>{featuredPost.title}</FeaturedTitle>
              <FeaturedExcerpt>{featuredPost.excerpt}</FeaturedExcerpt>
              
              <FeaturedMeta>
                <AuthorInfo>
                  <AuthorAvatar>{featuredPost.author.avatar}</AuthorAvatar>
                  <AuthorDetails>
                    <AuthorName>{featuredPost.author.name}</AuthorName>
                    <AuthorRole>{featuredPost.author.role}</AuthorRole>
                  </AuthorDetails>
                </AuthorInfo>
                
                <PostMeta>
                  <span>📅 {formatDate(featuredPost.publishDate)}</span>
                  <span>⏱️ {featuredPost.readTime} دقائق للقراءة</span>
                  <span>❤️ {featuredPost.likes}</span>
                  <span>💬 {featuredPost.comments}</span>
                </PostMeta>
              </FeaturedMeta>
            </FeaturedContent>
          </FeaturedPost>

          <BlogGrid>
            {blogPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CardImage image={post.image} />
                <CardContent>
                  <CardCategory>{post.category}</CardCategory>
                  <CardTitle>{post.title}</CardTitle>
                  <CardExcerpt>{post.excerpt}</CardExcerpt>
                  
                  <CardMeta>
                    <div>
                      <span>{post.author.name}</span>
                      <span> • {formatDate(post.publishDate)}</span>
                    </div>
                    <CardStats>
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </CardStats>
                  </CardMeta>
                </CardContent>
              </BlogCard>
            ))}
          </BlogGrid>

          <LoadMoreButton>
            عرض المزيد من المقالات
          </LoadMoreButton>
        </Container>
      </BlogContent>
    </BlogContainer>
  );
};

export default Blog;
