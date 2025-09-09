const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Store selected opportunities
let selectedOpportunities = [
  {
    opportunityId: {
      _id: 'opp1',
      title: 'فرصة تدريب تقني',
      category: 'technology'
    },
    status: 'selected',
    selectionDate: new Date().toISOString()
  }
];

// Store registered users
let users = [
  {
    id: '1',
    firstName: 'أحمد',
    lastName: 'محمد',
    email: 'test@example.com',
    password: '12345678'
  }
];

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Haymanh API is running',
    timestamp: new Date().toISOString()
  });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find user in database
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    res.json({
      success: true,
      token: `token-${user.id}-${Date.now()}`,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'البريد الإلكتروني مستخدم بالفعل'
    });
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    firstName,
    lastName,
    email,
    password
  };
  
  users.push(newUser);
  
  res.json({
    success: true,
    message: 'تم إنشاء الحساب بنجاح',
    token: `token-${newUser.id}-${Date.now()}`,
    user: {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
    }
  });
});

// Verify token endpoint
app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'توكن غير صالح'
    });
  }
  
  const token = authHeader.split(' ')[1];
  
  // Extract user ID from token
  const tokenParts = token.split('-');
  if (tokenParts.length >= 2 && tokenParts[0] === 'token') {
    const userId = tokenParts[1];
    const user = users.find(u => u.id === userId);
    
    if (user) {
      res.json({
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'توكن غير صالح'
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'توكن غير صالح'
    });
  }
});

// Dashboard endpoints
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    userProgress: {
      enrolledPrograms: [],
      selectedOpportunities: selectedOpportunities,
      statistics: {
        totalProgramsEnrolled: 0,
        totalOpportunitiesSelected: selectedOpportunities.length,
        totalApplicationsSubmitted: 0
      },
      recommendations: [
        {
          programId: 'program2',
          type: 'program',
          reason: 'مبني على اهتماماتك'
        },
        {
          opportunityId: 'opp2',
          type: 'opportunity',
          reason: 'مناسب لمجال اهتمامك'
        }
      ]
    }
  });
});

app.post('/api/dashboard/select-opportunity', (req, res) => {
  const { opportunityId } = req.body;
  
  // Check if opportunity already exists
  const exists = selectedOpportunities.find(opp => opp.opportunityId._id === opportunityId);
  if (exists) {
    return res.json({
      success: true,
      message: 'الفرصة مختارة بالفعل'
    });
  }
  
  // Add new opportunity
  const opportunityTitles = {
    'opp1': 'معسكر بيدر 2025',
    'opp2': 'هاكاثون الطاقة (طاقتثون) 2025',
    'opp3': 'جائزة مايدة محي الدين ناظر للابتكار 3',
    'opp4': 'برنامج ريادة الأعمال لتطوير الألعاب - اليابان',
    'opp5': 'Intersec Saudi Arabia 2025',
    'opp6': 'حاضنة الذكاء الاصطناعي 2025',
    'opp7': 'معرض التوظيف 2025 - جامعة الملك فهد للبترول والمعادن',
    'opp8': 'برنامج موهبة للالتحاق بالجامعات المرموقة (التميز) 2025',
    'opp9': 'ماراثون الأفكار أيدياثون 2025',
    'opp10': 'تطوع تعليم رقمي',
    'opp11': 'تدريب صيفي',
    'opp12': 'تطوع بيئي',
    'opp13': 'مؤتمر ذكاء اصطناعي',
    'opp14': 'مبادرة تمكين المرأة',
    'opp15': 'دعم أبحاث علمية',
    'opp16': 'تسريع مشاريع ناشئة',
    'opp17': 'ملتقى ريادة أعمال',
    'opp18': 'دعم مشاريع صغيرة',
    'opp19': 'منحة تخصصات نادرة',
    'opp20': 'مسابقة تطبيقات'
  };
  
  const opportunityCategories = {
    'opp1': 'camp', 'opp2': 'competition', 'opp3': 'competition',
    'opp4': 'internship', 'opp5': 'conference', 'opp6': 'incubator',
    'opp7': 'job_fair', 'opp8': 'scholarship', 'opp9': 'competition',
    'opp10': 'volunteer', 'opp11': 'internship', 'opp12': 'volunteer',
    'opp13': 'conference', 'opp14': 'initiative', 'opp15': 'research',
    'opp16': 'startup', 'opp17': 'entrepreneurship', 'opp18': 'startup',
    'opp19': 'education', 'opp20': 'competition'
  };
  
  const newOpportunity = {
    opportunityId: {
      _id: opportunityId,
      title: opportunityTitles[opportunityId] || 'فرصة جديدة',
      category: opportunityCategories[opportunityId] || 'general'
    },
    status: 'selected',
    selectionDate: new Date().toISOString()
  };
  
  selectedOpportunities.push(newOpportunity);
  
  res.json({
    success: true,
    message: 'تم اختيار الفرصة بنجاح'
  });
});

