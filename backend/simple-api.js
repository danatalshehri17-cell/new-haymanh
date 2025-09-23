const express = require('express');
const cors = require('cors');
const app = express();

// إعداد CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

app.use(express.json());

// البيانات التجريبية
const demoOpportunities = [
  {
    _id: 'opp1',
    title: 'معسكر بيدر 2025',
    description: 'في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بـَـيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح.',
    shortDescription: 'معسكر ريادة الأعمال والابتكار',
    type: 'camp',
    category: 'business',
    company: {
      name: 'بيدر',
      logo: '/images/bedar-camp-2025.jpeg',
      website: 'https://bedar.com',
      description: 'منصة ريادة الأعمال والابتكار'
    },
    location: {
      type: 'onsite',
      address: 'الرياض، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['أي مستوى تعليمي'],
      experience: ['لا توجد متطلبات مسبقة'],
      skills: ['ريادة الأعمال', 'الابتكار', 'العمل الجماعي'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['شهادة مشاركة', 'شبكة علاقات', 'تطوير المهارات'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-03-01T00:00:00.000Z',
    maxApplicants: 100,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['ريادة الأعمال', 'الابتكار', 'المعسكر'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp2',
    title: 'هاكاثون الطاقة (طاقتثون) 2025',
    description: 'هاكاثون مخصص لتطوير حلول مبتكرة في مجال الطاقة المستدامة والتقنيات الخضراء.',
    shortDescription: 'هاكاثون الطاقة المستدامة',
    type: 'competition',
    category: 'environment',
    company: {
      name: 'طاقتثون',
      logo: '/images/energy-hackathon-2025.jpeg',
      website: 'https://energy-hackathon.com',
      description: 'منصة الابتكار في الطاقة المستدامة'
    },
    location: {
      type: 'onsite',
      address: 'الرياض، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['أي مستوى تعليمي'],
      experience: ['لا توجد متطلبات مسبقة'],
      skills: ['البرمجة', 'الابتكار', 'الطاقة المستدامة'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص توظيف'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-04-01T00:00:00.000Z',
    maxApplicants: 200,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['هاكاثون', 'الطاقة', 'الاستدامة'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp3',
    title: 'جائزة مايدة محي الدين ناظر للابتكار 3',
    description: 'تحدي يجمع طالبات الجامعات لاستكشاف وتوظيف الابتكارات الجامعية.',
    shortDescription: 'جائزة الابتكار للطالبات',
    type: 'competition',
    category: 'education',
    company: {
      name: 'جائزة مايدة',
      logo: '/images/maida-award-2025.jpeg',
      website: 'https://maida-award.com',
      description: 'جائزة الابتكار للطالبات'
    },
    location: {
      type: 'onsite',
      address: 'الرياض، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['طالبة جامعية'],
      experience: ['لا توجد متطلبات مسبقة'],
      skills: ['الابتكار', 'البحث العلمي', 'العمل الجماعي'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص تطوير'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-05-01T00:00:00.000Z',
    maxApplicants: 150,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['جائزة', 'الابتكار', 'الطالبات'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp4',
    title: 'برنامج ريادة الأعمال لتطوير الألعاب - اليابان',
    description: 'برنامج تدريبي مكثف لمطوري الألعاب السعوديين في اليابان، يشمل التدريب التقني وريادة الأعمال.',
    shortDescription: 'برنامج تطوير الألعاب في اليابان',
    type: 'internship',
    category: 'technology',
    company: {
      name: 'برنامج اليابان',
      logo: '/images/game-development-japan.jpeg',
      website: 'https://japan-program.com',
      description: 'برنامج التدريب في اليابان'
    },
    location: {
      type: 'onsite',
      address: 'اليابان',
      country: 'Japan'
    },
    requirements: {
      education: ['بكالوريوس في علوم الحاسب'],
      experience: ['خبرة في تطوير الألعاب'],
      skills: ['البرمجة', 'تطوير الألعاب', 'ريادة الأعمال'],
      languages: ['العربية', 'الإنجليزية', 'اليابانية']
    },
    benefits: ['تدريب مكثف', 'شهادة دولية', 'فرص توظيف'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-06-01T00:00:00.000Z',
    maxApplicants: 50,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['تطوير الألعاب', 'اليابان', 'ريادة الأعمال'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp5',
    title: 'Intersec Saudi Arabia 2025',
    description: 'مؤتمر ومعرض رائد في مجال الأمن والسلامة يجمع أكثر من 370 عارضًا من 35 دولة لاستكشاف أحدث الحلول الأمنية.',
    shortDescription: 'مؤتمر الأمن والسلامة',
    type: 'conference',
    category: 'technology',
    company: {
      name: 'Intersec',
      logo: '/images/intersec-saudi-2025.jpeg',
      website: 'https://intersec.com',
      description: 'مؤتمر الأمن والسلامة الدولي'
    },
    location: {
      type: 'onsite',
      address: 'الرياض، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['أي مستوى تعليمي'],
      experience: ['اهتمام بمجال الأمن'],
      skills: ['الأمن السيبراني', 'التقنية', 'الشبكات'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['شهادة حضور', 'شبكة علاقات', 'معرفة حديثة'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-07-01T00:00:00.000Z',
    maxApplicants: 500,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['مؤتمر', 'الأمن', 'السلامة'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp6',
    title: 'حاضنة الذكاء الاصطناعي 2025',
    description: 'حاضنة متخصصة في دعم مشاريع الذكاء الاصطناعي للمبدعين من عمر 15 وفوق، توفر الدعم التقني والاستشارات والتمويل.',
    shortDescription: 'حاضنة الذكاء الاصطناعي',
    type: 'startup',
    category: 'technology',
    company: {
      name: 'حاضنة الذكاء الاصطناعي',
      logo: '/images/ai-incubator-2025.jpeg',
      website: 'https://ai-incubator.com',
      description: 'حاضنة متخصصة في الذكاء الاصطناعي'
    },
    location: {
      type: 'onsite',
      address: 'الرياض، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['أي مستوى تعليمي'],
      experience: ['فكرة مشروع في الذكاء الاصطناعي'],
      skills: ['الذكاء الاصطناعي', 'البرمجة', 'ريادة الأعمال'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['تمويل', 'استشارات', 'شبكة علاقات'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-08-01T00:00:00.000Z',
    maxApplicants: 30,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['الذكاء الاصطناعي', 'الحاضنة', 'التمويل'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp7',
    title: 'معرض التوظيف 2025 - جامعة الملك فهد للبترول والمعادن',
    description: 'معرض التوظيف السنوي لجامعة الملك فهد للبترول والمعادن تحت رعاية سعادة رئيس الجامعة، يفتح الآفاق ويبني المستقبل للخريجين.',
    shortDescription: 'معرض التوظيف الجامعي',
    type: 'job_fair',
    category: 'education',
    company: {
      name: 'جامعة الملك فهد',
      logo: '/images/job-fair-2025.jpeg',
      website: 'https://kfupm.edu.sa',
      description: 'جامعة الملك فهد للبترول والمعادن'
    },
    location: {
      type: 'onsite',
      address: 'الظهران، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['خريج جامعي'],
      experience: ['لا توجد متطلبات مسبقة'],
      skills: ['التخصص المطلوب', 'المهارات الناعمة'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['فرص توظيف', 'شبكة علاقات', 'استشارات مهنية'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-09-01T00:00:00.000Z',
    maxApplicants: 6000,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['معرض التوظيف', 'الجامعة', 'الخريجين'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp8',
    title: 'برنامج موهبة للالتحاق بالجامعات المرموقة (التميز) 2025',
    description: 'برنامج تدريبي متكامل لتأهيل وإعداد أفضل الطلبة الراغبين في الدراسة في الجامعات الأمريكية المرموقة المصنفة من ضمن أفضل 50 جامعة على مستوى العالم.',
    shortDescription: 'برنامج التميز للجامعات الأمريكية',
    type: 'scholarship',
    category: 'education',
    company: {
      name: 'موهبة',
      logo: '/images/mawhiba-excellence.jpeg',
      website: 'https://mawhiba.org.sa',
      description: 'مؤسسة الملك عبدالعزيز ورجاله للموهبة والإبداع'
    },
    location: {
      type: 'onsite',
      address: 'الرياض، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['طالب ثانوي'],
      experience: ['تميز أكاديمي'],
      skills: ['اللغة الإنجليزية', 'القيادة', 'الابتكار'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['منحة دراسية', 'تدريب مكثف', 'فرص دولية'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-10-01T00:00:00.000Z',
    maxApplicants: 100,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['موهبة', 'التميز', 'الجامعات الأمريكية'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: 'opp9',
    title: 'ماراثون الأفكار أيدياثون 2025',
    description: 'ماراثون للأفكار والمشاريع المجتمعية في منطقة جازان، يهدف إلى تحفيز الابتكار وتطوير حلول مبتكرة للتحديات المحلية.',
    shortDescription: 'ماراثون الأفكار المجتمعية',
    type: 'competition',
    category: 'social-impact',
    company: {
      name: 'أيدياثون جازان',
      logo: '/images/ideathon-2025.jpeg',
      website: 'https://jazan-ideathon.com',
      description: 'ماراثون الأفكار المجتمعية'
    },
    location: {
      type: 'onsite',
      address: 'جازان، المملكة العربية السعودية',
      country: 'Saudi Arabia'
    },
    requirements: {
      education: ['أي مستوى تعليمي'],
      experience: ['اهتمام بالمشاريع المجتمعية'],
      skills: ['الابتكار', 'حل المشاكل', 'العمل الجماعي'],
      languages: ['العربية', 'الإنجليزية']
    },
    benefits: ['جوائز مالية', 'شهادة مشاركة', 'فرص تطوير'],
    applicationDeadline: '2025-12-31T00:00:00.000Z',
    startDate: '2025-11-01T00:00:00.000Z',
    maxApplicants: 150,
    currentApplicants: 0,
    status: 'active',
    isActive: true,
    isFeatured: true,
    isUrgent: false,
    tags: ['ماراثون', 'الأفكار', 'المجتمع'],
    language: 'ar',
    views: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Simple Haymanh API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/opportunities', (req, res) => {
  console.log('✅ Serving demo opportunities');
  res.json({
    success: true,
    data: {
      opportunities: demoOpportunities,
      pagination: {
        page: 1,
        limit: 10,
        total: demoOpportunities.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false
      }
    }
  });
});

app.post('/api/dashboard/opportunities', (req, res) => {
  // محاكاة إضافة فرصة للمستخدم
  res.json({
    success: true,
    message: 'تم إضافة الفرصة بنجاح!'
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Simple Haymanh API running on port ${PORT}`);
  console.log(`📊 Serving ${demoOpportunities.length} demo opportunities`);
});