app.delete('/api/dashboard/selected-opportunities/:opportunityId', (req, res) => {
  const { opportunityId } = req.params;
  
  // إزالة الفرصة من القائمة
  const index = selectedOpportunities.findIndex(opp => opp.opportunityId._id === opportunityId);
  if (index > -1) {
    selectedOpportunities.splice(index, 1);
    res.json({
      success: true,
      message: 'تم إزالة الفرصة من القائمة المختارة'
    });
  } else {
    res.json({
      success: false,
      message: 'الفرصة غير موجودة في القائمة المختارة'
    });
  }
});

app.post('/api/dashboard/enroll', (req, res) => {
  res.json({
    success: true,
    message: 'تم التسجيل في البرنامج بنجاح'
  });
});

// Opportunities and Programs endpoints
app.get('/api/opportunities', (req, res) => {
  res.json({
    success: true,
    opportunities: [
      {
        _id: 'opp1',
        title: 'معسكر بيدر 2025',
        description: 'في ظل وجود عدد كبير من المشاريع الناشئة والأفكار الريادية الواعدة، يوفر بـَـيدر فرص كبيرة لتسخير وتركيز جهدك في المكان الصحيح.',
        category: 'camp',
        image: '/images/bedar-camp-2025.jpeg',
        status: 'active'
      },
      {
        _id: 'opp2',
        title: 'هاكاثون الطاقة (طاقتثون) 2025',
        description: 'هاكاثون مخصص لتطوير حلول مبتكرة في مجال الطاقة المستدامة والتقنيات الخضراء.',
        category: 'competition',
        image: '/images/energy-hackathon-2025.jpeg',
        status: 'active'
      },
      {
        _id: 'opp3',
        title: 'جائزة مايدة محي الدين ناظر للابتكار 3',
        description: 'تحدي يجمع طالبات الجامعات لاستكشاف وتوظيف الابتكارات الجامعية.',
        category: 'competition',
        image: '/images/maida-award-2025.jpeg',
        status: 'active'
      },
      {
        _id: 'opp4',
        title: 'برنامج ريادة الأعمال لتطوير الألعاب - اليابان',
        description: 'برنامج تدريبي مكثف لمطوري الألعاب السعوديين في اليابان، يشمل التدريب التقني وريادة الأعمال.',
        category: 'internship',
        image: '/images/game-development-japan.jpeg',
        status: 'active'
      },
      {
        _id: 'opp5',
        title: 'Intersec Saudi Arabia 2025',
        description: 'مؤتمر ومعرض رائد في مجال الأمن والسلامة يجمع أكثر من 370 عارضًا من 35 دولة لاستكشاف أحدث الحلول الأمنية.',
        category: 'conference',
        image: '/images/intersec-saudi-2025.jpeg',
        status: 'active'
      },
      {
        _id: 'opp6',
        title: 'حاضنة الذكاء الاصطناعي 2025',
        description: 'حاضنة متخصصة في دعم مشاريع الذكاء الاصطناعي للمبدعين من عمر 15 وفوق، توفر الدعم التقني والاستشارات والتمويل.',
        category: 'startup',
        image: '/images/ai-incubator-2025.jpeg',
        status: 'active'
      },
      {
        _id: 'opp7',
        title: 'معرض التوظيف 2025 - جامعة الملك فهد للبترول والمعادن',
        description: 'معرض التوظيف السنوي لجامعة الملك فهد للبترول والمعادن تحت رعاية سعادة رئيس الجامعة، يفتح الآفاق ويبني المستقبل للخريجين.',
        category: 'job_fair',
        image: '/images/job-fair-2025.jpeg',
        status: 'active'
      },
      {
        _id: 'opp8',
        title: 'برنامج موهبة للالتحاق بالجامعات المرموقة (التميز) 2025',
        description: 'برنامج تدريبي متكامل لتأهيل وإعداد أفضل الطلبة الراغبين في الدراسة في الجامعات الأمريكية المرموقة المصنفة من ضمن أفضل 50 جامعة على مستوى العالم.',
        category: 'scholarship',
        image: '/images/mawhiba-excellence.jpeg',
        status: 'active'
      },
      {
        _id: 'opp9',
        title: 'ماراثون الأفكار أيدياثون 2025',
        description: 'ماراثون للأفكار والمشاريع المجتمعية في منطقة جازان، يهدف إلى تحفيز الابتكار وتطوير حلول مبتكرة للتحديات المحلية.',
        category: 'competition',
        image: '/images/ideathon-2025.jpeg',
        status: 'active'
      }
    ]
  });
});

app.get('/api/programs', (req, res) => {
  res.json({
    success: true,
    programs: [
      {
        _id: 'program1',
        title: 'برنامج القيادة',
        description: 'برنامج تطوير مهارات القيادة',
        category: 'leadership',
        status: 'active'
      },
      {
        _id: 'program2',
        title: 'برنامج ريادة الأعمال',
        description: 'برنامج تعلم أساسيات ريادة الأعمال',
        category: 'entrepreneurship',
        status: 'active'
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
